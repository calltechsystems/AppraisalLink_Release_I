namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class Plan
    {
        public short Id { get; set; }

        public string PlanName { get; set; } = null!;

        public double PlanValidity { get; set; }

        public int NoOfProperties { get; set; }

        public string Description { get; set; } = null!;

        public string ReturnUrl { get; set; } = null!;

        public string? CurrencyCode { get; set; }

        public double? MonthlyAmount { get; set; }

        public double? Discount { get; set; }

        public double? YearlyAmount { get; set; }

        public short UserType { get; set; }

        public string? PayPalProductId { get; set; }
    }
}