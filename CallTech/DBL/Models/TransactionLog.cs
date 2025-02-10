using System;
using System.Collections.Generic;

namespace DBL.Models;

public partial class TransactionLog
{
    public long TransactionId { get; set; }

    public string TransactionDetail { get; set; } = null!;

    public long? UserId { get; set; }

    public string? Paymentid { get; set; }

    public DateTime? CreatedTime { get; set; }

    public double? PlanAmount { get; set; }

    public string? PlanName { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public short? UsedProperties { get; set; }

    public short TotalProperties { get; set; }

    public string? PaypalSubscriptionStatus { get; set; }
}
