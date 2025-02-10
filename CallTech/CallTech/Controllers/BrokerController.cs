using DAL.Classes;
using DAL.Repository;
using DAL.Rpository;
using DBL.Models;
//using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CallTech.Controllers
{
    [Route("api/com.appraisalland.Broker")]
    [ApiController]
    public class BrokerController : ControllerBase
    {
        private readonly Ibid _bidService;
        private readonly IBroker _broker;
        private readonly AppraisallandsContext _AppraisallandContext;
        Log log = new Log();
        public BrokerController(IBroker broker, Ibid bidService, AppraisallandsContext AppraisallandContext)
        {
            _broker = broker;
            _bidService = bidService;
            _AppraisallandContext = AppraisallandContext;
        }
        [Authorize]
        [HttpPut("updateBrokerProfile")]
        public async Task<IActionResult> updateBrokerProfile(int BrokerId, [FromBody] ClsBrokerUpdateDto updateRequest)
        {
            log.writeLog("updateBrokerProfile Function started");
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
                var Broker_Details=_AppraisallandContext.UserInformations.Where(x=>x.UserId == BrokerId).FirstOrDefault();
                return Ok(new { Message = $"Broker with ID {BrokerId} updated successfully", Brokerage = updatedBrokerage ,IsEmail= Broker_Details.GetEmail, IsSms= Broker_Details.GetSms });
            }
            catch (Exception ex)
            {

                log.writeLog("updateBrokerProfile" + ex);
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

        [Authorize]
        [HttpPut("quoteActionByBroker")]
        public async Task<IActionResult> quoteActionByBroker(int QuoteID)
        {
            log.writeLog("quoteActionByBroker started");
            try
            {
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
                var TranstionLog=_AppraisallandContext.TransactionLogs.Where(x=>x.UserId== user_id && x.IsActive==true).FirstOrDefault();   
                if (subscription != null)
                {

                    var plan = _AppraisallandContext.Plans.Where(x => x.Id == subscription.PlanId).FirstOrDefault();
                    var topUp_property = 0;
                    var No_of_property = plan.NoOfProperties;

                   var PropertiesInfo= _AppraisallandContext.TransactionLogs.Where(x => x.UserId == user_id && x.IsActive == true).FirstOrDefault();

                    //  var topUp_property = _AppraisallandContext.Subscriptions.Where(x => x.UserId == user_id && x.TopUpId != null).FirstOrDefault();
                    //var topUp_properties = _AppraisallandContext.TransactionLogs.Where(x => x.UserId == user_id && x.EndDate >= DateTime.Today && x.TransactionDetail.Contains("topup")).ToList();
                    //foreach (var item in topUp_properties)
                    //{

                    //    topUp_property = topUp_property + (short)item.NoOfProperties;

                    //}
                  

                        var UserProperty = _AppraisallandContext.Bids.Where(x => x.AppraiserUserId == user_id && x.Status == 1).ToList();
                        int topUpTotalProperties = topUp_property == 0 ? 0 : topUp_property;
                        restProperty =(short) PropertiesInfo.TotalProperties -(short) PropertiesInfo.UsedProperties;
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
                        log.writeLog("Bid accepted successfully");
                        var acceptedbid = 0;
                        List<List<DBL.Models.Bid>> Obj_bids2 = new List<List<DBL.Models.Bid>>();
                        if (user_type != 5)
                        {


                            acceptedbid = _AppraisallandContext.Bids.Where(x => x.AppraiserUserId == user_id && x.Status == 1).Count();
                        }
                        else
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
                                    Obj_bids2.Add(Total_quotes);
                                }
                            }
                            acceptedbid = Obj_bids2.SelectMany(innerList => innerList).Count();
                        }
                        var topUp_property = _AppraisallandContext.Subscriptions.Where(x => x.UserId == user_id && x.TopUpId != null).FirstOrDefault();
                       // int topUpTotalProperties = topUp_property?.TotalProperties ?? 0;
                        var t = TranstionLog.TotalProperties - (short)acceptedbid;
                        var transaction = _AppraisallandContext.TransactionLogs.Where(x => x.UserId == user_id && x.IsActive == true && (x.TransactionDetail.ToLower().Contains("lite") || x.TransactionDetail.ToLower().Contains("pro") || x.TransactionDetail.ToLower().Contains("ultimate"))).FirstOrDefault();
                        if (transaction != null && t >= 0)
                        {

                            transaction.UsedProperties = (short)acceptedbid;
                            _AppraisallandContext.Update(transaction);
                            _AppraisallandContext.SaveChanges();

                        }
                        else
                        {
                            var transtionproperty = 0;
                            var transactions = _AppraisallandContext.TransactionLogs.Where(x => x.UserId == user_id && x.IsActive == true && x.TransactionDetail.Contains("topup")).FirstOrDefault();
                           
                            transactions.UsedProperties = (short)Math.Abs(acceptedbid - ((int)TranstionLog.TotalProperties + transtionproperty));
                            _AppraisallandContext.Update(transactions);
                            _AppraisallandContext.SaveChanges();
                        }


                        return Ok("Bid accepted successfully");
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
                log.writeLog("quoteActionByBroker Function " + ex.Message);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        //  [Authorize]
        [HttpPut("quoteReActionByBroker")]
        public async Task<IActionResult> quoteReActionByBroker(int QuoteID)
        {
            log.writeLog("quoteReActionByBroker started");
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
                            bid.Orderstatus=null;
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
                    log.writeLog("Bid accepted successfully");
                    return Ok("Bid accepted successfully");
                }
                else
                {
                    return NotFound("No quote found for the given ID");
                }

            }
            catch (Exception ex)
            {
                log.writeLog("quoteActionByBroker Function " + ex.Message);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPost("DeclineQuotes")]
        public async Task<IActionResult> DeclineBid(int bidId)
        {
            try
            {
                var result = _bidService.DeclineBidAsync(bidId);
                if (result != null)
                {
                    log.writeLog("Bid declined successfully");
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
