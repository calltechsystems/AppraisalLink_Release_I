using System;
using System.Collections.Generic;

namespace DBL.NewModels;

public partial class Subscription
{
    public long SubscriptionId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public short PlanId { get; set; }

    public short TotalProperties { get; set; }

    public short? UsedProperties { get; set; }

    public long? UserId { get; set; }
}
