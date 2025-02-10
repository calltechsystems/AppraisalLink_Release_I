using System;
using System.Collections.Generic;

namespace DBL.NewModels;

public partial class Plan
{
    public short Id { get; set; }

    public string PlanName { get; set; } = null!;

    public double Amount { get; set; }

    public int NoOfProperties { get; set; }

    public string? Description { get; set; }

    public string? Returnurl { get; set; }

    public string? Currencycode { get; set; }

    public double? MonthlyAmount { get; set; }

    public double? YearlyAmount { get; set; }

    public double? Discount { get; set; }
}
