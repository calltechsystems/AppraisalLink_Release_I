//using Common.Models.Backend;
using DAL.Classes;
using DBL.Backend;
using PayPal.Api;
using System;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public interface IServicesMiddleware
    {
        ServiceResponse<string> PaymentUrl(string PlanName, long UserId);
        ServiceResponse<Payment> MakePayment(string paymentId, string token, string payerId);
        bool IsValid(long  id);
        bool sendSubcriptionMail(string email,string planName);
        bool sendCncelSubcriptionMail(string email);

        bool postSubscriptionsDetails(PaymentPyload subscription);
        Task<bool> postRecurringSubscriptionsDetails(RecurringPayPalSubscription  recurringPayPalSubscription);
        Task<bool> cancelRecurringSubscription(CancelSubscriptionDetails  recurringPayPalSubscription);

    }
}
