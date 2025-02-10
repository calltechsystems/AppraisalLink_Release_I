using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Classes
{
    public class CancelSubscriptionDetails
    {
        public string CustomId { get; set; }
        public int UserId { get; set; }
        public string PlanId { get; set; }
        public string PaypalSubscriptionId { get; set; }
        public DateTime CancellationDateTime { get; set; }
        public CancelSubscriberDetails Subscriber { get; set; }
        public CancelApplicationContext ApplicationContext { get; set; }
        public CancelPaymentSource PaymentSource { get; set; }
        public string PaymentStatus { get; set; } 
        public string SubscriptionStatus { get; set; }
        public string PaymentType { get; set; }
        public string CurrencyCode { get; set; }
        public string PaymentId { get; set; }
        public string PaymentRequestSent { get; set; }
        public string PaymentRequestReceived { get; set; }
    }
    public class CancelSubscriberDetails
    {
        public string ProfileName { get; set; }
        public string PhoneId { get; set; } 
        public string EmailId { get; set; } 
    }

    public class CancelApplicationContext
    {
        public string BrandName { get; set; }
        public string Locale { get; set; }
        public string UserAction { get; set; } 
        public string ReturnUrl { get; set; } 
        public string CancelUrl { get; set; }
    }

    public class CancelPaymentSource
    {
        public string Source { get; set; }
    }
}
