using System;
using System.Collections.Generic;

namespace DBL.Models;

public partial class Product
{
    public int Productid { get; set; }

    public string? Productname { get; set; }

    public string? Productdescription { get; set; }
}
