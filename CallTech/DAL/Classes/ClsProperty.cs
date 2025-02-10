using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Classes
{
    public class ClsProperty
    {

        public long? UserId { get; set; }
        public string? StreetName { get; set; }

        public string? StreetNumber { get; set; }

        public string? City { get; set; }

        public string? Province { get; set; }

        public string? ZipCode { get; set; }

        public string? Area { get; set; }

        public string? Community { get; set; }

        public string? TypeOfBuilding { get; set; }

        public string? ApplicantFirstName { get; set; }

        public string? ApplicantLastName { get; set; }

        public string? ApplicantPhoneNumber { get; set; }

        public string? ApplicantEmailAddress { get; set; }

       // public DateTime? AddedDatetime { get; set; }

        //public DateTime? ModifiedDatetime { get; set; }

        public int? BidLowerRange { get; set; }

        public int? BidUpperRange { get; set; }

        public short? Urgency { get; set; }

        public bool? PropertyStatus { get; set; } 

       // public bool? IsArchive { get; set; }

       // public int? OrderId { get; set; }

        public double? EstimatedValue { get; set; }

        public string? Purpose { get; set; }

        public string? TypeOfAppraisal { get; set; }

        public string? LenderInformation { get; set; }

        public string? ApplicantAddress { get; set; }

        public string? Attachment { get; set; }

        public int? Sqft { get; set; }

        public string? Image { get; set; }

        public string? QuoteRequiredDate { get; set; }

        public string? Remark { get; set; }
        public string? apartment_number { get; set; }

       // public int? IsCompleted { get; set; }

    }
}
