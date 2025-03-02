//using Common.Models.Backend;
using DAL.Classes;
using DBL.Backend;
using PayPal.Api;

namespace DAL.Repository
{
    public interface IServicesMiddleware
    {
        ServiceResponse<string> PaymentUrl(string planName, long userId);
        ServiceResponse<Payment> MakePayment(string paymentId, string token, string payerId);
        bool IsValid(long id);
        bool sendSubcriptionMail(string email, string planName);
        bool sendCncelSubcriptionMail(string email);

        bool postSubscriptionsDetails(PaymentPayload subscription);
        Task<bool> postRecurringSubscriptionsDetails(RecurringPayPalSubscription recurringPayPalSubscription);
        Task<bool> cancelRecurringSubscription(CancelSubscriptionDetails recurringPayPalSubscription);

    }
}
