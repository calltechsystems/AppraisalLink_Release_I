using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
//using DBL.NewModels;

namespace Backend.Api.Controllers;

[Route("api/com.appraisalland.Payments")]
[ApiController]
public class PaymentsController : ControllerBase
{
    private readonly AppraisalLandsContext _AppraisallandContext;
    private readonly IServicesMiddleware _servicesMiddlware;

    public PaymentsController(IServicesMiddleware servicesMiddlware, AppraisalLandsContext AppraisallandContext)
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
    [Route("paymenturl")]
    [HttpPost]
    public IActionResult PaymentUrl(string PlanName, long UserId)
    {
        var Isvalid = _servicesMiddlware.IsValid(UserId);
        if (Isvalid)
        {
            var response = _servicesMiddlware.PaymentUrl(PlanName, UserId);
            var paymentToken = new PaymentToken();


            var parts = response.Response.Split('&');

            string token = null;
            foreach (var part in parts)
                if (part.StartsWith("token="))
                {
                    token = part.Substring("token=".Length);
                    break;
                }

            var userDetails = _AppraisallandContext.UserInformations.Where(x => x.UserId == UserId)
                .Select(x => x.UserType).FirstOrDefault();
            var plan_details = _AppraisallandContext.Plans
                .Where(x => x.PlanName.ToLower() == PlanName.ToLower() && x.UserType == userDetails).FirstOrDefault();
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

    [Route("payment")]
    [HttpGet]
    public IActionResult Payment(long UserID, long PlanId, string paymentId, string token, string payerId)
    {
        DateTime? End_date = null;
        DateTime? Start_date = null;
        var PaymentTokenDetails = _AppraisallandContext.PaymentTokens.Where(x => x.Token == token).FirstOrDefault();
        var email = _AppraisallandContext.UserInformations.Where(x => x.UserId == UserID).Select(x => x.Email)
            .FirstOrDefault();
        var plan_Name = _AppraisallandContext.Plans.Where(x => x.Id == PlanId).Select(x => x.PlanName).FirstOrDefault();
        if (PaymentTokenDetails != null)
        {
            var currentDateTime = DateTime.UtcNow;
            var tokenDateTime = PaymentTokenDetails.Currentdatetime;

            var difference = currentDateTime - tokenDateTime;

            if (difference.TotalMinutes > 5) return Redirect("https://appraisal-eta.vercel.app/my-plans");

            var response = _servicesMiddlware.MakePayment(paymentId, token, payerId);
            if (response.Success)
            {
                //var Transation_Details = _AppraisallandContext.TransactionLogs.Where(x => x.UserId == UserID).ToList();
                //foreach (var item in Transation_Details)
                //{
                //    item.IsActive = false;
                //}
                var property_Details = _AppraisallandContext.Properties.Where(x => x.UserId == UserID).ToList();
                var plan = _AppraisallandContext.Plans.Where(x => x.Id == PlanId).FirstOrDefault();
                var subcription_Dtails = _AppraisallandContext.Subscriptions
                    .Where(x => x.UserId == UserID && x.EndDate >= DateTime.Today && x.PlanId != 0)
                    .OrderBy(x => x.EndDate)
                    .FirstOrDefault();
                if (subcription_Dtails != null)
                {
                    End_date = subcription_Dtails.EndDate;
                    Start_date = subcription_Dtails.StartDate;
                }

                if (plan.MonthlyAmount != null)
                {
                    var transactionLog = new TransactionLog();
                    transactionLog.UserId = UserID;
                    transactionLog.TransactionDetail = response.Response.transactions[0].description;
                    transactionLog.Paymentid = paymentId;
                    transactionLog.PlanAmount = plan.Amount;
                    transactionLog.PlanName = plan.PlanName;
                    transactionLog.CreatedTime = DateTime.Now;
                    transactionLog.IsActive = End_date == null ? true : false;
                    transactionLog.UsedProperties = 0;
                    transactionLog.TotalProperties = (short)plan.NoOfProperties;
                    transactionLog.NoOfProperties = (short)plan.NoOfProperties;
                    transactionLog.StartDate = End_date == null ? DateTime.Now : End_date;
                    transactionLog.EndDate = End_date == null ? DateTime.Now.AddDays(29) : End_date.Value.AddDays(29);
                    _AppraisallandContext.TransactionLogs.Add(transactionLog);
                    _AppraisallandContext.SaveChanges();


                    var subscription = new Subscription();
                    subscription.StartDate = End_date.HasValue ? End_date.Value : DateTime.Now;
                    subscription.EndDate = End_date == null ? DateTime.Now.AddDays(29) : End_date.Value.AddDays(29);
                    subscription.PlanId = (short)PlanId;
                    subscription.TotalProperties = (short)plan.NoOfProperties;
                    subscription.UserId = UserID;
                    _AppraisallandContext.Add(subscription);
                    _AppraisallandContext.SaveChanges();
                }
                else
                {
                    var transactionLog = new TransactionLog();
                    transactionLog.UserId = UserID;
                    transactionLog.TransactionDetail = response.Response.transactions[0].description;
                    transactionLog.Paymentid = paymentId;
                    transactionLog.PlanAmount = plan.Amount;
                    transactionLog.PlanName = plan.PlanName;
                    transactionLog.CreatedTime = DateTime.Now;
                    transactionLog.UsedProperties = 0;
                    transactionLog.IsActive = End_date == null ? true : false;
                    transactionLog.NoOfProperties = (short)plan.NoOfProperties;
                    transactionLog.StartDate = End_date == null ? DateTime.Now : End_date;
                    transactionLog.EndDate = End_date == null ? DateTime.Now.AddDays(28) : End_date.Value.AddDays(28);
                    _AppraisallandContext.TransactionLogs.Add(transactionLog);
                    _AppraisallandContext.SaveChanges();


                    var Obj_subscription = new Subscription();
                    Obj_subscription.StartDate = End_date.HasValue ? End_date.Value : DateTime.Now;
                    Obj_subscription.EndDate = End_date == null ? DateTime.Now.AddDays(28) : End_date.Value.AddDays(28);
                    Obj_subscription.PlanId = (short)PlanId;
                    Obj_subscription.TotalProperties = (short)plan.NoOfProperties;
                    Obj_subscription.UserId = UserID;
                    _AppraisallandContext.Add(Obj_subscription);
                    _AppraisallandContext.SaveChanges();
                }

                _servicesMiddlware.sendSubcriptionMail(email, plan_Name);
                return Redirect("http://www.appraisalland.ca/");
            }

            return Redirect("https://appraisal-eta.vercel.app/my-plans");
            //return Ok(new { response.Response,response.Message,response.Success });
        }

        return NotFound("Token Not Found");
    }

    // [Authorize]
    [HttpDelete("cancelSubscription")]
    public IActionResult cancelSubscription(long userId)
    {
        // var subcription_Details = _AppraisallandContext.Subscriptions.Where(x => x.UserId == userId && x.PlanId != 0).FirstOrDefault();
        var subcription_Dtails = _AppraisallandContext.Subscriptions
            .Where(x => x.UserId == userId && x.EndDate >= DateTime.Today && x.PlanId != 0)
            .OrderBy(x => x.EndDate)
            .FirstOrDefault();
        var Topupsubcription_Details = _AppraisallandContext.Subscriptions
            .Where(x => x.UserId == userId && x.TopUpId != null).FirstOrDefault();
        if (subcription_Dtails != null)
        {
            var email = _AppraisallandContext.UserInformations.Where(x => x.UserId == userId).Select(x => x.Email)
                .FirstOrDefault();
            var tran_details = _AppraisallandContext.TransactionLogs
                .Where(x => x.StartDate == subcription_Dtails.StartDate).FirstOrDefault();
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
                var transationDetails = _AppraisallandContext.TransactionLogs
                    .Where(x => x.StartDate == subscription.StartDate).FirstOrDefault();
                var values = 0;
                var plan_id = subscription.PlanId;
                var plan_details = _AppraisallandContext.Plans.Where(x => x.Id == plan_id).FirstOrDefault();
                var monthely = plan_details.MonthlyAmount;
                var yearly = plan_details.YearlyAmount;
                if (monthely != null)
                    values = 1;
                else
                    values = 2;
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

        return NotFound($"No subcription found with userId:{userId}");
    }

    [Authorize]
    [HttpGet("getSubcription")]
    public async Task<IActionResult> getSubcription(long userId)
    {
        var subcription_Dtails = _AppraisallandContext.Subscriptions
            .Where(x => x.UserId == userId && x.EndDate >= DateTime.Today && x.PlanId != 0)
            .OrderBy(x => x.EndDate)
            .FirstOrDefault();
        return Ok(new { subcription_Dtails });
    }

    [Authorize]
    [HttpGet("getAllSubcription")]
    public async Task<IActionResult> getAllSubcription()
    {
        var subcription_Dtails = _AppraisallandContext.Subscriptions
            .Where(x => x.EndDate >= DateTime.Today && x.PlanId != 0)
            .OrderBy(x => x.EndDate)
            .ToList();
        return Ok(new { subcription_Dtails });
    }

    [Authorize]
    [HttpGet("getAllSubscriptionHistory")]
    public async Task<ActionResult> getAllSubscriptionHistory()
    {
        var subcription_history = _AppraisallandContext.TransactionLogs.ToList();
        return Ok(subcription_history);
    }
}