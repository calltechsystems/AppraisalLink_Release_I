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
    [Route("api/com.appraisalland.Bid")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private readonly AppraisallandsContext _context;
        private readonly Ibid _bid;
        Log log = new Log();
        private NotificationHelper _smtpEmailService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bid"></param>
        /// <param name="context"></param>
        /// <param name="smtpEmailService"></param>
        public QuotesController(Ibid bid, AppraisallandsContext context, NotificationHelper smtpEmailService)
        {
            _bid = bid;
            _context = context;
            _smtpEmailService = smtpEmailService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bid"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("setQuotes")]
        public IActionResult setQuotes(DAL.Classes.Bid bid)
        {
            log.WriteLog("AppraiserBid processing");
            try
            {
                var property = _context.Properties.Where(x => x.OrderId == bid.OrderId).FirstOrDefault();
                if (property.IsOnHold == true)
                {
                    return BadRequest(new { message = "The Quote cannot be updated as the order is On Hold" });
                }
                if (property.IsOnCancel == true)
                {
                    return BadRequest(new { message = "The Quote cannot be updated as the order is On Cancel" });
                }

                long? userId = bid.AppraiserId;
                var userType = _context.UserInformations.Where(x => x.UserId == bid.AppraiserId).Select(x => x.UserType).FirstOrDefault();
                if (userType == (short)UserType.SubAppraiser)
                {
                    var details = _context.Appraisers.Where(x => x.UserId == bid.AppraiserId).FirstOrDefault();
                    if (details == null)
                    {
                        var appraiserCompany = _context.AppraiserCompanies.Where(x => x.AppraiserCompanyId == details.CompanyId).FirstOrDefault();
                        userId = appraiserCompany.UserId;
                    }
                }

                var subscription = _context.Subscriptions
                                       .Where(x => x.UserId == userId && x.EndDate >= DateTime.Today && x.PlanId != 0)
                                       .OrderBy(x => x.EndDate)
                                       .FirstOrDefault();
                ////mail 

                var brokerEmailIds = _context.UserInformations.Where(x => x.UserId == property.UserId).Select(x => x.Email).ToList();
                var appraiserEmailIds = _context.UserInformations.Where(x => x.UserId == userId).Select(x => x.Email).ToList();

                Task.Run(async () => await _smtpEmailService.SendEmailToUser(brokerEmailIds, " QuotesBroker", Convert.ToString(bid.OrderId), "body", "subject"));
                Task.Run(async () => await _smtpEmailService.SendEmailToUser(appraiserEmailIds, " QuotesAppraiser", Convert.ToString(bid.OrderId), "body", "subject"));

                if (subscription != null)
                {
                    var bids = _bid.AppraiserBidAsync(bid);
                    if (bids != null)
                    {
                        return Ok(new { Message = "Bid Add Successfully" });
                    }
                    else
                    {
                        return NotFound("User or Property entities not found.");
                    }
                }
                else
                {
                    return NotFound(new
                    {
                        message = "You do not have any subscription.",
                        suggestion = "Please get a subscription to access the full features."
                    });
                }
            }
            catch (Exception ex)
            {
                log.WriteLog("AppraiserBid Function" + ex.Message);
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getQuotesByOrderID")]
        public IActionResult getQuotesByOrderID(int orderId)
        {
            log.WriteLog("GetAllQuotes Function started");
            try
            {
                var bids = _bid.getAllAppraiserBidAsync(orderId);

                if (bids != null && bids.Result.Any())
                {
                    var lastBidsByAppraiser = bids.Result
                        .GroupBy(b => b.AppraiserUserId)
                        .Select(group => group.OrderByDescending(b => b.RequestTime).First());

                    var response = lastBidsByAppraiser.Select(bid => new
                    {
                        Bid = bid,
                        LenderListUrl = bid.LenderListUrl
                    });

                    return Ok(response);
                }
                else
                {
                    return NotFound("No Quotes Found for the property");
                }
            }
            catch (Exception ex)
            {
                log.WriteLog("GetAllQuotes Function" + ex.Message);
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getAllQuotesByAppraiser")]
        public IActionResult getAllQuotesByAppraiser()
        {
            log.WriteLog("getAllQuotesByAppraiser Function started");
            try
            {
                var quotes = _bid.getAllQuotesByAppraiser();
                if (quotes != null)
                {
                    return Ok(quotes.Result);
                }
                else
                {
                    return NotFound("No Quotes Found ");
                }
            }
            catch (Exception ex)
            {
                log.WriteLog("getAllQuotesByAppraiser function" + ex.Message);
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getQuotesByUserID")]
        public async Task<IActionResult> getQuotesByUserID(long userId)
        {
            log.WriteLog("GetQuotesByUserId Function started");
            try
            {
                var bid = _bid.getAppraiserBidbyUserID(userId);
                if (bid != null)
                {
                    var broker = _context.Brokers.Where(x => x.UserId == userId).FirstOrDefault();

                    return Ok(new { bid, BrokerDetails = broker });
                }
                else
                {
                    return NotFound($"User not found on the basis of {userId} UserId");
                }
            }
            catch (Exception ex)
            {
                log.WriteLog("GetBidBUserId function" + ex.Message);
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="quote"></param>
        /// <returns></returns>
        [Authorize]
        [Route("updateApprasialStatus")]
        [HttpPut]
        public IActionResult updateApprasialStatus(QuoteClass quote)
        {
            log.WriteLog("updateApprasialStatus Function started");
            try
            {
                var bidDetail = _context.Bids.Where(x => x.BidId == quote.QuoteId).FirstOrDefault();
                var orderId = bidDetail.OrderId;
                var property = _context.Properties.Where(x => x.OrderId == orderId).FirstOrDefault();
                if (property.IsOnHold == true)
                {
                    return BadRequest(new { message = "The appraisal status cannot be updated as the order is On Hold" });
                }
                if (property.IsOnCancel == true)
                {
                    return BadRequest(new { message = "The appraisal status cannot be updated as the order is Cancelled" });
                }

                var bidDetails = _bid.UpdateStatus(quote);
                if (bidDetail != null)
                {
                    if (property != null)
                    {
                        property.OrderStatus = quote.OrderStatus;
                        _context.Properties.Update(property);
                        _context.SaveChanges();
                    }
                    return Ok(new { message = "Successfully updated status", QuoteDetails = bidDetail });
                }
                else
                {
                    return NotFound($"Not Found Quote with {quote.QuoteId} Quote Id");
                }
            }
            catch (Exception ex)
            {
                log.WriteLog("updateApprasialStatus" + ex);
                return BadRequest("An error occurred during the update process");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="quoteId"></param>
        /// <param name="appraiserId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("reasignQuote")]
        public IActionResult reasignQuote(int quoteId, int appraiserId)
        {
            var bidsDetail = _context.Bids.Where(x => x.BidId == quoteId).FirstOrDefault();
            if (bidsDetail != null)
            {
                bidsDetail.AppraiserUserId = appraiserId;
                bidsDetail.OrderStatus = null;
                _context.Bids.Update(bidsDetail);
                _context.SaveChanges();
                return Ok("Resign successfully");
            }
            else
            {
                return NotFound($"No Quote found {quoteId}");
            }
        }
        //[Authorize]
        //[HttpGet("GetQuotes/PropertyID")]
        //public async Task<IActionResult> GetQuotesById(long PropertyID)
        //{
        //    log.writeLog("GetQuotesById Function started");
        //    try
        //    {
        //        List<Appraiser> appraisers = new List<Appraiser>();
        //        var Bids= _bid.getAppraiserBidbyId(PropertyID);
        //      var BidDetails=  Bids.Result.FirstOrDefault();
        //        var BidCount= Bids.Result.Count();
        //        var Property=_context.Properties.Where(x=>x.PropertyId== PropertyID).FirstOrDefault();
        //        long? id = 0;
        //        if (Bids != null)
        //        {
        //            foreach (var item in Bids.Result)
        //            {
        //                 id = item.AppraiserUserId;
        //                //var AppraiserDetails = _context.Appraisers.Where(x => x.UserId == id).FirstOrDefault();

        //                //appraisers.Add(AppraiserDetails);
        //                break;
        //           }
        //            var AppraiserDetails = _context.Appraisers.Where(x => x.UserId == id).FirstOrDefault();
        //            return Ok(new { TotalBid = BidCount, BidDetails, AppraiserDetails= AppraiserDetails, PropertyDetails= Property });
        //        }
        //        else
        //        {

        //            return NotFound($"Property not found on the basis of {PropertyID} propertyId");
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        log.writeLog("GetBidById function"+ex.Message);
        //        return BadRequest(ex.Message);
        //    }
        //}

        // [Authorize]
        //[HttpPut("UpdateQuotes")]
        //public async Task<IActionResult> UpdateQuotes(long BidId, [FromBody] DAL.Classes.Bid updateRequest)
        //{
        //    log.writeLog("UpdateQuotes Function started");
        //    try
        //    {
        //      var bid= _bid.UpdateBid(BidId, updateRequest);
        //        if (bid != null)
        //        {
        //            return Ok(new { Message = $"Quote with ID {BidId} updated successfully", bid = bid });
        //        }
        //        else
        //        {
        //            return NotFound($"Quote not found with ID {BidId} or update failed");
        //        }

        //    }
        //    catch (Exception ex)
        //    {

        //        log.writeLog("UpdateBid" + ex);
        //        //return StatusCode(500, new { Message = "An error occurred during UpdateBroker,Please Insure that Phonenumber,Mortage_Brokerage_Lic_No,Mortage_Broker_Lic_No,Assistant_Phone_Number All are unique" });
        //        return StatusCode(500, new
        //        {
        //            Error = "Server Error",
        //            Message = "An error occurred during the update process"
        //        });
        //    }
        //}
    }
}