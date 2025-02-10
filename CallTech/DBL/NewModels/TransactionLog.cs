using System;
using System.Collections.Generic;

namespace DBL.NewModels;

public partial class TransactionLog
{
    public long TransactionId { get; set; }

    public string TransactionDetail { get; set; } = null!;

    public long? UserId { get; set; }

    public string? Paymentid { get; set; }
}
