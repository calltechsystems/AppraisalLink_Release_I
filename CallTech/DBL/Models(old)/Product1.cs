using System;
using System.Collections.Generic;

namespace DBL.Models;

public partial class Product1
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? CreateTime { get; set; }

    public string? LinkHrefGet { get; set; }

    public string? InkHrefEdit { get; set; }
}
