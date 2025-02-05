using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers;

[Route("api/com.appraisalland.TopUpPayments")]
[ApiController]
public class PlanTopUpController : ControllerBase
{
    private readonly AppraisalLandsContext _AppraisallandContext;
    private readonly IServicesMiddlewareTopUp _servicesMiddlware;


    public PlanTopUpController(IServicesMiddlewareTopUp servicesMiddlware, AppraisalLandsContext AppraisallandContext)
    {
        _AppraisallandContext = AppraisallandContext;
        _servicesMiddlware = servicesMiddlware;
    }

    [HttpPost("createTopUpPlan")]
    public IActionResult createTopUpPlan(long UserId)
    {
        var Isvalid = _servicesMiddlware.IsValid(UserId);
        if (Isvalid)
        {
            var response = _servicesMiddlware.PaymentUrl(UserId);
            var paymentToken = new PaymentToken();


            var parts = response.Response.Split('&');

            string token = null;
            foreach (var part in parts)
                if (part.StartsWith("token="))
                {
                    token = part.Substring("token=".Length);
                    break;
                }

            var user_details = _AppraisallandContext.UserInformations.Where(x => x.UserId == UserId)
                .Select(x => x.UserType).FirstOrDefault();
            var topupid = _AppraisallandContext.Topups.Where(x => x.UserType == user_details).Select(x => x.Id)
                .FirstOrDefault();
            paymentToken.Currentdatetime = DateTime.Now;
            paymentToken.Userid = Convert.ToInt32(UserId);
            paymentToken.Token = token;
            paymentToken.TopUpId = Convert.ToInt32(topupid);
            _AppraisallandContext.PaymentTokens.Add(paymentToken);
            _AppraisallandContext.SaveChanges();

            return Ok(new { response.Response, response.Message, response.Success, response.Error });
        }

        return NotFound("User not found");
    }

    [Route("payment")]
    [HttpGet]
    public IActionResult Payment(long UserID, long TopUp, string paymentId, string token, string payerId)
    {
        var PaymentTokenDetails = _AppraisallandContext.PaymentTokens.Where(x => x.Token == token).FirstOrDefault();
        if (PaymentTokenDetails != null)
        {
            var currentDateTime = DateTime.UtcNow;
            var tokenDateTime = PaymentTokenDetails.Currentdatetime;

            var difference = currentDateTime - tokenDateTime;

            if (difference.Minutes > 5) return Redirect("https://appraisal-eta.vercel.app/my-plans");

            var response = _servicesMiddlware.MakePayment(paymentId, token, payerId);
            if (response.Success)
            {
                var topUp = _AppraisallandContext.Topups.Where(x => x.Id == TopUp).FirstOrDefault();
                var email = _AppraisallandContext.UserInformations.Where(c => c.UserId == UserID).Select(c => c.Email)
                    .FirstOrDefault();
                var subcription_Dtails = _AppraisallandContext.Subscriptions
                    .Where(x => x.UserId == UserID && x.EndDate >= DateTime.Today && x.PlanId != 0)
                    .OrderBy(x => x.EndDate)
                    .FirstOrDefault();
                var property_Details = _AppraisallandContext.Properties.Where(x => x.UserId == UserID).ToList();

                if (subcription_Dtails != null)
                {
                    var transactions = _AppraisallandContext.TransactionLogs.Where(x =>
                        x.UserId == UserID && x.IsActive == true && x.TransactionDetail.Contains("topup")).ToList();
                    //  transactionLog Obj_transaction = new transactionLog();
                    var count = subcription_Dtails.TotalProperties;
                    foreach (var transaction in transactions)
                        if (transaction.UsedProperties == transaction.TotalProperties)
                        {
                            transaction.IsActive = false;
                            _AppraisallandContext.Update(transaction);
                            _AppraisallandContext.SaveChanges();
                        }

                    //Obj_transaction.TotalProperties = (short)(count + topUp.NoOfProperties);
                    //_AppraisallandContext.Update(Obj_transaction);
                    //_AppraisallandContext.SaveChanges();
                    var transactionLog = new TransactionLog();
                    transactionLog.UserId = UserID;
                    transactionLog.TransactionDetail = response.Response.transactions[0].description;
                    transactionLog.Paymentid = paymentId;
                    transactionLog.PlanAmount = (double)topUp.TupUpAmount;
                    transactionLog.PlanName = topUp.Topupname;
                    transactionLog.CreatedTime = DateTime.Now;
                    transactionLog.IsActive = true;
                    transactionLog.NoOfProperties = (short)topUp.NoOfProperties;
                    transactionLog.StartDate = subcription_Dtails.StartDate;
                    transactionLog.EndDate = subcription_Dtails.EndDate;
                    transactionLog.TotalProperties = (short)topUp.NoOfProperties;
                    transactionLog.UsedProperties = 0;
                    _AppraisallandContext.TransactionLogs.Add(transactionLog);
                    _AppraisallandContext.SaveChanges();

                    var subscription = new Subscription();
                    subscription.StartDate = DateTime.Now;
                    subscription.EndDate = DateTime.Now.AddDays(29);
                    subscription.TopUpId = (short)TopUp;
                    subscription.TotalProperties = (short)topUp.NoOfProperties;
                    subscription.UserId = UserID;
                    _AppraisallandContext.Add(subscription);
                    _AppraisallandContext.SaveChanges();
                    _servicesMiddlware.sendMailBuyTopUpPlan(email, topUp.Topupname);
                    return Redirect("http://www.appraisalland.ca/");
                }

                return NotFound("No matching subscription found");
            }

            return Redirect("https://appraisal-eta.vercel.app/my-plans");
            //return Ok(new { response.Response,response.Message,response.Success });
        }

        return NotFound("Token Not Found");
    }
}