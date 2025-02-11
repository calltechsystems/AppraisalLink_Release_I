namespace DAL.Classes
{
    public class PlanClass
    {
        public string PlanName { get; set; } = null!;

        public double Amount { get; set; }

        public int NoOfProperties { get; set; }

        public string? Description { get; set; }

        public string? Currencycode { get; set; }

        public double? MonthlyAmount { get; set; }

        public double? YearlyAmount { get; set; }

        public double? Discount { get; set; }
    }
}
