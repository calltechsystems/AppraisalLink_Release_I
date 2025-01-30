//using Common.Models.Backend;

using DBL.Backend;
using PayPal.Api;

namespace DAL.Repository;

public interface IServicesMiddleware
{
    ServiceResponse<string> PaymentUrl(string PlanName, long UserId);
    ServiceResponse<Payment> MakePayment(string paymentId, string token, string payerId);
    bool IsValid(long id);
    bool sendSubcriptionMail(string email, string planName);
    bool sendCncelSubcriptionMail(string email);
}