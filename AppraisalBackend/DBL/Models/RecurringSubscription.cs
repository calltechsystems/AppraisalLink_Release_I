namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class RecurringSubscription
    {
        public int SubscriptionId { get; set; }

        public DateOnly? StartDate { get; set; }

        public DateOnly? EndDate { get; set; }

        public int? PlanId { get; set; }

        public int? TotalProperties { get; set; }

        public int? UsedProperties { get; set; }

        public int? UserId { get; set; }

        public int? TopUpId { get; set; }
    }
}