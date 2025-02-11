using System;
using System.Collections.Generic;

namespace DBL.Models;

public partial class EmailNotification
{
    public long EmailNotificationId { get; set; }

    public long? SenderId { get; set; }

    public long? ReceiverId { get; set; }

    public string Message { get; set; } = null!;

    public bool IsSeen { get; set; }
}
