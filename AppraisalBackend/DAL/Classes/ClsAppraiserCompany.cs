//using DBL.Models;
namespace DAL.Classes
{
    /// <summary>
    /// 
    /// </summary>
    public class ClsAppraiserCompany
    {
        public long? AppraiserCompanyId { get; set; } = null;

        public long? UserId { get; set; } = null;

        public string LicenseNumber { get; set; } = null!;

        public string AppraiserCompanyName { get; set; } = null!;

        public string AddressLineOne { get; set; } = null!;

        public string? AddressLineTwo { get; set; }

        public string City { get; set; } = null!;

        public string State { get; set; } = null!;

        public string PostalCode { get; set; } = null!;

        public string? PhoneNumber { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

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