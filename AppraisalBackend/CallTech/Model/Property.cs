using System;
using System.Collections.Generic;

namespace CallTech.Model;

public partial class Property
{
    public long PropertyId { get; set; }

    public string StreetName { get; set; } = null!;

    public string StreetNumber { get; set; } = null!;

    public string City { get; set; } = null!;

    public string State { get; set; } = null!;

    public string ZipCode { get; set; } = null!;

    public string Area { get; set; } = null!;

    public string Community { get; set; } = null!;

    public string TypeOfBuilding { get; set; } = null!;

    public string? ApplicantFirstName { get; set; }

    public string? ApplicantLastName { get; set; }

    public string? ApplicantPhoneNumber { get; set; }

    public string? ApplicantEmailAddress { get; set; }

    public DateTime? AddedDatetime { get; set; }

    public DateTime? ModifiedDatetime { get; set; }

    public int? BidLowerRange { get; set; }

    public int? BidUpperRange { get; set; }

    public short? Urgency { get; set; }

    public bool? PropertyStatus { get; set; }

    public long? UserId { get; set; }

    public virtual UserInformation? User { get; set; }
}
