using System;
using System.Collections.Generic;

namespace DBL.Models;

public partial class Brokerage
{
    public int Id { get; set; }

    public long? UserId { get; set; }

    public string? FirstName { get; set; }

    public string? MiddleName { get; set; }

    public string? LastName { get; set; }

    public string? CompanyName { get; set; }

    public string? LicenseNo { get; set; }

    public string? BrokerageName { get; set; }

    public string? StreetNumber { get; set; }

    public string? StreetName { get; set; }

    public string? ApartmentNo { get; set; }

    public string? City { get; set; }

    public string? Province { get; set; }

    public string? PostalCode { get; set; }

    public string? Area { get; set; }

    public string? PhoneNumber { get; set; }

    public string? MortageBrokerageLicNo { get; set; }

    public string? MortageBrokerLicNo { get; set; }

    public string? AssistantFirstName { get; set; }

    public string? AssistantPhoneNumber { get; set; }

    public string? AssistantEmailAddress { get; set; }

    public string? ProfileImage { get; set; }

    public DateTime? DateEstablished { get; set; }

    public bool? IsActive { get; set; }

    public string? FaxNumber { get; set; }

    public string? Description { get; set; }

    public string? Cellnumber { get; set; }

    public string? EmailId { get; set; }

    public string? AssistantTwoPhoneNumber { get; set; }

    public string? AssistantTwoEmailAddress { get; set; }

    public string? AssistantLastName { get; set; }

    public string? AssistantTwoFirstName { get; set; }

    public string? AssistantTwoLastName { get; set; }

    public DateTime? ModifiedDateTime { get; set; }
}
