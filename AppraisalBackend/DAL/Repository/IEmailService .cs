using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
    public interface IEmailService
    {
        bool SendEmail(string toEmail, string key);
        bool Email(EmailClass emailClass);
        bool VerifyEmailToken(string token);
        bool sendEmailAddBrokerByBrokerageCompany(string email, BrokerageCls brokerageCls);
        UserInformation getdata(string token);
        UserInformation getUser(string emailId);
        // Task<HttpResponseMessage> Create(SubscriptionRequest subscriptionRequest);

    }
}