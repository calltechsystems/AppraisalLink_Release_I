using System;
using System.Collections.Generic;

namespace DBL.Models;

public partial class Agreement
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public DateTime? Startdate { get; set; }

    public string? Paypalagreementid { get; set; }

    public int? Subscriptionid { get; set; }
}
