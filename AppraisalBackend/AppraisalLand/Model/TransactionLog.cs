using System;
using System.Collections.Generic;

namespace CallTech.Model;

public partial class TransactionLog
{
    public long TransactionId { get; set; }

    public string TransactionDetail { get; set; } = null!;

    public long? UserId { get; set; }

    public virtual UserInformation? User { get; set; }
}
