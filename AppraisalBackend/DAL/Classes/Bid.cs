namespace DAL.Classes;

public class Bid
{
    public long? OrderId { get; set; }

    public long? UserId { get; set; }

    public long? AppraiserUserId { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public double? BidAmount { get; set; }

    public int? BidLowerRange { get; set; }

    public int? BidUpperRange { get; set; }
}