using System;
using System.Collections.Generic;

namespace DBL.Models;

public partial class Topup
{
    public int Id { get; set; }

    public decimal? TupUpAmount { get; set; }

    public int? NoOfProperties { get; set; }

    public string? Topupname { get; set; }

    public string? TopupDescription { get; set; }

    public string? Currencycode { get; set; }

    public string? ReturnUrl { get; set; }

    public short? UserType { get; set; }
}
