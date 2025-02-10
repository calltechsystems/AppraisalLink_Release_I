using System;
using System.Collections.Generic;

namespace CallTech.Model;

public partial class Plan
{
    public short Id { get; set; }

    public string PlanName { get; set; } = null!;

    public double Amount { get; set; }

    public int NoOfProperties { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
}
