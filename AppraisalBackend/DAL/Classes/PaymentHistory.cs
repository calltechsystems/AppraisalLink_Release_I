namespace DAL.Classes
{
    public class PaymentHistory
    {
        public long? UserId { get; set; }

        public string? Paymentid { get; set; }
        public double? PlanAmount { get; set; }

        public string? PlanName { get; set; }

        public bool? IsActive { get; set; }
        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
        public string PlanType { get; set; } = "Monthly";
    }
}
