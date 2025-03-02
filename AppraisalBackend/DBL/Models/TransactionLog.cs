namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class TransactionLog
    {
        public long TransactionId { get; set; }

        public string TransactionDetail { get; set; } = null!;

        public long? UserId { get; set; }

        public string? PaymentId { get; set; }

        public DateTime? CreatedTime { get; set; }

        public double? PlanAmount { get; set; }

        public string? PlanName { get; set; }

        public bool? IsActive { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public long? UsedProperties { get; set; }

        public long TotalProperties { get; set; }

        public string? PaypalSubscriptionStatus { get; set; }
    }
}