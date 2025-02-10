using DAL.Classes;
using DBL.Models;
using Newtonsoft.Json;
using PayPalCheckoutSdk.Subscriptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Rpository
{
    public interface IEmailService
    {
        bool SendEmail(string toEmail,string key);
        bool Email(EmailClass emailClass);
        bool VerifyEmailToken(string token);
        bool sendEmailAddBrokerByBrokerageCompany(string email, BrokerageCls brokerageCls);
        UserInformation getdata(string token);
        UserInformation getUser(string emailId);
       // Task<HttpResponseMessage> Create(SubscriptionRequest subscriptionRequest);

    }
}
