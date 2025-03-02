using AppraisalLand.Helper;
using DAL.Classes;
using DAL.Common.Enums;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AppraisalLand.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.Payments")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IServicesMiddleware _servicesMiddlware;
        private readonly AppraisallandsContext _appraisallandContext;
        private NotificationHelper _smtpEmailService;
        private IEmailSmsNotification _emailSmsNotification;
        Log Log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="servicesMiddlware"></param>
        /// <param name="appraisallandContext"></param>
        public PaymentsController(IServicesMiddleware servicesMiddlware, AppraisallandsContext appraisallandContext, IEmailSmsNotification emailSmsNotification, NotificationHelper smtpEmailService)
        {
            _servicesMiddlware = servicesMiddlware;
            _appraisallandContext = appraisallandContext;
            _emailSmsNotification = emailSmsNotification;
            _smtpEmailService = smtpEmailService;
        }
        //[HttpGet]
        //public ServiceResponse<string> Info()
        //{
        //    return new ServiceResponse<string>()
        //    {
        //        Message = "Sample Json Response from API",
        //        Response = "Common.Models.Backend.ServiceResponse<T>{ Exception Error, String Messsage, Bool Success, T Response}",
        //        Success = true
        //    };
        //} [HttpPut("{BrokerId}")]

        /// <summary>
        /// 
        /// </summary>
        /// <param name="planName"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        [Route("paymenturl")]
        [Authorize]
        [HttpPost]
        public IActionResult PaymentUrl(string planName, long userId)
        {
            bool isValid = _servicesMiddlware.IsValid(userId);
            if (isValid)
            {
                var response = _servicesMiddlware.PaymentUrl(planName, userId);
                PaymentToken paymentToken = new PaymentToken();

                string[] parts = response.Response.Split('&');

                string token = null;
                foreach (string part in parts)
                {
                    if (part.StartsWith("token="))
                    {
                        token = part.Substring("token=".Length);
                        break;
                    }
                }

                var userDetail = _appraisallandContext.UserInformations.Where(x => x.UserId == userId).Select(x => x.UserType).FirstOrDefault();
                var planDetail = _appraisallandContext.Plans.Where(x => x.PlanName.ToLower() == planName.ToLower() && x.UserType == userDetail).FirstOrDefault();
                paymentToken.CurrentDateTime = DateTime.Now;
                paymentToken.UserId = Convert.ToInt32(userId);
                paymentToken.Token = token;
                paymentToken.PlanId = Convert.ToInt32(planDetail.Id);
                _appraisallandContext.PaymentTokens.Add(paymentToken);
                _appraisallandContext.SaveChanges();

                return Ok(new { response.Response, response.Message, response.Success, response.Error });
            }
            return NotFound("User not found");
        }

        //[Route("payment")]
        //[HttpGet]
        //public IActionResult Payment(long UserID,long PlanId,string paymentId, string token, string payerId)
        //{
        //    DateTime? End_date=null;
        //    DateTime? Start_date=null;
        //   var PaymentTokenDetails= _AppraisallandContext.PaymentTokens.Where(x => x.Token == token).FirstOrDefault();
        //    var email=_AppraisallandContext.UserInformations.Where(x=>x.UserId==UserID).Select(x=>x.Email).FirstOrDefault();
        //    var plan_Name = _AppraisallandContext.Plans.Where(x => x.Id == PlanId).Select(x => x.PlanName).FirstOrDefault();
        //    if(PaymentTokenDetails != null)
        //    {
        //        DateTime currentDateTime = DateTime.UtcNow;
        //        DateTime tokenDateTime = PaymentTokenDetails.Currentdatetime;

        //        TimeSpan difference = currentDateTime - tokenDateTime;

        //        if (difference.TotalMinutes > 5)
        //        {
        //            return Redirect("https://appraisal-eta.vercel.app/my-plans");
        //        }
        //        else
        //        {
        //            var response = _servicesMiddlware.MakePayment(paymentId, token, payerId);
        //            if (response.Success == true)
        //            {
        //                //var Transation_Details = _AppraisallandContext.TransactionLogs.Where(x => x.UserId == UserID).ToList();
        //                //foreach (var item in Transation_Details)
        //                //{
        //                //    item.IsActive = false;
        //                //}
        //                var property_Details = _AppraisallandContext.Properties.Where(x => x.UserId == UserID).ToList();
        //                var plan = _AppraisallandContext.Plans.Where(x => x.Id == PlanId).FirstOrDefault();
        //                var subcription_Dtails = _AppraisallandContext.Subscriptions
        //                                         .Where(x => x.UserId == UserID && x.EndDate >= DateTime.Today && x.PlanId != 0)
        //                                         .OrderBy(x => x.EndDate)
        //                                         .FirstOrDefault();
        //                if (subcription_Dtails != null)
        //                {
        //                    End_date = subcription_Dtails.EndDate;
        //                    Start_date=subcription_Dtails.StartDate;
        //                }

        //                if(plan.MonthlyAmount!=null)
        //                {
        //                    TransactionLog transactionLog = new TransactionLog();
        //                    transactionLog.UserId = UserID;
        //                    transactionLog.TransactionDetail = response.Response.transactions[0].description;
        //                    transactionLog.Paymentid = paymentId;
        //                    transactionLog.PlanAmount = plan.Amount;
        //                    transactionLog.PlanName = plan.PlanName;
        //                    transactionLog.CreatedTime = DateTime.Now;
        //                    transactionLog.IsActive = End_date==null ? true :false;
        //                    transactionLog.UsedProperties = 0;
        //                    transactionLog.TotalProperties = (short)plan.NoOfProperties;
        //                    transactionLog.NoOfProperties = (short)plan.NoOfProperties;
        //                    transactionLog.StartDate = End_date==null ? DateTime.Now : End_date;
        //                    transactionLog.EndDate = End_date == null ? DateTime.Now.AddDays(29) : End_date.Value.AddDays(29);
        //                    _AppraisallandContext.TransactionLogs.Add(transactionLog);
        //                    _AppraisallandContext.SaveChanges();


        //                    Subscription subscription = new Subscription();
        //                    subscription.StartDate = End_date.HasValue ? End_date.Value : DateTime.Now; 
        //                    subscription.EndDate = End_date==null ? DateTime.Now.AddDays(29) : End_date.Value.AddDays(29);
        //                    subscription.PlanId = (short)PlanId;
        //                    subscription.TotalProperties = (short)plan.NoOfProperties;
        //                    subscription.UserId = UserID;
        //                    _AppraisallandContext.Add(subscription);
        //                    _AppraisallandContext.SaveChanges();
        //                }
        //                else
        //                {
        //                    TransactionLog transactionLog = new TransactionLog();
        //                    transactionLog.UserId = UserID;
        //                    transactionLog.TransactionDetail = response.Response.transactions[0].description;
        //                    transactionLog.Paymentid = paymentId;
        //                    transactionLog.PlanAmount = plan.Amount;
        //                    transactionLog.PlanName = plan.PlanName;
        //                    transactionLog.CreatedTime = DateTime.Now;
        //                    transactionLog.UsedProperties = 0;
        //                    transactionLog.IsActive = End_date == null ? true : false;
        //                    transactionLog.NoOfProperties = (short)plan.NoOfProperties;
        //                    transactionLog.StartDate = End_date == null ? DateTime.Now : End_date;
        //                    transactionLog.EndDate = End_date == null ? DateTime.Now.AddDays(28) : End_date.Value.AddDays(28);
        //                    _AppraisallandContext.TransactionLogs.Add(transactionLog);
        //                    _AppraisallandContext.SaveChanges();


        //                    Subscription Obj_subscription = new Subscription();
        //                    Obj_subscription.StartDate = End_date.HasValue ? End_date.Value : DateTime.Now;
        //                    Obj_subscription.EndDate = End_date==null ? DateTime.Now.AddDays(28) : End_date.Value.AddDays(28);
        //                    Obj_subscription.PlanId = (short)PlanId;
        //                    Obj_subscription.TotalProperties = (short)plan.NoOfProperties;
        //                    Obj_subscription.UserId = UserID;
        //                    _AppraisallandContext.Add(Obj_subscription);
        //                    _AppraisallandContext.SaveChanges();
        //                }

        //                _servicesMiddlware.sendSubcriptionMail(email, plan_Name);
        //                return Redirect("http://www.appraisalland.ca/");
        //            }
        //            else
        //            {
        //                return Redirect("https://appraisal-eta.vercel.app/my-plans");
        //            }
        //            //return Ok(new { response.Response,response.Message,response.Success });
        //        }


        //    }
        //    else { return NotFound("Token Not Found"); }
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpDelete("cancelSubscription")]
        public IActionResult cancelSubscription(long userId)
        {
            // var subcription_Details = _AppraisallandContext.Subscriptions.Where(x => x.UserId == userId && x.PlanId != 0).FirstOrDefault();
            var subscriptionDetail = _appraisallandContext.Subscriptions
                                                  .Where(x => x.UserId == userId && x.EndDate >= DateTime.Today && x.PlanId != 0)
                                                  .OrderBy(x => x.EndDate)
                                                  .FirstOrDefault();
            var topUpSubscriptionDetail = _appraisallandContext.Subscriptions.Where(x => x.UserId == userId && x.TopUpId != null).FirstOrDefault();
            if (subscriptionDetail != null)
            {
                var email = _appraisallandContext.UserInformations.Where(x => x.UserId == userId).Select(x => x.Email).FirstOrDefault();
                var tranactionDetail = _appraisallandContext.TransactionLogs.Where(x => x.StartDate == subscriptionDetail.StartDate).FirstOrDefault();
                if (tranactionDetail != null)
                {
                    _appraisallandContext.Remove(tranactionDetail);
                    _appraisallandContext.SaveChanges();
                }
                _appraisallandContext.Remove(subscriptionDetail);
                _appraisallandContext.SaveChanges();
                if (topUpSubscriptionDetail != null)
                {
                    _appraisallandContext.Remove(topUpSubscriptionDetail);
                    _appraisallandContext.SaveChanges();
                }
                var subscription = _appraisallandContext.Subscriptions
                                  .Where(x => x.UserId == userId && x.StartDate >= DateTime.Now && x.PlanId != 0)
                                  .OrderBy(x => x.StartDate) // Order by start date in ascending order
                                  .FirstOrDefault();

                if (subscription != null)
                {
                    var transactionDetail = _appraisallandContext.TransactionLogs.Where(x => x.StartDate == subscription.StartDate).FirstOrDefault();
                    var values = 0;
                    var planId = subscription.PlanId;
                    var planDetail = _appraisallandContext.Plans.Where(x => x.Id == planId).FirstOrDefault();
                    var monthely = planDetail.MonthlyAmount;
                    var yearly = planDetail.YearlyAmount;
                    if (monthely != null)
                    { values = 1; }
                    else { values = 2; }
                    subscription.StartDate = DateTime.Now;
                    subscription.EndDate = values == 1 ? DateTime.Now.AddMonths(1) : DateTime.Now.AddYears(1);
                    _appraisallandContext.Subscriptions.Update(subscription);
                    _appraisallandContext.SaveChanges();

                    if (transactionDetail != null)
                    {
                        transactionDetail.StartDate = DateTime.Now;
                        transactionDetail.EndDate = values == 1 ? DateTime.Now.AddMonths(1) : DateTime.Now.AddYears(1);
                        _appraisallandContext.TransactionLogs.Update(transactionDetail);
                        _appraisallandContext.SaveChanges();
                    }
                }
                _servicesMiddlware.sendCncelSubcriptionMail(email);
                return Ok("subscription cancel successfully");
            }
            else
            {
                return NotFound($"No subcription found with userId:{userId}");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getSubcription")]
        public async Task<IActionResult> getSubscription(long userId)
        {
            int upgradeEligible = 0;
            var activePaypalSubscriptionId = "";
            var futurePaypalSubscriptionId = "";
            var payPalSubscriptionStatus = Enum.GetName(PaypalSubscriptionStatus.Cancel);

            var transactionLogs = _appraisallandContext.TransactionLogs
                            .Where(t => t.UserId == userId)
                            .ToList();

            if (transactionLogs.Count() == 0)
            {
                return Ok(new
                {
                    messageCD = "001",
                    description = "Subscription Details not found for the user"

                });
            }

            if (transactionLogs.Count() >= 2)
            {
                upgradeEligible = 0;
            }
            else
            {
                upgradeEligible = 1;
            }

            var subscriptionDetail = _appraisallandContext.Subscriptions
                                                    .Where(x => x.UserId == userId && x.EndDate >= DateTime.Today && x.PlanId != 0)
                                                    .OrderBy(x => x.EndDate)
                                                    .FirstOrDefault();
            foreach (var transactionLog in transactionLogs)
            {
                if (transactionLog.PaypalSubscriptionStatus == Enum.GetName(PaypalSubscriptionStatus.Active))
                {
                    payPalSubscriptionStatus = Enum.GetName(PaypalSubscriptionStatus.Active);
                }

                if (transactionLog.IsActive == true)
                {
                    if (transactionLog.IsActive == true && transactionLog.PaypalSubscriptionStatus == Enum.GetName(PaypalSubscriptionStatus.Cancel))
                    {
                        upgradeEligible = 0;
                    }

                    var transactionDetails = _appraisallandContext.PaypalTransactionLogs.Where(x => x.UserId == userId && x.PaymentId == transactionLog.PaymentId).FirstOrDefault();

                    activePaypalSubscriptionId = transactionDetails.SubscriptionId;
                }
                else
                {
                    var transactionDetail = _appraisallandContext.PaypalTransactionLogs.Where(x => x.UserId == userId && x.PaymentId == transactionLog.PaymentId).FirstOrDefault();

                    futurePaypalSubscriptionId = transactionDetail.SubscriptionId;
                }
            }

            return Ok(new
            {
                subscriptionDetail,
                upgradeEligible,
                activePaypalSubscriptionId,
                futurePaypalSubscriptionId,
                payPalSubscriptionStatus
            });
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getAllSubcription")]
        public async Task<IActionResult> getAllSubscription()
        {
            var subscriptionDetails = _appraisallandContext.Subscriptions
                                                    .Where(x => x.EndDate >= DateTime.Today && x.PlanId != 0)
                                                    .OrderBy(x => x.EndDate)
                                                    .ToList();
            return Ok(new { subscriptionDetails = subscriptionDetails });
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getAllSubscriptionHistory")]
        public async Task<ActionResult> getAllSubscriptionHistory()
        {
            var subscriptionHistory = _appraisallandContext.TransactionLogs.ToList();
            return Ok(subscriptionHistory);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="payment"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("postSubscriptionsDetails")]
        public async Task<IActionResult> postSubscriptionsDetails([FromBody] PaymentPayload payment)
        {
            try
            {
                Log.WriteLog("start postSubscriptionsDetails function " + payment);
                if (payment == null)
                {
                    return BadRequest("Subscription details cannot be null.");
                }
                var status = _servicesMiddlware.postSubscriptionsDetails(payment);
                if (status)
                {
                    long userId = payment.UserId;
                    var userType = _appraisallandContext.UserInformations.Where(x => x.UserId == userId).Select(x => x.UserType).FirstOrDefault();
                    if (userType == (short)UserType.SubBroker)
                    {
                        var subBrokerDetail = _appraisallandContext.Brokers.Where(x => x.UserId == userId).FirstOrDefault();
                        var brokerageDetail = _appraisallandContext.Brokerages.Where(x => x.Id == subBrokerDetail.BrokerageId).FirstOrDefault();
                        userId = (long)brokerageDetail.UserId;
                    }
                    if (userType == (short)UserType.SubAppraiser)
                    {
                        var subAppraiserDetail = _appraisallandContext.Appraisers.Where(x => x.UserId == userId).FirstOrDefault();
                        var appraiserCompanyDetail = _appraisallandContext.Brokerages.Where(x => x.Id == subAppraiserDetail.CompanyId).FirstOrDefault();
                        userId = (long)appraiserCompanyDetail.UserId;
                    }
                    var transactionLog = _appraisallandContext.TransactionLogs
                                        .Where(x => x.UserId == userId && x.IsActive == true)
                                        .FirstOrDefault();
                    var planLimitExceed = 0;
                    if (transactionLog != null)
                    {
                        if (transactionLog.UsedProperties < transactionLog.TotalProperties)
                        {
                            planLimitExceed = 0;
                        }
                        else
                        {
                            planLimitExceed = 1;
                        }
                    }
                    var topUpPlanDetail = _appraisallandContext.Topups.Where(x => x.Id == payment.TopUpId).FirstOrDefault();
                    var userEmailIds = _appraisallandContext.UserInformations.Where(x => x.UserId == userId).Select(x => x.Email).ToList();
                    var notificationDetail = await _emailSmsNotification.getEmailSmsBody((int)MessageCode.TopUpPlanPurchased);
                    if (notificationDetail != null)
                    {
                        System.Threading.Tasks.Task.Run(async () => await _smtpEmailService.SendEmailToUser(userEmailIds, "Common", "0", notificationDetail.EmailContent, notificationDetail.TriggerPoint, topUpPlanDetail.TopupName));
                    }

                    return Ok(new
                    {
                        Message = "Payment Complete successful!",
                        usedProperties = transactionLog?.UsedProperties ?? 0,
                        totalNoOfProperties = transactionLog?.TotalProperties ?? 0,
                        planLimitExceed = planLimitExceed
                    });
                }
                else
                {
                    return BadRequest("Failed to process subscription details.");
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog("An error occurred while subscription" + ex);
                return StatusCode(500, new { Message = "An error occurred while subscription" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="recurringPayPalSubscription"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("postRecurringSubscriptionsDetails")]
        public async Task<IActionResult> postRecurringSubscriptionsDetails(dynamic recurringPayPalSubscription)
        {
            try
            {
                Log.WriteLog("Started postRecurringSubscriptionsDetails");
                string json = recurringPayPalSubscription.ToString();
                RecurringPayPalSubscription subscription = JsonConvert.DeserializeObject<RecurringPayPalSubscription>(json);
                Log.WriteLog("start postRecurringSubscriptionsDetails function " + json);
                //WriteLogAndUploadToS3("start postRecurringSubscriptionsDetails function " + recurringPayPalSubscription);
                if (subscription == null)
                {
                    return BadRequest("Subscription details cannot be null.");
                }
                Log.WriteLog("subscription is not null");
                var status = await _servicesMiddlware.postRecurringSubscriptionsDetails(subscription);

                long userId = subscription.UserId;
                if (status)
                {
                    var userType = _appraisallandContext.UserInformations.Where(x => x.UserId == userId).Select(x => x.UserType).FirstOrDefault();
                    if (userType == (short)UserType.SubBroker)
                    {
                        var subBrokerDetail = _appraisallandContext.Brokers.Where(x => x.UserId == userId).FirstOrDefault();
                        var brokerageDetail = _appraisallandContext.Brokerages.Where(x => x.Id == subBrokerDetail.BrokerageId).FirstOrDefault();
                        userId = (long)brokerageDetail.UserId;
                    }
                    if (userType == (short)UserType.SubAppraiser)
                    {
                        var subAppraiserDetail = _appraisallandContext.Appraisers.Where(x => x.UserId == userId).FirstOrDefault();
                        var appraiserCompanyDetail = _appraisallandContext.Brokerages.Where(x => x.Id == subAppraiserDetail.CompanyId).FirstOrDefault();
                        userId = (long)appraiserCompanyDetail.UserId;
                    }
                    var transactionLog = _appraisallandContext.TransactionLogs
                                        .Where(x => x.UserId == userId && x.IsActive == true)
                                        .FirstOrDefault();
                    var PlanDetails = _appraisallandContext.Plans.Where(x => x.Id == subscription.newPlanId).FirstOrDefault();
                    var userEmailIds = _appraisallandContext.UserInformations.Where(x => x.UserId == userId).Select(x => x.Email).ToList();
                    var planLimitExceed = 0;
                    if (transactionLog != null)
                    {
                        if (transactionLog.UsedProperties < transactionLog.TotalProperties)
                        {
                            planLimitExceed = 0;
                        }
                        else
                        {
                            planLimitExceed = 1;
                        }
                    }

                    var notificationDetail = await _emailSmsNotification.getEmailSmsBody((int)MessageCode.SubscriptionActivation);
                    if (notificationDetail != null)
                    {
                        System.Threading.Tasks.Task.Run(async () => await _smtpEmailService.SendEmailToUser(userEmailIds, "Common", "0", notificationDetail.EmailContent, notificationDetail.TriggerPoint, PlanDetails.PlanName));
                    }

                    return Ok(new
                    {
                        Message = "Payment Complete successful!",
                        usedProperties = transactionLog?.UsedProperties ?? 0,
                        totalNoOfProperties = transactionLog?.TotalProperties ?? 0,
                        planLimitExceed = planLimitExceed
                    });
                }
                else
                {
                    return BadRequest("Failed to process subscription details.");
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog("An error occurred while subscription" + ex);
                return StatusCode(500, new { Message = "An error occurred while subscription" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="cancelSubscriptionDetails"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("cancelRecurringSubscription")]
        public async Task<IActionResult> cancelRecurringSubscription(dynamic cancelSubscriptionDetails)
        {
            try
            {

                string json = cancelSubscriptionDetails.ToString();
                CancelSubscriptionDetails subscription = JsonConvert.DeserializeObject<CancelSubscriptionDetails>(json);

                Log.WriteLog("start CancelRecurringSubscription function " + cancelSubscriptionDetails);
                // WriteLogAndUploadToS3("start postRecurringSubscriptionsDetails function " + recurringPayPalSubscription);
                if (subscription == null)
                {
                    return BadRequest("Cancel Subscription cannot be null.");
                }
                var status = await _servicesMiddlware.cancelRecurringSubscription(subscription);
                if (status)
                {
                    var emailIds = _appraisallandContext.UserInformations.Where(x => x.UserId == subscription.UserId).Select(x => x.Email).ToList();
                    var notificationDetail = await _emailSmsNotification.getEmailSmsBody((int)MessageCode.SubscriptionCancellation);
                    if (notificationDetail != null)
                    {
                        System.Threading.Tasks.Task.Run(async () => await _smtpEmailService.SendEmailToUser(emailIds, "Common", "0", notificationDetail.EmailContent, notificationDetail.TriggerPoint));
                    }

                    return Ok();
                }
                else
                {
                    return BadRequest("Failed to save Cancel subscription details.");
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog("An error occurred while cancel subscription" + ex);
                return StatusCode(500, new { Message = "An error occurred while while subscription" });
            }
        }
    }
}