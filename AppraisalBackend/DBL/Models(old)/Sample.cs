using System;
using System.Collections.Generic;

namespace DBL.Models;

public partial class Sample
{
    public long? Id { get; set; }

    public TimeOnly[]? Addedtime { get; set; }

    public DateTime? Addedtime1 { get; set; }
}
