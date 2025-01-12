using System;
using System.Collections.Generic;

namespace DBL.NewModels;

public partial class Notification
{
    public long NotificationId { get; set; }

    public long? SenderId { get; set; }

    public long? ReceiverId { get; set; }

    public string Message { get; set; } = null!;

    public bool IsSeen { get; set; }
}
