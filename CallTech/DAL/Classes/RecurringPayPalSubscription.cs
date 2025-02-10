using PayPalCheckoutSdk.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Classes
{
    public class RecurringPayPalSubscription
    {
        public int UserId { get; set; }
        public int newPlanId { get; set; }
        public string CustomId { get; set; } 
        public string PaymentId { get; set; } 
        public DateTime StartTime { get; set; } 
        public string PaymentStatus { get; set; }
        public string paypalSubscriptionId { get; set; }
        public string Paymenttype { get; set; }
        public string Currencycode { get; set; }
        public SubscriberInfo Subscriber { get; set; }
        public PaymentSource PaymentSource { get; set; }
        public ApplicationContext ApplicationContext { get; set; }

        public string PaymentRequestSent { get; set; } 
        public string PaymentRequestReceived { get; set; } 
    }
    public class SubscriberInfo
    {
        public string ProfileName { get; set; }
        public string EmailId { get; set; }
        public string PhoneId { get; set; }
    }

    public class PaymentSource
    {
        public string Source { get; set; } 
    }

    public class ApplicationContext
    {
        public string BrandName   { get; set; } 
        public string UserAction  { get; set; } 
        public string ReturnUrl   { get; set; }
        public string CancelUrl   { get; set; }
        public string Locale      { get; set; }
    }

}
