namespace DBL.Models;

public class Bid
{
    public long BidId { get; set; }

    public long? OrderId { get; set; }

    public long? UserId { get; set; }

    public long? AppraiserUserId { get; set; }

    public DateTime? RequestTime { get; set; }

    public DateTime? ResponseTime { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public double? BidAmount { get; set; }

    public int? BidLowerRange { get; set; }

    public int? BidUpperRange { get; set; }

    public int? Orderstatus { get; set; }

    public long? Assignedby { get; set; }

    public string? Remark { get; set; }

    public string? LenderListUrl { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Statusdate { get; set; }

    public string? AppraiserName { get; set; }

    public bool? AppraiserAssign { get; set; }
}