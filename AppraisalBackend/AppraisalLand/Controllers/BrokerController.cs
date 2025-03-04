using AppraisalLand.Helper;
using DAL.Classes;
using AppraisalLand.Common.Enums;
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
        private readonly AppraisallandsContext _appraisallandContext;
        private IEmailSmsNotification _emailSmsNotification;
        Log log = new Log();
        private NotificationHelper _smtpEmailService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="broker"></param>
        /// <param name="bidService"></param>
        /// <param name="appraisallandContext"></param>
        /// <param name="smtpEmailService"></param>

        public BrokerController(IBroker broker, Ibid bidService, AppraisallandsContext appraisallandContext, NotificationHelper smtpEmailService, IEmailSmsNotification emailSmsNotification)
        {
            _broker = broker;
            _bidService = bidService;
            _appraisallandContext = appraisallandContext;
            _smtpEmailService = smtpEmailService;
            _emailSmsNotification = emailSmsNotification;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerId"></param>
        /// <param name="updateRequest"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("updateBrokerProfile")]
        public async Task<IActionResult> updateBrokerProfile(int brokerId, [FromBody] ClsBrokerUpdateDto updateRequest)
        {
            log.WriteLog("updateBrokerProfile Function started");
            try
            {
                var updatedBrokerage = await _broker.UpdateBrokerAsync(brokerId, updateRequest);

                if (updatedBrokerage == null)
                {
                    return NotFound($"Broker not found with ID {brokerId} or update failed");
                }
                var getSMS = updateRequest.GetSms;
                var getEmail = updateRequest.GetEmail;

                var user = _appraisallandContext.UserInformations.Where(x => x.UserId == brokerId).FirstOrDefault();
                if (user != null)
                {
                    user.GetEmail = getEmail;
                    user.GetSms = getSMS;
                    _appraisallandContext.UserInformations.Update(user);
                    _appraisallandContext.SaveChanges();
                }
                var brokerDetail = _appraisallandContext.UserInformations.Where(x => x.UserId == brokerId).FirstOrDefault();
                List<string> email = new List<string>();
                email.Add(user.Email);
                var notificationDetail = await _emailSmsNotification.getEmailSmsBody((int)MessageCode.ProfileUpdate);
                if (notificationDetail != null)
                {
                    Task.Run(async () => await _smtpEmailService.SendEmailToUser(email, "Common", "0", notificationDetail.EmailContent, notificationDetail.TriggerPoint));
                }
                                
                return Ok(new
                {
                    Message = $"Broker with ID {brokerId} updated successfully",
                    Brokerage = updatedBrokerage,
                    IsEmail = brokerDetail.GetEmail,
                    IsSms = brokerDetail.GetSms
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
        /// <param name="quoteId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("quoteActionByBroker")]
        public async Task<IActionResult> quoteActionByBroker(int quoteId)
        {
            log.WriteLog("quoteActionByBroker started");
            try
            {
                var bidDetail = _appraisallandContext.Bids.Where(x => x.BidId == quoteId).FirstOrDefault();
                var bid = _appraisallandContext.Bids.Where(x => x.OrderId == bidDetail.OrderId && x.Status == 1).FirstOrDefault();
                if (bid != null)
                {
                    return BadRequest(new { massage = "Appraisal for the property is in progress; quotes cannot be submitted at this stage" });
                }
                var restProperty = 0;
                var userId = _appraisallandContext.Bids.Where(x => x.BidId == quoteId).Select(x => x.AppraiserUserId).FirstOrDefault();
                long? appraiserUserId = userId;
                List<List<DBL.Models.Bid>> bidList = new List<List<DBL.Models.Bid>>();
                var userType = _appraisallandContext.UserInformations.Where(x => x.UserId == userId).Select(x => x.UserType).FirstOrDefault();
                if (userType == (short)UserType.SubAppraiser)
                {
                    var subAppraiserDetail = _appraisallandContext.Appraisers.Where(x => x.UserId == userId).FirstOrDefault();
                    if (subAppraiserDetail == null)
                    {
                        var appraiserComapny = _appraisallandContext.AppraiserCompanies.Where(x => x.AppraiserCompanyId == subAppraiserDetail.CompanyId).FirstOrDefault();
                        appraiserUserId = appraiserComapny.UserId;

                        var totalAppraisers = _appraisallandContext.Appraisers.Where(x => x.CompanyId == subAppraiserDetail.Id).ToList();
                        foreach (var item in totalAppraisers)
                        {
                            var totalQuotes = _appraisallandContext.Bids.Where(x => x.UserId == item.UserId && x.Status == 1).ToList();
                            bidList.Add(totalQuotes);
                        }
                    }
                }

                var subscription = _appraisallandContext.Subscriptions
                                      .Where(x => x.UserId == appraiserUserId && x.EndDate >= DateTime.Today && x.PlanId != 0)
                                      .OrderBy(x => x.EndDate)
                                      .FirstOrDefault();
                var transactionLog = _appraisallandContext.TransactionLogs.Where(x => x.UserId == appraiserUserId && x.IsActive == true).FirstOrDefault();
                if (subscription != null)
                {
                    var plan = _appraisallandContext.Plans.Where(x => x.Id == subscription.PlanId).FirstOrDefault();
                    var topUpProperty = 0;
                    var noOfProperty = plan.NoOfProperties;

                    var propertiesInfo = _appraisallandContext.TransactionLogs.Where(x => x.UserId == appraiserUserId && x.IsActive == true).FirstOrDefault();

                    var userProperties = _appraisallandContext.Bids.Where(x => x.AppraiserUserId == appraiserUserId && x.Status == 1).ToList();
                    int topUpTotalProperties = topUpProperty == 0 ? 0 : topUpProperty;
                    restProperty = (short)propertiesInfo.TotalProperties - (short)propertiesInfo.UsedProperties;                }
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
                    var result = _bidService.AcceptBidAsync(quoteId);
                    if (result != null)
                    {
                        var orderId = result.Result.OrderId;
                        var bidDetails = _appraisallandContext.Bids.Where(x => x.OrderId == orderId).ToList();
                        foreach (var objbid in bidDetails)
                        {
                            objbid.AppraiserAssign = false;
                            _appraisallandContext.Bids.Update(objbid);
                            _appraisallandContext.SaveChanges();
                        }

                        var BidId = result.Result.BidId;
                        var bidOrderDetails = _appraisallandContext.Bids.Where(x => x.OrderId == orderId).ToList();
                        var propertyDetails = _appraisallandContext.Properties.Where(x => x.OrderId == orderId).FirstOrDefault();
                        if (propertyDetails != null)
                        {
                            propertyDetails.IsCompleted = 1;
                            _appraisallandContext.Properties.Update(propertyDetails);
                            _appraisallandContext.SaveChanges();
                        }
                        foreach (var bidOrderDetail in bidOrderDetails)
                        {
                            if (bidOrderDetail.BidId != BidId)
                            {
                                bidOrderDetail.Status = 2;
                                _appraisallandContext.Bids.Update(bidOrderDetail);
                                _appraisallandContext.SaveChanges();
                            }
                        }

                        log.WriteLog("Bid accepted successfully");
                        var acceptedbid = 0;
                        List<List<DBL.Models.Bid>> bidQuotes = new List<List<DBL.Models.Bid>>();
                        if (userType != (short)UserType.SubAppraiser)
                        {
                            acceptedbid = _appraisallandContext.Bids
                                .Where(x => x.AppraiserUserId == appraiserUserId && x.Status == 1).Count();
                        }
                        else
                        {
                            var appraiserDetail = _appraisallandContext.Appraisers.Where(x => x.UserId == userId).FirstOrDefault();
                            if (appraiserDetail == null)
                            {
                                var appraiserComapnyDetail = _appraisallandContext.AppraiserCompanies
                                    .Where(x => x.AppraiserCompanyId == appraiserDetail.CompanyId).FirstOrDefault();

                                appraiserUserId = appraiserComapnyDetail.UserId;

                                var totalAppraisers = _appraisallandContext.Appraisers
                                    .Where(x => x.CompanyId == appraiserDetail.Id).ToList();
                                foreach (var item in totalAppraisers)
                                {
                                    var totalQuotes = _appraisallandContext.Bids
                                        .Where(x => x.UserId == item.UserId && x.Status == 1).ToList();
                                    bidQuotes.Add(totalQuotes);
                                }
                            }
                            acceptedbid = bidQuotes.SelectMany(innerList => innerList).Count();
                        }
                        var topUpProperty = _appraisallandContext.Subscriptions.Where(x => x.UserId == appraiserUserId && x.TopUpId != null).FirstOrDefault();
                        // int topUpTotalProperties = topUp_property?.TotalProperties ?? 0;
                        var transaction = _appraisallandContext.TransactionLogs.Where(x => x.UserId == appraiserUserId && x.IsActive == true).FirstOrDefault();
                        short Count = 1;
                        transaction.UsedProperties = (short)((transaction.UsedProperties) + Count);

                        _appraisallandContext.TransactionLogs.Update(transaction);
                        _appraisallandContext.SaveChanges();

                        var transactionLogDetail = _appraisallandContext.TransactionLogs
                                                          .Where(x => x.UserId == appraiserUserId && x.IsActive == true)
                                                          .FirstOrDefault();

                        var planLimitExceed = 0;
                        if (transactionLogDetail != null)
                        {
                            if (transactionLogDetail.UsedProperties < transactionLogDetail.TotalProperties)
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

                        var bidEmails = _appraisallandContext.UserInformations.Where(x => x.UserId == bidDetail.UserId).Select(x => x.Email).ToList();
                        Task.Run(async () => await _smtpEmailService.SendEmailToUser(bidEmails, "BrokerProperty", Convert.ToString(bidDetail.OrderId), "body", "subject"));
                        return Ok(new
                        {
                            Message = "Bid accepted successfully",
                            usedProperties = transactionLogDetail.UsedProperties,
                            totalNoOfProperties = transactionLogDetail.TotalProperties,
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
        /// <param name="quoteId"></param>
        /// <returns></returns>
        //  [Authorize]
        [HttpPut("quoteReActionByBroker")]
        public async Task<IActionResult> quoteReActionByBroker(int quoteId)
        {
            log.WriteLog("quoteReActionByBroker started");
            try
            {
                var quotes = _appraisallandContext.Bids.Where(x => x.BidId == quoteId).FirstOrDefault();
                if (quotes != null)
                {
                    var quotesDetails = _bidService.AcceptBidAsync(quoteId);
                    if (quotesDetails != null)
                    {
                        var orderId = quotesDetails.Result.OrderId;
                        var bidsDetails = _appraisallandContext.Bids.Where(x => x.OrderId == orderId).ToList();
                        foreach (var bid in bidsDetails)
                        {
                            bid.AppraiserAssign = true;
                            bid.OrderStatus = null;
                            bid.Remark = null;
                            _appraisallandContext.Bids.Update(bid);
                            _appraisallandContext.SaveChanges();
                        }
                    }

                    var bidList = _appraisallandContext.Bids.Where(x => x.OrderId == quotes.OrderId).ToList();
                    var propertyDetail = _appraisallandContext.Properties.Where(x => x.OrderId == quotes.OrderId).FirstOrDefault();

                    if (propertyDetail != null)
                    {
                        propertyDetail.IsCompleted = 1;
                        _appraisallandContext.Properties.Update(propertyDetail);
                        _appraisallandContext.SaveChanges();
                    }

                    foreach (var bid in bidList)
                    {
                        if (bid.BidId != quotesDetails.Result.BidId)
                        {
                            bid.Status = 2;
                            _appraisallandContext.Bids.Update(bid);
                            _appraisallandContext.SaveChanges();
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