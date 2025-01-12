using DAL.Classes;
using DAL.Repository;
using DAL.Rpository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidController : ControllerBase
    {
        private readonly CalltechContext _context;
        private readonly Ibid _bid;
        Log log =new Log();
        public BidController(Ibid bid, CalltechContext context)
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
                var Bids = _bid.AppraiserBidAsync(clsBid);
                if (Bids != null)
                {
                   
                    return Ok(new { Message = "Bid Add Successfully"});
                }
                else
                {
                    return NotFound("User or Property entities not found.");
                }
            }
            catch (Exception ex)
            {
                log.writeLog("AppraiserBid Function" + ex.Message);
                return BadRequest(ex.Message);
            }
        }

         //[Authorize]
        //[HttpGet("GetAllQuotes")]
        //public IActionResult GetAllQuotes(int UserId, string Email, int OrderId)
        //{
        //    log.writeLog("GetAllQuotes started");
        //    try
        //    {
        //        var Bids = _bid.GetAllAppraiserBidAsync(UserId, Email, OrderId);

        //        if (Bids != null)
        //        {
        //            var QuotesDetails = Bids.Result.LastOrDefault();
        //            return Ok(QuotesDetails);
        //        }
        //        return NotFound("No Quotes Found for the property");
        //    }
        //    catch (Exception ex)
        //    {
        //        log.writeLog("GetAllQuotes Function" + ex.Message);
        //        return BadRequest(ex.Message);
        //    }
        //}
      

        //[Authorize]
        //[HttpGet("GetQuotes/PropertyID")]
        //public async Task<IActionResult> GetQuotesById(long PropertyID)
        //{
        //    try
        //    {
        //        List<Appraiser> appraisers = new List<Appraiser>();
        //        var Bids= _bid.GetAppraiserBidbyId(PropertyID);
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

        //[Authorize]
        //[HttpGet("GetQuotes/UserID")]
        //public async Task<IActionResult> GetQuotesByUserId(long UserID)
        //{
        //    try
        //    {
        //        var Bid = _bid.GetAppraiserBidbyUserID(UserID);
        //        if (Bid != null)
        //        {
        //            List<Property> property=new List<Property>();

        //            foreach (var item in Bid.Result)
        //            {
        //                var id=item.PropertyId;
        //               var propertyDetails= _context.Properties.Where(x=>x.PropertyId==id).FirstOrDefault();
        //                property.Add(propertyDetails);
        //            }
        //            var Broker = _context.Brokers.Where(x=>x.UserId==UserID).FirstOrDefault();

        //            return Ok(new { Bid , BrokerDetails = Broker, property= property });
        //        }
        //        else
        //        {
        //            return NotFound($"User not found on the basis of {UserID} UserId");
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        log.writeLog("GetBidBUserId function" + ex.Message);
        //        return BadRequest(ex.Message);
        //    }
        //}

        [Authorize]
        [HttpPut("UpdateQuotes")]
        public async Task<IActionResult> UpdateQuotes(long BidId, [FromBody] DAL.Classes.Bid updateRequest)
        {
            try
            {
              var bid= _bid.UpdateBid(BidId, updateRequest);
                if (bid != null)
                {
                    return Ok(new { Message = $"Quote with ID {BidId} updated successfully", bid = bid });
                }
                else
                {
                    return NotFound($"Quote not found with ID {BidId} or update failed");
                }
                
            }
            catch (Exception ex)
            {

                log.writeLog("UpdateBid" + ex);
                //return StatusCode(500, new { Message = "An error occurred during UpdateBroker,Please Insure that Phonenumber,Mortage_Brokerage_Lic_No,Mortage_Broker_Lic_No,Assistant_Phone_Number All are unique" });
                return StatusCode(500, new
                {
                    Error = "Server Error",
                    Message = "An error occurred during the update process"
                });
            }
        }

        //[Authorize]
        //[Route("UpdateOrderStatus")]
        //[HttpPut]
        //public  IActionResult UpdateOrderStatus(long Bidid, int OrderStatus,string remark)
        //{
        //    try
        //    {
        //        var bidDetails = _bid.UpdateStatus(Bidid, OrderStatus,remark);
        //        if (bidDetails != null)
        //        {
        //            var Bid_Details = _context.Bids.Where(x => x.BidId == Bidid).FirstOrDefault();
        //           var Property_ID= Bid_Details.OrderId;
        //            var Property=_context.Properties.Where(x=> x.PropertyId == Property_ID).FirstOrDefault();
        //            if (Property != null)
        //            {
        //                Property.OrderStatus = OrderStatus;
        //                _context.Properties.Update(Property);
        //                _context.SaveChanges();
        //            }
        //            return Ok(new { message = "Successfully updated status", bidDetails = bidDetails });
        //        }
        //        else
        //        {
        //            return NotFound($"Not Found Bid with {Bidid} Bid Id");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        log.writeLog("UpdateOrderStatus" + ex);
        //        return BadRequest("An error occurred during the update process");
        //    }


        //}

       
    }
}
