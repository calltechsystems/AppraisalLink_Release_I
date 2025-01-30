namespace DBL.Models;

public class Plan
{
    public short Id { get; set; }

    public string PlanName { get; set; } = null!;

    public double Amount { get; set; }

    public int NoOfProperties { get; set; }

    public string Description { get; set; } = null!;

    public string Returnurl { get; set; } = null!;

    public string? Currencycode { get; set; }

    public double? MonthlyAmount { get; set; }

    public double? Discount { get; set; }

    public double? YearlyAmount { get; set; }

    public short UserType { get; set; }
}