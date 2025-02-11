using CallTech;
using DAL.Classes;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CallTech.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.Payments")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IServicesMiddleware _servicesMiddlware;
        private readonly AppraisallandsContext _AppraisallandContext;
        Log Log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="servicesMiddlware"></param>
        /// <param name="AppraisallandContext"></param>
        public PaymentsController(IServicesMiddleware servicesMiddlware, AppraisallandsContext AppraisallandContext)
        {
            _servicesMiddlware = servicesMiddlware;
            _AppraisallandContext = AppraisallandContext;
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
        // [Authorize]

        /// <summary>
        /// 
        /// </summary>
        /// <param name="PlanName"></param>
        /// <param name="UserId"></param>
        /// <returns></returns>
        [Route("paymenturl")]
        [HttpPost]
        public IActionResult PaymentUrl(string PlanName, long UserId)
        {
            bool Isvalid = _servicesMiddlware.IsValid(UserId);
            if (Isvalid)
            {
                var response = _servicesMiddlware.PaymentUrl(PlanName, UserId);
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

                var userDetails = _AppraisallandContext.UserInformations.Where(x => x.UserId == UserId).Select(x => x.UserType).FirstOrDefault();
                var plan_details = _AppraisallandContext.Plans.Where(x => x.PlanName.ToLower() == PlanName.ToLower() && x.UserType == userDetails).FirstOrDefault();
                paymentToken.Currentdatetime = DateTime.Now;
                paymentToken.Userid = Convert.ToInt32(UserId);
                paymentToken.Token = token;
                paymentToken.Planid = Convert.ToInt32(plan_details.Id);
                _AppraisallandContext.PaymentTokens.Add(paymentToken);
                _AppraisallandContext.SaveChanges();

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
            var subcription_Dtails = _AppraisallandContext.Subscriptions
                                                  .Where(x => x.UserId == userId && x.EndDate >= DateTime.Today && x.PlanId != 0)
                                                  .OrderBy(x => x.EndDate)
                                                  .FirstOrDefault();
            var Topupsubcription_Details = _AppraisallandContext.Subscriptions.Where(x => x.UserId == userId && x.TopUpId != null).FirstOrDefault();
            if (subcription_Dtails != null)
            {
                var email = _AppraisallandContext.UserInformations.Where(x => x.UserId == userId).Select(x => x.Email).FirstOrDefault();
                var tran_details = _AppraisallandContext.TransactionLogs.Where(x => x.StartDate == subcription_Dtails.StartDate).FirstOrDefault();
                if (tran_details != null)
                {
                    _AppraisallandContext.Remove(tran_details);
                    _AppraisallandContext.SaveChanges();
                }
                _AppraisallandContext.Remove(subcription_Dtails);
                _AppraisallandContext.SaveChanges();
                if (Topupsubcription_Details != null)
                {
                    _AppraisallandContext.Remove(Topupsubcription_Details);
                    _AppraisallandContext.SaveChanges();
                }
                var subscription = _AppraisallandContext.Subscriptions
                                  .Where(x => x.UserId == userId && x.StartDate >= DateTime.Now && x.PlanId != 0)
                                  .OrderBy(x => x.StartDate) // Order by start date in ascending order
                                  .FirstOrDefault();

                if (subscription != null)
                {
                    var transationDetails = _AppraisallandContext.TransactionLogs.Where(x => x.StartDate == subscription.StartDate).FirstOrDefault();
                    var values = 0;
                    var plan_id = subscription.PlanId;
                    var plan_details = _AppraisallandContext.Plans.Where(x => x.Id == plan_id).FirstOrDefault();
                    var monthely = plan_details.MonthlyAmount;
                    var yearly = plan_details.YearlyAmount;
                    if (monthely != null)
                    { values = 1; }
                    else { values = 2; }
                    subscription.StartDate = DateTime.Now;
                    subscription.EndDate = values == 1 ? DateTime.Now.AddMonths(1) : DateTime.Now.AddYears(1);
                    _AppraisallandContext.Subscriptions.Update(subscription);
                    _AppraisallandContext.SaveChanges();

                    if (transationDetails != null)
                    {
                        transationDetails.StartDate = DateTime.Now;
                        transationDetails.EndDate = values == 1 ? DateTime.Now.AddMonths(1) : DateTime.Now.AddYears(1);
                        _AppraisallandContext.TransactionLogs.Update(transationDetails);
                        _AppraisallandContext.SaveChanges();
                    }
                }
                _servicesMiddlware.sendCncelSubcriptionMail(email);
                return Ok("subcription cancel successfully");
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
        public async Task<IActionResult> getSubcription(long userId)
        {
            int upgradeEligible = 0;
            var activePaypalSubscriptionId = "";
            var futurePaypalSubscriptionId = "";

            var transactions = _AppraisallandContext.TransactionLogs
                            .Where(t => t.UserId == userId)
                            .ToList();
          

            if (transactions.Count()==0)
            {
                return Ok(new
                {
                    messageCD = "001",
                    description = "Subscription Details not found for the user"
                   
                });
            }

            if (transactions.Count() >= 2) 
            { 
                upgradeEligible = 0; 
            }
            else 
            { 
                upgradeEligible = 1; 
            }

            var subcription_Dtails = _AppraisallandContext.Subscriptions
                                                    .Where(x => x.UserId == userId && x.EndDate >= DateTime.Today && x.PlanId != 0)
                                                    .OrderBy(x => x.EndDate)
                                                    .FirstOrDefault();
            foreach (var transaction in transactions)
            {
                if (transaction.IsActive == true)
                {
                    if (transaction.IsActive == true && transaction.PaypalSubscriptionStatus == "Cancel")
                    {
                        upgradeEligible = 0;
                    }

                    var transactionDetails = _AppraisallandContext.PaypalTransactionLogs.Where(x => x.Userid == userId && x.Paymentid == transaction.Paymentid).FirstOrDefault();

                    activePaypalSubscriptionId = transactionDetails.SubscriptionId;
                }
                else
                {
                    var transactionDetails = _AppraisallandContext.PaypalTransactionLogs.Where(x => x.Userid == userId && x.Paymentid == transaction.Paymentid).FirstOrDefault();

                    futurePaypalSubscriptionId = transactionDetails.SubscriptionId;
                }
            }

            return Ok(new
            {
                subcription_Dtails,
                upgradeEligible,
                activePaypalSubscriptionId,
                futurePaypalSubscriptionId
            });
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getAllSubcription")]
        public async Task<IActionResult> getAllSubcription()
        {
            var subcription_Dtails = _AppraisallandContext.Subscriptions
                                                    .Where(x => x.EndDate >= DateTime.Today && x.PlanId != 0)
                                                    .OrderBy(x => x.EndDate)
                                                    .ToList();
            return Ok(new { subcription_Dtails = subcription_Dtails });
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getAllSubscriptionHistory")]
       public async Task<ActionResult> getAllSubscriptionHistory()
        {
            var subcription_history = _AppraisallandContext.TransactionLogs.ToList();
            return Ok(subcription_history);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="payment"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("postSubscriptionsDetails")]
        public IActionResult postSubscriptionsDetails([FromBody] PaymentPyload payment)
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
                    return Ok(payment);
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
                Log.WriteLog("hIT postRecurringSubscriptionsDetails");
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
                if (status)
                {
                    return Ok();
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
                var status =await _servicesMiddlware.cancelRecurringSubscription(subscription);
                if (status)
                {
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