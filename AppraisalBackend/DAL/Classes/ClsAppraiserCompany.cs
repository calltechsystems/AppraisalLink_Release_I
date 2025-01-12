//using DBL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Classes
{
    public class ClsAppraiserCompany
    {
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

    }
}
