namespace DAL.Classes;

public class ClsBid
{
    public long? OrderId { get; set; }

    public long? appraiserId { get; set; }
    public string? Description { get; set; }

    public double? BidAmount { get; set; }
    //public string? LenderListUrl { get; set; }
}