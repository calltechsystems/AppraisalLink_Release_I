namespace DBL.Models;

public partial class SmsNotification
{
    public long SmsNotificationId { get; set; }
    public long? SenderId { get; set; }
    public long? ReceiverId { get; set; }
    public string Message { get; set; } = null!;
    public bool IsSeen { get; set; }
}