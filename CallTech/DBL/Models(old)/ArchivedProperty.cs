using System;
using System.Collections.Generic;

namespace DBL.Models;

public partial class ArchivedProperty
{
    public long Id { get; set; }

    public long OrderId { get; set; }

    public long UserId { get; set; }
}
