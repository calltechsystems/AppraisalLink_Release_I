namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class PaypalTransactionLog
    {
        public int Logid { get; set; }

        public int Userid { get; set; }

        public string Paymentid { get; set; } = null!;

        public string Planid { get; set; } = null!;

        public int? Totalpropertiesofplan { get; set; }

        public string? Paymenttype { get; set; }

        public DateTime? Stratdate { get; set; }

        public DateTime? Enddate { get; set; }

        public string? Paymentrequestsent { get; set; }

        public string? Paymentresponsereceived { get; set; }

        public string? Status { get; set; }

        public string? Currencycode { get; set; }

        public string? Brandname { get; set; }

        public string? Useraction { get; set; }

        public string? Returnurl { get; set; }

        public string? Cancelurl { get; set; }

        public string? Locale { get; set; }

        public string? PaymentSource { get; set; }

        public string? SubscriberProfileName { get; set; }

        public string? SubscriberEmailId { get; set; }

        public string? SubscriberPhoneId { get; set; }

        public string? SubscriptionId { get; set; }
    }
}