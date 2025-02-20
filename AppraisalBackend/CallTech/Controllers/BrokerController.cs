using AppraisalLand.Helper;
using DAL.Classes;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppraisalLand.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.Broker")]
    [ApiController]
    public class BrokerController : ControllerBase
    {
        private readonly Ibid _bidService;
        private readonly IBroker _broker;
        private readonly AppraisallandsContext _AppraisallandContext;
        Log log = new Log();
        private HelperService _smtpEmailService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="broker"></param>
        /// <param name="bidService"></param>
        /// <param name="AppraisallandContext"></param>
        /// <param name="smtpEmailService"></param>

        public BrokerController(IBroker broker, Ibid bidService, AppraisallandsContext AppraisallandContext, HelperService smtpEmailService)
        {
            _broker = broker;
            _bidService = bidService;
            _AppraisallandContext = AppraisallandContext;
            _smtpEmailService = smtpEmailService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="BrokerId"></param>
        /// <param name="updateRequest"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("updateBrokerProfile")]
        public async Task<IActionResult> updateBrokerProfile(int BrokerId, [FromBody] ClsBrokerUpdateDto updateRequest)
        {
            log.WriteLog("updateBrokerProfile Function started");
            try
            {
                var updatedBrokerage = await _broker.UpdateBrokerAsync(BrokerId, updateRequest);

                if (updatedBrokerage == null)
                {
                    return NotFound($"Broker not found with ID {BrokerId} or update failed");
                }
                var get_SMS = updateRequest.GetSms;
                var get_Email = updateRequest.GetEmail;

                var user = _AppraisallandContext.UserInformations.Where(x => x.UserId == BrokerId).FirstOrDefault();
                if (user != null)
                {
                    user.GetEmail = get_Email;
                    user.GetSms = get_SMS;
                    _AppraisallandContext.UserInformations.Update(user);
                    _AppraisallandContext.SaveChanges();
                }
                var Broker_Details = _AppraisallandContext.UserInformations.Where(x => x.UserId == BrokerId).FirstOrDefault();
                return Ok(new
                {
                    Message = $"Broker with ID {BrokerId} updated successfully",
                    Brokerage = updatedBrokerage,
                    IsEmail = Broker_Details.GetEmail,
                    IsSms = Broker_Details.GetSms
                });
            }
            catch (Exception ex)
            {

                log.WriteLog("updateBrokerProfile" + ex);
                //return StatusCode(500, new { Message = "An error occurred during UpdateBroker,Please Insure that Phonenumber,Mortage_Brokerage_Lic_No,Mortage_Broker_Lic_No,Assistant_Phone_Number All are unique" });
                return StatusCode(500, new
                {
                    Error = "Server Error",
                    Message = "An error occurred during the update process. Please check the following fields for uniqueness and try again:",
                    Fields = new List<string>
                    {
                     "PhoneNumber",
                     "Mortgage_Brokerage_Lic_No",
                     "Mortgage_Broker_Lic_No",
                     "Assistant_Phone_Number"
                    }
                });
            }
        }


        //[Authorize]
        //[HttpGet("GetBroker/brokerId")]
        //public IActionResult GetBrokerById(int brokerId)
        //{
        //    try
        //    {
        //       var Broker= _broker.GeyByBrokerId(brokerId);
        //        if (Broker != null)
        //        {
        //            return Ok(Broker);
        //        }
        //        else
        //        {
        //            return NotFound($"Broker not found with ID {brokerId}");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        log.writeLog("GetBrokerById Function "+ex);
        //        return BadRequest(ex.Message);
        //    }
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="QuoteID"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("quoteActionByBroker")]
        public async Task<IActionResult> quoteActionByBroker(int QuoteID)
        {
            log.WriteLog("quoteActionByBroker started");
            try
            {
                var BidDetails_ = _AppraisallandContext.Bids.Where(x => x.BidId == QuoteID).FirstOrDefault();
                var Bid = _AppraisallandContext.Bids.Where(x => x.OrderId == BidDetails_.OrderId && x.Status == 1).FirstOrDefault();
                if (Bid != null)
                {
                    return BadRequest(new { massage = "Appraisal for the property is in progress; quotes cannot be submitted at this stage" });
                }
                var restProperty = 0;
                var userid = _AppraisallandContext.Bids.Where(x => x.BidId == QuoteID).Select(x => x.AppraiserUserId).FirstOrDefault();
                long? user_id = userid;
                List<List<DBL.Models.Bid>> Obj_bids = new List<List<DBL.Models.Bid>>();
                var user_type = _AppraisallandContext.UserInformations.Where(x => x.UserId == userid).Select(x => x.UserType).FirstOrDefault();
                if (user_type == 5)
                {
                    var details = _AppraisallandContext.Appraisers.Where(x => x.UserId == userid).FirstOrDefault();
                    if (details == null)
                    {
                        var AppraiserComapny = _AppraisallandContext.AppraiserCompanies.Where(x => x.AppraiserCompanyId == details.CompanyId).FirstOrDefault();
                        user_id = AppraiserComapny.UserId;

                        var Total_Appraisers = _AppraisallandContext.Appraisers.Where(x => x.CompanyId == details.Id).ToList();
                        foreach (var item in Total_Appraisers)
                        {

                            var Total_quotes = _AppraisallandContext.Bids.Where(x => x.UserId == item.UserId && x.Status == 1).ToList();
                            Obj_bids.Add(Total_quotes);
                        }
                    }
                }

                var subscription = _AppraisallandContext.Subscriptions
                                      .Where(x => x.UserId == user_id && x.EndDate >= DateTime.Today && x.PlanId != 0)
                                      .OrderBy(x => x.EndDate)
                                      .FirstOrDefault();
                var TranstionLog = _AppraisallandContext.TransactionLogs.Where(x => x.UserId == user_id && x.IsActive == true).FirstOrDefault();
                if (subscription != null)
                {

                    var plan = _AppraisallandContext.Plans.Where(x => x.Id == subscription.PlanId).FirstOrDefault();
                    var topUp_property = 0;
                    var No_of_property = plan.NoOfProperties;

                    var PropertiesInfo = _AppraisallandContext.TransactionLogs.Where(x => x.UserId == user_id && x.IsActive == true).FirstOrDefault();

                    var UserProperty = _AppraisallandContext.Bids.Where(x => x.AppraiserUserId == user_id && x.Status == 1).ToList();
                    int topUpTotalProperties = topUp_property == 0 ? 0 : topUp_property;
                    restProperty = (short)PropertiesInfo.TotalProperties - (short)PropertiesInfo.UsedProperties;
                }
                else
                {
                    return NotFound(new
                    {
                        message = "You do not have any subscription.",
                        suggestion = "Please get a subscription to access the full features."
                    });
                }

                if (restProperty > 0)
                {
                    var result = _bidService.AcceptBidAsync(QuoteID);
                    if (result != null)
                    {
                        var order_id = result.Result.OrderId;
                        var Bids_Details = _AppraisallandContext.Bids.Where(x => x.OrderId == order_id).ToList();
                        foreach (var bid in Bids_Details)
                        {
                            bid.AppraiserAssign = false;
                            _AppraisallandContext.Bids.Update(bid);
                            _AppraisallandContext.SaveChanges();
                        }

                        var Bidid = result.Result.BidId;
                        var OrderId = result.Result.OrderId;
                        var BidDetails = _AppraisallandContext.Bids.Where(x => x.OrderId == OrderId).ToList();
                        var PropertyDetails = _AppraisallandContext.Properties.Where(x => x.OrderId == OrderId).FirstOrDefault();
                        if (PropertyDetails != null)
                        {
                            PropertyDetails.IsCompleted = 1;
                            _AppraisallandContext.Properties.Update(PropertyDetails);
                            _AppraisallandContext.SaveChanges();
                        }
                        foreach (var bid in BidDetails)
                        {
                            if (bid.BidId != Bidid)
                            {
                                bid.Status = 2;
                                _AppraisallandContext.Bids.Update(bid);
                                _AppraisallandContext.SaveChanges();
                            }
                        }

                        log.WriteLog("Bid accepted successfully");
                        var acceptedbid = 0;
                        List<List<DBL.Models.Bid>> Obj_bids2 = new List<List<DBL.Models.Bid>>();
                        if (user_type != 5)
                        {
                            acceptedbid = _AppraisallandContext.Bids
                                .Where(x => x.AppraiserUserId == user_id && x.Status == 1).Count();
                        }
                        else
                        {
                            var details = _AppraisallandContext.Appraisers.Where(x => x.UserId == userid).FirstOrDefault();
                            if (details == null)
                            {
                                var AppraiserComapny = _AppraisallandContext.AppraiserCompanies
                                    .Where(x => x.AppraiserCompanyId == details.CompanyId).FirstOrDefault();
                                user_id = AppraiserComapny.UserId;

                                var Total_Appraisers = _AppraisallandContext.Appraisers
                                    .Where(x => x.CompanyId == details.Id).ToList();
                                foreach (var item in Total_Appraisers)
                                {
                                    var Total_quotes = _AppraisallandContext.Bids
                                        .Where(x => x.UserId == item.UserId && x.Status == 1).ToList();
                                    Obj_bids2.Add(Total_quotes);
                                }
                            }
                            acceptedbid = Obj_bids2.SelectMany(innerList => innerList).Count();
                        }
                        var topUp_property = _AppraisallandContext.Subscriptions.Where(x => x.UserId == user_id && x.TopUpId != null).FirstOrDefault();
                        // int topUpTotalProperties = topUp_property?.TotalProperties ?? 0;
                        var transaction = _AppraisallandContext.TransactionLogs.Where(x => x.UserId == user_id && x.IsActive == true).FirstOrDefault();
                        short Count = 1;
                        transaction.UsedProperties = (short)((transaction.UsedProperties) + Count);
                        _AppraisallandContext.TransactionLogs.Update(transaction);
                        _AppraisallandContext.SaveChanges();
                        var transtion_log = _AppraisallandContext.TransactionLogs
                                                          .Where(x => x.UserId == user_id && x.IsActive == true)
                                                          .FirstOrDefault();

                        var planLimitExceed = 0;
                        if (transtion_log != null)
                        {
                            if (transtion_log.UsedProperties < transtion_log.TotalProperties)
                            {
                                planLimitExceed = 0;
                            }
                            else
                            {
                                planLimitExceed = 1;
                            }
                        }

                        //var t = transaction.TotalProperties - (short)acceptedbid;

                        //if (transaction != null && t >= 0)
                        //{

                        //    transaction.UsedProperties = (short)acceptedbid;
                        //    _AppraisallandContext.Update(transaction);
                        //    _AppraisallandContext.SaveChanges();

                        //}
                        //else
                        //{
                        //    var transtionproperty = 0;
                        //    var transactions = _AppraisallandContext.TransactionLogs.Where(x => x.UserId == user_id && x.IsActive == true && x.TransactionDetail.Contains("topup")).FirstOrDefault();

                        //    transactions.UsedProperties = (short)Math.Abs(acceptedbid - ((int)TranstionLog.TotalProperties + transtionproperty));
                        //    _AppraisallandContext.Update(transactions);
                        //    _AppraisallandContext.SaveChanges();
                        //}

                        var BrokerDetails = _AppraisallandContext.UserInformations.Where(x => x.UserId == BidDetails_.UserId).Select(x => x.Email).ToList();
                        Task.Run(async () => await _smtpEmailService.SendEmailToUser(BrokerDetails, "BrokerProperty", Convert.ToString(BidDetails_.OrderId)));
                        return Ok(new
                        {
                            Message = "Bid accepted successfully",
                            usedProperties = transtion_log.UsedProperties,
                            totalNoOfProperties = transtion_log.TotalProperties,
                            planLimitExceed = planLimitExceed
                        });
                    }
                    return NotFound("No quote found for the given ID");
                }
                else
                {
                    return StatusCode(403, new
                    {
                        error = new
                        {
                            code = 403,
                            message = "Subscription Limit Reached",
                            details = "Your subscription does not allow adding new properties because you have reached the maximum number of properties allowed. Please consider upgrading your subscription plan to add more properties.Or add a top up to the current plan"
                        }
                    });
                }

            }
            catch (Exception ex)
            {
                log.WriteLog("quoteActionByBroker Function " + ex.Message);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="QuoteID"></param>
        /// <returns></returns>
        //  [Authorize]
        [HttpPut("quoteReActionByBroker")]
        public async Task<IActionResult> quoteReActionByBroker(int QuoteID)
        {
            log.WriteLog("quoteReActionByBroker started");
            try
            {
                var Quotes = _AppraisallandContext.Bids.Where(x => x.BidId == QuoteID).FirstOrDefault();
                if (Quotes != null)
                {
                    var quotes_details = _bidService.AcceptBidAsync(QuoteID);
                    if (quotes_details != null)
                    {
                        var order_id = quotes_details.Result.OrderId;
                        var Bids_Details = _AppraisallandContext.Bids.Where(x => x.OrderId == order_id).ToList();
                        foreach (var bid in Bids_Details)
                        {
                            bid.AppraiserAssign = true;
                            bid.Orderstatus = null;
                            bid.Remark = null;
                            _AppraisallandContext.Bids.Update(bid);
                            _AppraisallandContext.SaveChanges();
                        }
                    }

                    var BidDetails = _AppraisallandContext.Bids.Where(x => x.OrderId == Quotes.OrderId).ToList();
                    var PropertyDetails = _AppraisallandContext.Properties.Where(x => x.OrderId == Quotes.OrderId).FirstOrDefault();

                    if (PropertyDetails != null)
                    {
                        PropertyDetails.IsCompleted = 1;
                        _AppraisallandContext.Properties.Update(PropertyDetails);
                        _AppraisallandContext.SaveChanges();
                    }

                    foreach (var bid in BidDetails)
                    {
                        if (bid.BidId != quotes_details.Result.BidId)
                        {
                            bid.Status = 2;
                            _AppraisallandContext.Bids.Update(bid);
                            _AppraisallandContext.SaveChanges();
                        }

                    }
                    log.WriteLog("Bid accepted successfully");
                    return Ok("Bid accepted successfully");
                }
                else
                {
                    return NotFound("No quote found for the given ID");
                }
            }
            catch (Exception ex)
            {
                log.WriteLog("quoteActionByBroker Function " + ex.Message);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bidId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("DeclineQuotes")]
        public async Task<IActionResult> DeclineBid(int bidId)
        {
            try
            {
                var result = _bidService.DeclineBidAsync(bidId);
                if (result != null)
                {
                    log.WriteLog("Bid declined successfully");
                    return Ok("Bid declined successfully");
                }
                return NotFound("No bid found for the given ID");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        //[Authorize]
        //[HttpPost("BrokerIsActive")]
        //public IActionResult BrokerIsActive(long id, bool IsActive)
        //{
        //    try
        //    {
        //        var Broker = _broker.IsActive(id, IsActive);
        //        if (Broker)
        //        {
        //            return Ok(new { Message = "Broker status updated successfully" });
        //        }
        //        else
        //        {
        //            return BadRequest(new { Message = "Broker not found or unable to update status" });
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        log.writeLog("An error occurred in BrokerIsActive." + ex);
        //        return StatusCode(500, new { Message = "An error occurred while processing your request" });
        //    }

        //}
    }
}