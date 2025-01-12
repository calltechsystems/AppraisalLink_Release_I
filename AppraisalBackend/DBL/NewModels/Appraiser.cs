using System;
using System.Collections.Generic;

namespace DBL.NewModels;

public partial class Appraiser
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? CompanyName { get; set; }

    public string? AdressLine1 { get; set; }

    public string? AdressLine2 { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? ZipCode { get; set; }

    public string? Area { get; set; }

    public string? PhoneNumber { get; set; }

    public string? ProfileImage { get; set; }
}
