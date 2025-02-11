using DAL.Classes;
using DAL.Repository;
using DAL.Rpository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers
{
    [Route("api/com.appraisalland.Bid")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private readonly AppraisallandsContext _context;
        private readonly Ibid _bid;
        Log log = new Log();
        public QuotesController(Ibid bid, AppraisallandsContext context)
        {
            _bid = bid;
            _context = context;
        }
        [AllowAnonymous]
        [HttpPost("setQuotes")]
        public IActionResult setQuotes(ClsBid clsBid)
        {
            log.writeLog("AppraiserBid processing");
            try
            {
                long? user_id = clsBid.appraiserId;
                var user_type=_context.UserInformations.Where(x=>x.UserId==clsBid.appraiserId).Select(x=>x.UserType).FirstOrDefault();
                if (user_type==5)
                {
                    var details = _context.Appraisers.Where(x => x.UserId == clsBid.appraiserId).FirstOrDefault();
                    if (details==null)
                    {
                        var AppraiserComapny=_context.AppraiserCompanies.Where(x=>x.AppraiserCompanyId==details.CompanyId).FirstOrDefault();
                        user_id = AppraiserComapny.UserId;
                    }
                }

                var subscription = _context.Subscriptions
                                       .Where(x => x.UserId == user_id && x.EndDate >= DateTime.Today && x.PlanId != 0)
                                       .OrderBy(x => x.EndDate)
                                       .FirstOrDefault();
                if (subscription!=null)
                {
                    var Bids = _bid.AppraiserBidAsync(clsBid);
                    if (Bids != null)
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
                log.writeLog("AppraiserBid Function" + ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("getQuotesByOrderID")]
        public IActionResult getQuotesByOrderID(int OrderId)
        {
            log.writeLog("GetAllQuotes Function started");
            try
            {
                var Bids = _bid.getAllAppraiserBidAsync(OrderId);

                if (Bids != null && Bids.Result.Any())
                {
                    var lastBidsByAppraiser = Bids.Result
                        .GroupBy(b => b.AppraiserUserId)
                        .Select(group => group.OrderByDescending(b => b.RequestTime).First());

                    var response = lastBidsByAppraiser.Select(bid => new
                    {
                        Bid = bid,
                        LenderListUrl = bid.LenderListUrl
                    }) ;
                   
                    return Ok(response);
                }
                return NotFound("No Quotes Found for the property");
            }
            catch (Exception ex)
            {
                log.writeLog("GetAllQuotes Function" + ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("getAllQuotesByAppraiser")]
        public IActionResult getAllQuotesByAppraiser()
        {
            log.writeLog("getAllQuotesByAppraiser Function started");
            try
            {
                var Quotes = _bid.getAllQuotesByAppraiser();
                if (Quotes != null)
                {
                    return Ok(Quotes.Result);
                }
                return NotFound("No Quotes Found ");
            }
            catch (Exception ex)
            {
                log.writeLog("getAllQuotesByAppraiser function" + ex.Message);
                return BadRequest(ex.Message);
            }

        }

        [Authorize]
        [HttpGet("getQuotesByUserID")]
        public async Task<IActionResult> getQuotesByUserID(long UserID)
        {
            log.writeLog("GetQuotesByUserId Function started");
            try
            {
                var Bid = _bid.getAppraiserBidbyUserID(UserID);
                if (Bid != null)
                {
                    var Broker = _context.Brokers.Where(x => x.UserId == UserID).FirstOrDefault();

                    return Ok(new { Bid, BrokerDetails = Broker });
                }
                else
                {
                    return NotFound($"User not found on the basis of {UserID} UserId");
                }
            }
            catch (Exception ex)
            {

                log.writeLog("GetBidBUserId function" + ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [Route("updateApprasialStatus")]
        [HttpPut]
        public IActionResult updateApprasialStatus(QuoteClass quoteClass)
        {
            log.writeLog("updateApprasialStatus Function started");
            try
            {
                var Bid_Details = _context.Bids.Where(x => x.BidId == quoteClass.Quoteid).FirstOrDefault();
                var OrderId = Bid_Details.OrderId;
                var Property = _context.Properties.Where(x => x.OrderId == OrderId).FirstOrDefault();
                if(Property.Isonhold==true)
                {
                    return Ok(new { message = "The appraisal status cannot be updated as the order is On Hold" });
                }
                if (Property.Isoncancel == true)
                {
                    return Ok(new { message = "The appraisal status cannot be updated as the order is Cancelled" });
                }
                var bidDetails = _bid.UpdateStatus(quoteClass);
                if (bidDetails != null)
                {
                   
                   
                    if (Property != null)
                    {
                        Property.Orderstatus = quoteClass.OrderStatus;
                        _context.Properties.Update(Property);
                        _context.SaveChanges();
                    }
                    return Ok(new { message = "Successfully updated status", QuoteDetails = bidDetails });
                }
                else
                {
                    return NotFound($"Not Found Quote with {quoteClass.Quoteid} Quote Id");
                }
            }
            catch (Exception ex)
            {
                log.writeLog("updateApprasialStatus" + ex);
                return BadRequest("An error occurred during the update process");
            }


        }

        [Authorize]
        [HttpPut("reasignQuote")]
        public IActionResult reasignQuote(int QuoteId, int appraiserId)
        {
            var bidsDetails = _context.Bids.Where(x => x.BidId == QuoteId).FirstOrDefault();
            if (bidsDetails != null)
            {
                bidsDetails.AppraiserUserId = appraiserId;
                bidsDetails.Orderstatus = null;
                _context.Bids.Update(bidsDetails);
                _context.SaveChanges();
                return Ok("Resign successfully");
            }
            else
            {
                return NotFound($"No Quote found {QuoteId}");
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
