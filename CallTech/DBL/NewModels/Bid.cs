using System;
using System.Collections.Generic;

namespace DBL.NewModels;

public partial class Bid
{
    public long BidId { get; set; }

    public long? PropertyId { get; set; }

    public long? UserId { get; set; }

    public long? AppraiserUserId { get; set; }

    public DateTime? RequestTime { get; set; }

    public DateTime? ResponseTime { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public double? BidAmount { get; set; }

    public double? BidLowerRange { get; set; }

    public double? BidUpperRange { get; set; }
}
