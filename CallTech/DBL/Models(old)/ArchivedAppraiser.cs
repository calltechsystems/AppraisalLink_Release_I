using System;
using System.Collections.Generic;

namespace DBL.Models;

public partial class ArchivedAppraiser
{
    public long Id { get; set; }

    public long? Orderid { get; set; }

    public long? Userid { get; set; }
}
