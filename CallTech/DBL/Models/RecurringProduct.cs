using System;
using System.Collections.Generic;

namespace DBL.Models;

public partial class RecurringProduct
{
    public string Id { get; set; } = null!;

    public string? Name { get; set; }

    public string? Description { get; set; }
}
