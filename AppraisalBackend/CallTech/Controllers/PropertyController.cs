using DAL.Classes;
using DAL.Repository;
using DAL.Rpository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers;

[Route("api/com.appraisalland.Property")]
[ApiController]
public class PropertyController : ControllerBase
{
    private readonly AppraisalLandsContext _context;
    private readonly IPropertyService _property;
    private readonly IRegistrationService _registrationService;
    private readonly Log Log = new();

    public PropertyController(IPropertyService property, AppraisalLandsContext context,
        IRegistrationService registrationService)
    {
        _property = property;
        _context = context;
        _registrationService = registrationService;
    }

    [Authorize]
    [Route("getAllProperty")]
    [HttpGet]
    public IActionResult getAllProperty()
    {
        Log.writeLog("GetAllProperty Function Started");
        try
        {
            //  var Properties = _property.GetAllPropertyAsync();
            //var Properties = (from p in _context.Properties
            //                  join a in _context.ArchivedAppraisers
            //                  on p.OrderId equals a.Orderid into gj
            //                  from a in gj.DefaultIfEmpty()
            //                  where a == null
            //                  select p).ToList();
            var Properties = _context.Properties.ToList();
            var PropertiesCount = Properties.Count();
            var IsCompleteProperties = _context.Properties.Where(x => x.IsCompleted == 1).ToList();

            return Ok(new
            { Properties, TotalProperty = PropertiesCount, IsCompleteProperties = IsCompleteProperties.Count() });
        }
        catch (Exception ex)
        {
            Log.writeLog("An error occurred During GetAllProperty " + ex);
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    //[Authorize]
    [HttpPut("updateProperty")]
    public async Task<IActionResult> updateProperty(long OrderId, [FromBody] ClsProperty updateRequest)
    {
        Log.writeLog("UpdateProperty Function Started");
        try
        {
            var updatedProperty = await _property.UpdatePropertyAsync(OrderId, updateRequest);

            if (updatedProperty != null) return Ok($"Property with ID {OrderId} updated successfully");

            return BadRequest($"Property not found with ID {OrderId} or update failed");
        }
        catch (Exception ex)
        {
            Log.writeLog("An error occurred During Update Property" + ex);
            return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
        }
    }


    [Authorize]
    [HttpPut("updateOrder_Cancel_OnHold")]
    public IActionResult updateOrder_Cancel_OnHold(ClsOrderStatus clsOrderStatus) ////updateOrder-Cancel-OnHold
    {
        Log.writeLog("UpdateOrderStatus Function Started");
        try
        {
            var Status = _property.IsOnHoldStatus(clsOrderStatus);
            if (Status)
                return Ok(new { Message = "Property status changed successfully." });
            return BadRequest(new
            { Error = "Failed to change property status.Please provide a correct status: HOLD or CANCEL." });
        }
        catch (Exception ex)
        {
            Log.writeLog($"An error occurred while changing property IsOnHoldStatus: {ex}");
            return StatusCode(500, new { Message = "An error occurred while processing your request." });
        }
    }

    [Authorize]
    [HttpGet("getPropertyByUserId")]
    public IActionResult getPropertyByUserId(long UserID)
    {
        Log.writeLog("getPropertyByUserId Function Started");
        try
        {
            //  var property = _property.GetPropertyByUserIdAsync(UserID);
            var property = (from p in _context.Properties
                            join a in _context.ArchivedProperties
                                on p.OrderId equals (int?)a.OrderId into gj
                            from a in gj.DefaultIfEmpty()
                            where p.UserId == UserID && a == null
                            select p).ToList();

            var TotalUserProperty = property.Count();
            if (property == null) return NotFound($"Property with ID {UserID} not found");
            return Ok(new { property, TotalUserProperty });
        }
        catch (Exception EX)
        {
            Log.writeLog("An error occurred ,found Property By UserID ." + EX);
            return StatusCode(500, new { Message = "An error occurred while processing your request" });
        }
    }

    [Authorize]
    [HttpPost("archievePropertyByBroker")]
    public async Task<IActionResult> archievePropertyByBroker(Clsarchive1 clsarchive)
    {
        Log.writeLog("SetIsArchiveProperty Function Started");
        try
        {
            var PropertyStatus = await _property.archivePropertyByBroker(clsarchive);
            var property = _context.Properties.Where(x => x.OrderId == clsarchive.orderId).FirstOrDefault();
            if (PropertyStatus)
            {
                var userid = property.UserId;
                var User_Details = _context.UserInformations.Where(x => x.UserId == userid).FirstOrDefault();
                return Ok(new
                {
                    Message = "Property Archive status changed successfully",
                    UserEmail = User_Details.Email,
                    userid = User_Details.UserId
                });
            }

            return NotFound($"Alredy archive for OrderID: {clsarchive.orderId} and UserId :{clsarchive.userId}");
        }
        catch (Exception ex)
        {
            Log.writeLog($"archievePropertyByBroker Function Error: {ex}");
            return BadRequest("archievePropertyByBroker,property Controller" + ex);
        }
    }

    [Authorize]
    [HttpPost("archievePropertyByApprasier")]
    public async Task<IActionResult> archievePropertyByApprasier(Clsarchive1 clsarchive)
    {
        Log.writeLog("archievePropertyByApprasier Function Started");
        try
        {
            var PropertyStatus = await _property.archievePropertyByApprasier(clsarchive);
            var property = _context.Properties.Where(x => x.OrderId == clsarchive.orderId).FirstOrDefault();
            if (PropertyStatus)
            {
                var userid = property.UserId;
                var User_Details = _context.UserInformations.Where(x => x.UserId == userid).FirstOrDefault();
                return Ok(new
                {
                    Message = "Property Archive status changed successfully",
                    UserEmail = User_Details.Email,
                    userid = User_Details.UserId
                });
            }
        }
        catch (Exception ex)
        {
            Log.writeLog($"Error archievePropertyByApprasier controller: {ex}");
            return BadRequest("archievePropertyByApprasier," + ex);
        }

        return BadRequest("update failed");
    }

    [Authorize]
    [HttpGet("getPropertyByOrderID")]
    public IActionResult getPropertyByOrderID(long OrderId)
    {
        Log.writeLog("getPropertyByOrderID Function Started");
        try
        {
            var property = _property.GetPropertyByOrderID(OrderId);
            if (property == null) return NotFound($"Property with OrderID {OrderId} not found");
            return Ok(new { property });
        }
        catch (Exception EX)
        {
            Log.writeLog("An error occurred ,found Property By UserID ." + EX);
            return StatusCode(500, new { Message = "An error occurred while processing your request" });
        }
    }

    [Authorize]
    [HttpGet("getApprasierArchiveProperty")]
    public IActionResult getApprasierArchiveProperty(int UserId)
    {
        Log.writeLog("getApprasierArchiveProperty Function started");
        try
        {
            var result = from p in _context.Properties
                         join a in _context.ArchivedAppraisers
                             on p.OrderId equals a.Orderid
                         where a.Userid == UserId
                         select new { Property = p, ArchiveAppraiser = a };

            var resultList = result.ToList();
            return Ok(resultList);
        }
        catch (Exception ex)
        {
            Log.writeLog("getApprasierArchiveProperty Function started" + ex);
            return StatusCode(500, ex);
        }
    }

    [Authorize]
    [HttpGet("getBrokerArchiveProperty")]
    public IActionResult getBrokerArchiveProperty(int UserId)
    {
        Log.writeLog("getApprasierArchiveProperty Function started");
        try
        {
            var result = from p in _context.Properties
                         join a in _context.ArchivedProperties
                             on p.OrderId equals Convert.ToInt32(a.OrderId)
                         where a.UserId == UserId
                         select new { Property = p, ArchiveAppraiser = a };

            var resultList = result.ToList();
            return Ok(resultList);
        }
        catch (Exception ex)
        {
            Log.writeLog("getApprasierArchiveProperty Function started" + ex);
            return StatusCode(500, ex);
        }
    }

    [Authorize]
    [HttpPost("addProperty")]
    public async Task<IActionResult> addProperty([FromBody] ClsProperty property)
    {
        Log.writeLog("RegisterProperty Function started");
        var userId_ = property.UserId;
        if (ModelState.IsValid)
        {
            //var user_types = _context.UserInformations.Where(x => x.UserId == property.UserId).Select(x => x.UserType).FirstOrDefault();
            //if (user_types == 6)
            //{
            //    var broker_details = _context.Brokers.Where(x => x.UserId == property.UserId).FirstOrDefault();
            //    var BrokerageUserId = _context.Brokerages.Where(x => x.Id == broker_details.BrokerageId).FirstOrDefault();
            //    userId_ = BrokerageUserId.UserId;
            //}
            var broker_ = _context.Brokers.Where(x => x.UserId == property.UserId).FirstOrDefault();
            var brokerage = _context.Brokerages.Where(x => x.UserId == property.UserId).FirstOrDefault();
            if ((broker_ != null && broker_.IsActive != false) || (brokerage != null && brokerage.IsActive != false))
            {
                var notification = new Notification();
                notification.SenderId = property.UserId;
                notification.ReceiverId = property.UserId;
                notification.Message = "";
                var User_Id = property.UserId;
                notification.IsSeen = true;
                var restProperty = 0;
                var user_type = _context.UserInformations.Where(x => x.UserId == property.UserId)
                    .Select(x => x.UserType).FirstOrDefault();
                var properties = new List<List<Property>>();
                if (user_type == 6)
                {
                    var broker_details = _context.Brokers.Where(x => x.UserId == property.UserId).FirstOrDefault();
                    var BrokerageUserId = _context.Brokerages.Where(x => x.Id == broker_details.Brokerageid)
                        .FirstOrDefault();
                    User_Id = BrokerageUserId.UserId;
                    var Total_Brokers = _context.Brokers.Where(x => x.Brokerageid == broker_details.Brokerageid)
                        .ToList();
                    foreach (var item in Total_Brokers)
                    {
                        var Total_Property = _context.Properties.Where(x => x.UserId == item.UserId).ToList();
                        properties.Add(Total_Property);
                    }
                }

                try
                {
                    // var Subscriptions= _context.Subscriptions.Where(x => x.UserId == property.UserId).FirstOrDefault();
                    var subscription = _context.Subscriptions
                        .Where(x => x.UserId == User_Id && x.EndDate >= DateTime.Today && x.PlanId != 0)
                        .OrderBy(x => x.EndDate)
                        .FirstOrDefault();
                    if (subscription != null)
                    {
                        var plan = _context.Plans.Where(x => x.Id == subscription.PlanId).FirstOrDefault();
                        var topUp_property = 0;
                        var No_of_property = plan.NoOfProperties;
                        // var topUp_property = _context.Subscriptions.Where(x => x.UserId == property.UserId && x.TopUpId!=null).FirstOrDefault();
                        var topUp_properties = _context.TransactionLogs.Where(x =>
                                x.UserId == User_Id && x.EndDate >= DateTime.Today &&
                                x.TransactionDetail.Contains("topup"))
                            .ToList();
                        foreach (var item in topUp_properties)
                            topUp_property = topUp_property + (short)item.NoOfProperties;
                        //var topup = _context.Topups.Where(x => x.Id == topUp_property.TopUpId).FirstOrDefault();
                        if (user_type != 6)
                        {
                            var UserProperty = _context.Properties.Where(x => x.UserId == property.UserId).ToList();

                            var topUpTotalProperties = topUp_property == 0 ? 0 : topUp_property;
                            restProperty = topUpTotalProperties + subscription.TotalProperties - UserProperty.Count();
                        }
                        else
                        {
                            var topUpTotalProperties = topUp_property == 0 ? 0 : topUp_property;
                            restProperty = topUpTotalProperties + subscription.TotalProperties -
                                           properties.SelectMany(innerList => innerList).Count();
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

                    if (restProperty > 0)
                    {
                        var registeredProperty = await _registrationService.RegisterPropertyAsync(property);
                        if (registeredProperty)
                        {
                            var N0_properties = new List<List<Property>>();
                            var count = 0;
                            _registrationService.SendPropertyRegistrationEmail(property);
                            //await registrationService.SendSms();
                            var topUp_property = _context.Subscriptions
                                .Where(x => x.UserId == User_Id && x.TopUpId != null).FirstOrDefault();
                            int topUpTotalProperties = topUp_property?.TotalProperties ?? 0;
                            if (user_type != 6)
                            {
                                count = _context.Properties.Where(x => x.UserId == property.UserId).Count();
                            }
                            else
                            {
                                var broker_details = _context.Brokers.Where(x => x.UserId == property.UserId)
                                    .FirstOrDefault();
                                var BrokerageUserId = _context.Brokerages.Where(x => x.Id == broker_details.Brokerageid)
                                    .FirstOrDefault();
                                User_Id = BrokerageUserId.UserId;
                                var Total_Brokers = _context.Brokers
                                    .Where(x => x.Brokerageid == broker_details.Brokerageid).ToList();
                                foreach (var item in Total_Brokers)
                                {
                                    var Total_Property = _context.Properties.Where(x => x.UserId == item.UserId)
                                        .ToList();
                                    N0_properties.Add(Total_Property);
                                }

                                count = N0_properties.SelectMany(innerList => innerList).Count();
                            }

                            var transaction = _context.TransactionLogs.Where(x =>
                                x.UserId == User_Id && x.IsActive == true &&
                                (x.TransactionDetail.ToLower().Contains("lite") ||
                                 x.TransactionDetail.ToLower().Contains("pro") ||
                                 x.TransactionDetail.ToLower().Contains("ultimate"))).FirstOrDefault();
                            var t = subscription.TotalProperties - count;
                            if (transaction != null && t >= 0)
                            {
                                transaction.UsedProperties = (short)count;
                                transaction.TotalProperties = transaction.NoOfProperties;
                                _context.Update(transaction);
                                _context.SaveChanges();
                            }
                            else
                            {
                                var transtionproperty = 0;
                                var transactions = _context.TransactionLogs.Where(x =>
                                        x.UserId == User_Id && x.IsActive == true &&
                                        x.TransactionDetail.Contains("topup"))
                                    .FirstOrDefault();
                                var topUp_properties = _context.TransactionLogs.Where(x =>
                                    x.UserId == User_Id && x.EndDate >= DateTime.Today &&
                                    x.TransactionDetail.Contains("topup")).ToList();
                                foreach (var item in topUp_properties)
                                    if (item.IsActive == false)
                                        transtionproperty = transtionproperty + (short)item.NoOfProperties;
                                transactions.UsedProperties =
                                    (short)Math.Abs(count - (subscription.TotalProperties + transtionproperty));
                                transactions.TotalProperties = (short)transactions.NoOfProperties;
                                _context.Update(transactions);
                                _context.SaveChanges();
                            }

                            return Ok(new { Message = "Property Registration successful!" });
                        }

                        return NotFound($"User Not Found with {property.UserId} ID");
                    }

                    return StatusCode(403, new
                    {
                        error = new
                        {
                            code = 403,
                            message = "Subscription Limit Reached",
                            details =
                                "Your subscription does not allow adding new properties because you have reached the maximum number of properties allowed. Please consider upgrading your subscription plan to add more properties.Or add a top up to the current plan"
                        }
                    });
                }
                catch (Exception ex)
                {
                    Log.writeLog("An error occurred while registering the property." + ex);
                    return StatusCode(500, new { Message = "An error occurred while registering the property." });
                }
            }

            return BadRequest("Broker is not active.");
        }

        return BadRequest(ModelState);
    }
}