namespace DAL.Classes;

public class SubscriptionDto
{
    public long SubscriptionId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public short PlanId { get; set; }

    public short TotalProperties { get; set; }

    public short? UsedProperties { get; set; }

    public long? UserId { get; set; }
}