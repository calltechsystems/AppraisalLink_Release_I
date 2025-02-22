using AppraisalLand.Helper;
using DAL.Classes;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppraisalLand.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.Property")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyService _property;
        private readonly AppraisallandsContext _context;
        private IRegistrationService _registrationService;
        private HelperService _smtpEmailService;
        Log Log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="property"></param>
        /// <param name="context"></param>
        /// <param name="registrationService"></param>
        public PropertyController(IPropertyService property, AppraisallandsContext context, IRegistrationService registrationService, HelperService smtpEmailService)
        {
            _property = property;
            _context = context;
            _registrationService = registrationService;
            _smtpEmailService = smtpEmailService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [Route("getAllProperty")]
        [HttpGet]
        public IActionResult getAllProperty()
        {
            Log.WriteLog("GetAllProperty Function Started");
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

                return Ok(new { Properties = Properties, TotalProperty = PropertiesCount, IsCompleteProperties = IsCompleteProperties.Count() });
            }
            catch (Exception ex)
            {
                Log.WriteLog("An error occurred During GetAllProperty " + ex);
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="OrderId"></param>
        /// <param name="updateRequest"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("updateProperty")]
        public async Task<IActionResult> updateProperty(long OrderId, [FromBody] ClsProperty updateRequest)
        {
            Log.WriteLog("UpdateProperty Function Started");
            try
            {
                var updatedProperty = await _property.UpdatePropertyAsync(OrderId, updateRequest);

                if (updatedProperty != null)
                {
                    return Ok($"Property with ID {OrderId} updated successfully");
                }

                return BadRequest($"Property not found with ID {OrderId} or update failed");
            }
            catch (Exception ex)
            {
                Log.WriteLog("An error occurred During Update Property" + ex);
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clsOrderStatus"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("updateOrder_Cancel_OnHold")]
        public IActionResult updateOrder_Cancel_OnHold(ClsOrderStatus clsOrderStatus)  ////updateOrder-Cancel-OnHold
        {
            Log.WriteLog("UpdateOrderStatus Function Started");
            try
            {
                var Status = _property.IsOnHoldStatus(clsOrderStatus);
                if (Status)
                {
                    return Ok(new { Message = "Property status changed successfully." });
                }
                else
                {
                    return BadRequest(new { Error = "Failed to change property status.Please provide a correct status: HOLD or CANCEL." });
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog($"An error occurred while changing property IsOnHoldStatus: {ex}");
                return StatusCode(500, new { Message = "An error occurred while processing your request." });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserID"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getPropertyByUserId")]
        public IActionResult getPropertyByUserId(long UserID)
        {
            Log.WriteLog("getPropertyByUserId Function Started");
            try
            {
                //  var property = _property.GetPropertyByUserIdAsync(UserID);
                var property = (from p in _context.Properties
                                join a in _context.ArchivedProperties
                                on (int?)p.OrderId equals (int?)a.OrderId into gj
                                from a in gj.DefaultIfEmpty()
                                where p.UserId == UserID && a == null
                                select p).ToList();

                var TotalUserProperty = property.Count();
                if (property == null)
                {
                    return NotFound($"Property with ID {UserID} not found");
                }
                return Ok(new { property, TotalUserProperty });
            }
            catch (Exception EX)
            {
                Log.WriteLog("An error occurred ,found Property By UserID ." + EX);
                return StatusCode(500, new { Message = "An error occurred while processing your request" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clsarchive"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("archievePropertyByBroker")]
        public async Task<IActionResult> archievePropertyByBroker(Clsarchive1 clsarchive)
        {
            Log.WriteLog("SetIsArchiveProperty Function Started");
            try
            {
                var PropertyStatus = await _property.archivePropertyByBroker(clsarchive);
                var property = _context.Properties.Where(x => x.OrderId == clsarchive.orderId).FirstOrDefault();
                if (PropertyStatus)
                {
                    var userid = property.UserId;
                    var User_Details = _context.UserInformations.Where(x => x.UserId == userid).FirstOrDefault();
                    return Ok(new { Message = "Property Archive status changed successfully", UserEmail = User_Details.Email, userid = User_Details.UserId });
                }
                else
                {
                    return NotFound($"Alredy archive for OrderID: {clsarchive.orderId} and UserId :{clsarchive.userId}");
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog($"archievePropertyByBroker Function Error: {ex}");
                return BadRequest("archievePropertyByBroker,property Controller" + ex);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clsarchive"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("archievePropertyByApprasier")]
        public async Task<IActionResult> archievePropertyByApprasier(Clsarchive1 clsarchive)
        {
            Log.WriteLog("archievePropertyByApprasier Function Started");
            try
            {
                var PropertyStatus = await _property.archievePropertyByApprasier(clsarchive);
                var property = _context.Properties.Where(x => x.OrderId == clsarchive.orderId).FirstOrDefault();
                if (PropertyStatus)
                {
                    var userid = property.UserId;
                    var User_Details = _context.UserInformations.Where(x => x.UserId == userid).FirstOrDefault();
                    return Ok(new { Message = "Property Archive status changed successfully", UserEmail = User_Details.Email, userid = User_Details.UserId });
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog($"Error archievePropertyByApprasier controller: {ex}");
                return BadRequest("archievePropertyByApprasier," + ex);
            }
            return BadRequest("update failed");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="OrderId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getPropertyByOrderID")]
        public IActionResult getPropertyByOrderID(long OrderId)
        {
            Log.WriteLog("getPropertyByOrderID Function Started");
            try
            {
                var property = _property.GetPropertyByOrderID(OrderId);
                if (property == null)
                {
                    return NotFound($"Property with OrderID {OrderId} not found");
                }
                return Ok(new { property });
            }
            catch (Exception EX)
            {
                Log.WriteLog("An error occurred ,found Property By UserID ." + EX);
                return StatusCode(500, new { Message = "An error occurred while processing your request" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getApprasierArchiveProperty")]
        public IActionResult getApprasierArchiveProperty(int UserId)
        {
            Log.WriteLog("getApprasierArchiveProperty Function started");
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
                Log.WriteLog("getApprasierArchiveProperty Function started" + ex);
                return StatusCode(500, ex);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getBrokerArchiveProperty")]
        public IActionResult getBrokerArchiveProperty(int UserId)
        {
            Log.WriteLog("getApprasierArchiveProperty Function started");
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
                Log.WriteLog("getApprasierArchiveProperty Function started" + ex);
                return StatusCode(500, ex);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="property"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("addProperty")]
        public async Task<IActionResult> addProperty([FromBody] ClsProperty property)
        {
            Log.WriteLog("RegisterProperty Function started");
            long? userId_ = property.UserId;
            if (ModelState.IsValid)
            {
                try
                {
                    var remainingProperty = 0;
                    var UserType = _context.UserInformations.Where(x => x.UserId == userId_).Select(x => x.UserType).FirstOrDefault();
                    if (UserType != null)
                    {
                        var broker_ = _context.Brokers.Where(x => x.UserId == property.UserId).FirstOrDefault();
                        var brokerage = _context.Brokerages.Where(x => x.UserId == property.UserId).FirstOrDefault();
                        if ((broker_ != null && broker_.IsActive != false) || (brokerage != null && brokerage.IsActive != false))
                        {
                            if (UserType == 6)
                            {
                                var broker_details = _context.Brokers.Where(x => x.UserId == userId_).FirstOrDefault();
                                var BrokerageUserId = _context.Brokerages.Where(x => x.Id == broker_details.Brokerageid).FirstOrDefault();
                                userId_ = BrokerageUserId.UserId;

                            }
                            var SubcriptionDetails = _context.TransactionLogs.Where(x => x.UserId == userId_ && x.IsActive == true && x.EndDate >= DateTime.Now).FirstOrDefault();
                            if (SubcriptionDetails != null)
                            {
                                var totalUsedPropertiesCount = _context.Properties.Where(x => x.UserId == userId_).ToList().Count();
                                remainingProperty = (int)SubcriptionDetails.TotalProperties - totalUsedPropertiesCount;

                                if (remainingProperty > 0)
                                {
                                    var registeredProperty = await _registrationService.RegisterPropertyAsync(property);
                                    if (registeredProperty > 0)
                                    {

                                        short Count = 1;
                                        SubcriptionDetails.UsedProperties = (short)((SubcriptionDetails.UsedProperties) + Count);
                                        _context.TransactionLogs.Update(SubcriptionDetails);
                                        _context.SaveChanges();
                                        var userEmail = _context.UserInformations.Where(x => x.UserId == userId_).Select(x => x.Email).FirstOrDefault();

                                        //if (UserType == 6)
                                        //{
                                        //    var broker_details = _context.Brokers.Where(x => x.UserId == userId_).FirstOrDefault();
                                        //    var BrokerageUserId = _context.Brokerages.Where(x => x.Id == broker_details.Brokerageid).FirstOrDefault();
                                        //    userId_ = BrokerageUserId.UserId;

                                        //}
                                        //if (UserType == 5)
                                        //{
                                        //    var Appraiser_details = _context.Appraisers.Where(x => x.UserId == userId_).FirstOrDefault();
                                        //    var AppraiserCompanyUserId = _context.Brokerages.Where(x => x.Id == Appraiser_details.CompanyId).FirstOrDefault();
                                        //    userId_ = AppraiserCompanyUserId.UserId;

                                        //}

                                        var transtion_log = _context.TransactionLogs
                                                           .Where(x => x.UserId == userId_ && x.IsActive == true)
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
                                        List<string> email = new List<string>();
                                        List<string> brokeremail = new List<string>();
                                        var Appraisers = await _context.UserInformations.Where(x => x.UserType == 3).ToListAsync();
                                        var AppraiserCompany = await _context.UserInformations.Where(x => x.UserType == 4).ToListAsync();
                                        foreach (var AppraiserCompanyEmail in AppraiserCompany)
                                        {
                                            email.Add(AppraiserCompanyEmail.Email);
                                        }
                                        foreach (var AppraisersEmail in Appraisers)
                                        {
                                            email.Add(AppraisersEmail.Email);
                                        }
                                        // await _registrationService.SendPropertyRegistrationEmail(property, registeredProperty);
                                        brokeremail.Add(userEmail);
                                        Task.Run(async () => await _smtpEmailService.SendEmailToUser(email, "Appraiser", Convert.ToString(registeredProperty)));
                                        Task.Run(async () => await _smtpEmailService.SendEmailToUser(brokeremail, "Broker", Convert.ToString(registeredProperty)));

                                        return Ok(new
                                        {
                                            Message = "Property Registration successful!",
                                            PropertyId = registeredProperty,
                                            usedProperties = transtion_log?.UsedProperties ?? 0,
                                            totalNoOfProperties = transtion_log?.TotalProperties ?? 0,
                                            planLimitExceed = planLimitExceed

                                        });

                                    }
                                    else
                                    {
                                        return BadRequest(new { Message = "Property registration failed. Please try again later." });
                                    }

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
                            else
                            {
                                return NotFound(new
                                {
                                    message = "You do not have any subscription.",
                                    suggestion = "Please get a subscription to access the full features."
                                });
                            }
                        }
                        else
                        {
                            return BadRequest("User is not active.");
                        }

                    }
                    else
                    {
                        return NotFound($"User Not Found with {property.UserId} ID");
                    }
                }
                catch (Exception ex)
                {
                    Log.WriteLog("An error occurred while registering the property." + ex);
                    return StatusCode(500, new { Message = "An error occurred while registering the property." });
                }
            }
            return BadRequest(ModelState);
        }


        //[Authorize]
        //[HttpPost("addProperty")]
        //public async Task<IActionResult> addProperty([FromBody] ClsProperty property)
        //{
        //    Log.writeLog("RegisterProperty Function started");
        //    long? userId_ = property.UserId;
        //    if (ModelState.IsValid)
        //    {
        //        //var user_types = _context.UserInformations.Where(x => x.UserId == property.UserId).Select(x => x.UserType).FirstOrDefault();
        //        //if (user_types == 6)
        //        //{
        //        //    var broker_details = _context.Brokers.Where(x => x.UserId == property.UserId).FirstOrDefault();
        //        //    var BrokerageUserId = _context.Brokerages.Where(x => x.Id == broker_details.BrokerageId).FirstOrDefault();
        //        //    userId_ = BrokerageUserId.UserId;
        //        //}
        //        var broker_ = _context.Brokers.Where(x => x.UserId == property.UserId).FirstOrDefault();
        //        var brokerage = _context.Brokerages.Where(x => x.UserId == property.UserId).FirstOrDefault();
        //        if ((broker_ != null && broker_.IsActive != false) || (brokerage != null && brokerage.IsActive != false))
        //        {
        //            //Notification notification = new Notification();
        //            //notification.SenderId = property.UserId;
        //            //notification.ReceiverId = property.UserId;
        //            //notification.Message = "";
        //            long? User_Id = property.UserId;
        //           // notification.IsSeen = true;
        //            var restProperty = 0;
        //            var user_type = _context.UserInformations.Where(x => x.UserId == property.UserId).Select(x => x.UserType).FirstOrDefault();
        //            List<List<DBL.Models.Property>> properties = new List<List<DBL.Models.Property>>();
        //            if (user_type == 6)
        //            {
        //                var broker_details = _context.Brokers.Where(x => x.UserId == property.UserId).FirstOrDefault();
        //                var BrokerageUserId = _context.Brokerages.Where(x => x.Id == broker_details.Brokerageid).FirstOrDefault();
        //                User_Id = BrokerageUserId.UserId;
        //                var Total_Brokers = _context.Brokers.Where(x => x.Brokerageid == broker_details.Brokerageid).ToList();
        //                foreach (var item in Total_Brokers)
        //                {

        //                    var Total_Property = _context.Properties.Where(x => x.UserId == item.UserId).ToList();
        //                    properties.Add(Total_Property);
        //                }
        //            }
        //            try
        //            {
        //                // var Subscriptions= _context.Subscriptions.Where(x => x.UserId == property.UserId).FirstOrDefault();
        //                var subscription = _context.Subscriptions
        //                                   .Where(x => x.UserId == User_Id && x.EndDate >= DateTime.Today && x.PlanId != 0 && x.TopUpId==0)
        //                                   .OrderBy(x => x.EndDate)
        //                                   .FirstOrDefault();
        //                var transtion_log=_context.TransactionLogs.Where(x=>x.UserId== User_Id && x.IsActive==true).FirstOrDefault();
        //                if (subscription != null)
        //                {
        //                    var plan = _context.Plans.Where(x => x.Id == subscription.PlanId).FirstOrDefault();
        //                    var topUp_property = 0;
        //                    var No_of_property = plan.NoOfProperties;
        //                    // var topUp_property = _context.Subscriptions.Where(x => x.UserId == property.UserId && x.TopUpId!=null).FirstOrDefault();
        //                    var topUp_properties = _context.TransactionLogs.Where(x => x.UserId == User_Id && x.EndDate >= DateTime.Today && x.IsActive==true).ToList();
        //                    if (user_type != 6)
        //                    {
        //                        var UserProperty = _context.Properties.Where(x => x.UserId == property.UserId).ToList();
        //                        restProperty = (int)transtion_log.TotalProperties - UserProperty.Count();


        //                    }


        //                    //foreach (var item in topUp_properties)
        //                    //{

        //                    //    topUp_property = topUp_property + (short)item.NoOfProperties;

        //                    //}
        //                    ////var topup = _context.Topups.Where(x => x.Id == topUp_property.TopUpId).FirstOrDefault();
        //                    //if (user_type != 6)
        //                    //{
        //                    //    var UserProperty = _context.Properties.Where(x => x.UserId == property.UserId).ToList();

        //                    //    int topUpTotalProperties = topUp_property == 0 ? 0 : topUp_property;
        //                    //    restProperty = (topUpTotalProperties + subscription.TotalProperties) - UserProperty.Count();
        //                    //}
        //                    //else
        //                    //{
        //                    //    int topUpTotalProperties = topUp_property == 0 ? 0 : topUp_property;
        //                    //    restProperty = (topUpTotalProperties + subscription.TotalProperties) - properties.SelectMany(innerList => innerList).Count();
        //                    //}
        //                }
        //                else
        //                {
        //                    return NotFound(new
        //                    {
        //                        message = "You do not have any subscription.",
        //                        suggestion = "Please get a subscription to access the full features."
        //                    });
        //                }
        //                if (restProperty > 0)
        //                {
        //                    var registeredProperty = await _registrationService.RegisterPropertyAsync(property);
        //                    if (registeredProperty == true)
        //                    {
        //                        List<List<DBL.Models.Property>> N0_properties = new List<List<DBL.Models.Property>>();
        //                        var count = 0;
        //                        _registrationService.SendPropertyRegistrationEmail(property);
        //                        //await registrationService.SendSms();
        //                        var topUp_property = _context.Subscriptions.Where(x => x.UserId == User_Id && x.TopUpId != null).FirstOrDefault();
        //                      //  int topUpTotalProperties = topUp_property?.TotalProperties ?? 0;
        //                        if (user_type != 6)
        //                        {
        //                            count = _context.Properties.Where(x => x.UserId == property.UserId).Count();
        //                        }
        //                        else
        //                        {
        //                            var broker_details = _context.Brokers.Where(x => x.UserId == property.UserId).FirstOrDefault();
        //                            var BrokerageUserId = _context.Brokerages.Where(x => x.Id == broker_details.Brokerageid).FirstOrDefault();
        //                            User_Id = BrokerageUserId.UserId;
        //                            var Total_Brokers = _context.Brokers.Where(x => x.Brokerageid == broker_details.Brokerageid).ToList();
        //                            foreach (var item in Total_Brokers)
        //                            {

        //                                var Total_Property = _context.Properties.Where(x => x.UserId == item.UserId).ToList();
        //                                N0_properties.Add(Total_Property);
        //                            }
        //                            count = N0_properties.SelectMany(innerList => innerList).Count();
        //                        }

        //                        var transaction = _context.TransactionLogs.Where(x => x.UserId == User_Id && x.IsActive == true).FirstOrDefault();
        //                        var t = transtion_log.TotalProperties - count;
        //                        if (transaction != null && t >= 0)
        //                        {

        //                            transaction.UsedProperties = (short)count;
        //                            _context.Update(transaction);
        //                            _context.SaveChanges();

        //                        }
        //                        else
        //                        {
        //                            var transtionproperty = 0;
        //                            var transactions = _context.TransactionLogs.Where(x => x.UserId == User_Id && x.IsActive == true).FirstOrDefault();
        //                            var topUp_properties = _context.TransactionLogs.Where(x => x.UserId == User_Id && x.EndDate >= DateTime.Today && x.IsActive==true).ToList();
        //                            foreach (var item in topUp_properties)
        //                            {

        //                                if (item.IsActive == false)
        //                                {
        //                                    transtionproperty = transtionproperty + (short)item.TotalProperties;
        //                                }

        //                            }
        //                            transactions.UsedProperties = (short)Math.Abs(count - ((int)transaction.TotalProperties + transtionproperty));
        //                            _context.Update(transactions);
        //                            _context.SaveChanges();
        //                        }

        //                        return Ok(new { Message = "Property Registration successful!" });
        //                    }
        //                    else
        //                    {
        //                        return NotFound($"User Not Found with {property.UserId} ID");
        //                    }
        //                }
        //                else
        //                {
        //                    return StatusCode(403, new
        //                    {
        //                        error = new
        //                        {
        //                            code = 403,
        //                            message = "Subscription Limit Reached",
        //                            details = "Your subscription does not allow adding new properties because you have reached the maximum number of properties allowed. Please consider upgrading your subscription plan to add more properties.Or add a top up to the current plan"
        //                        }
        //                    });
        //                }


        //            }
        //            catch (Exception ex)
        //            {
        //                Log.writeLog("An error occurred while registering the property." + ex);
        //                return StatusCode(500, new { Message = "An error occurred while registering the property." });
        //            }
        //        }
        //        else { return BadRequest("Broker is not active."); }
        //    }
        //    return BadRequest(ModelState);
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraiserId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getAllAppraiserAgentAssignedProperty")]
        public async Task<IActionResult> getAllAppraiserAgentAssignedProperty(int appraiserId)
        {
            try
            {
                var Property = _property.getAllAppraiserAgentAssignedProperty(appraiserId);
                if (Property == null)
                {
                    return NotFound("Not Found any Property");
                }
                else
                {
                    return Ok(Property);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
