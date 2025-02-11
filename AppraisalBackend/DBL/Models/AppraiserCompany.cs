namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class AppraiserCompany
    {
        public long AppraiserCompanyId { get; set; }

        public long UserId { get; set; }

        public string? LicenseNumber { get; set; }

        public string? AppraiserCompanyName { get; set; }

        public string? AddressLineOne { get; set; }

        public string? AddressLineTwo { get; set; }

        public string? City { get; set; }

        public string? State { get; set; }

        public string? PostalCode { get; set; }

        public string? PhoneNumber { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? OfficeContactFirstName { get; set; }

        public string? OfficeContactLastName { get; set; }

        public string? OfficeContactEmail { get; set; }

        public string? OfficeContactPhone { get; set; }

        public string? LenderListUrl { get; set; }

        public string? CellNumber { get; set; }

        public string? EmailId { get; set; }

        public string? StreetNumber { get; set; }

        public string? StreetName { get; set; }

        public string? ApartmentNumber { get; set; }

        public string? ProfileImage { get; set; }

        public int? GetSms { get; set; }

        public int? GetEmail { get; set; }

        public DateTime? ModifiedDateTime { get; set; }
    }
}