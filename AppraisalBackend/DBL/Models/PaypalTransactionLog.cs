namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class PaypalTransactionLog
    {
        public int LogId { get; set; }

        public int UserId { get; set; }

        public string PaymentId { get; set; } = null!;

        public string PlanId { get; set; } = null!;

        public int? TotalPropertiesOfPlan { get; set; }

        public string? PaymentType { get; set; }

        public DateTime? StratDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string? PaymentRequestSent { get; set; }

        public string? PaymentResponseReceived { get; set; }

        public string? Status { get; set; }

        public string? CurrencyCode { get; set; }

        public string? BrandName { get; set; }

        public string? UserAction { get; set; }

        public string? ReturnUrl { get; set; }

        public string? CancelUrl { get; set; }

        public string? Locale { get; set; }

        public string? PaymentSource { get; set; }

        public string? SubscriberProfileName { get; set; }

        public string? SubscriberEmailId { get; set; }

        public string? SubscriberPhoneId { get; set; }

        public string? SubscriptionId { get; set; }
    }
}