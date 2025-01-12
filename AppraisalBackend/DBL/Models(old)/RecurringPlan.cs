using System;
using System.Collections.Generic;

namespace DBL.Models;

public partial class RecurringPlan
{
    public string Id { get; set; } = null!;

    public string? ProductId { get; set; }

    public string? Name { get; set; }

    public string? Status { get; set; }

    public string? Description { get; set; }

    public string? UsageType { get; set; }

    public DateTime? CreateTime { get; set; }

    public string? Links { get; set; }

    public string? Returnurl { get; set; }

    public int? NoOfProperties { get; set; }

    public int? Ammount { get; set; }
}
