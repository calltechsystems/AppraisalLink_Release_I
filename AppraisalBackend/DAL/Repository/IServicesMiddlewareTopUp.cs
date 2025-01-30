using DBL.Backend;
using PayPal.Api;

namespace DAL.Repository;

public interface IServicesMiddlewareTopUp
{
    ServiceResponse<string> PaymentUrl(long UserId);
    ServiceResponse<Payment> MakePayment(string paymentId, string token, string payerId);
    bool IsValid(long id);
    bool sendMailBuyTopUpPlan(string email, string planName);
}