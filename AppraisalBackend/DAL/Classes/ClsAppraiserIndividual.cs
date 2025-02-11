namespace DAL.Classes
{
    /// <summary>
    /// 
    /// </summary>
    public class ClsAppraiserIndividual
    {

        public string? FirstName { get; set; }

        public string? MiddleName { get; set; }

        public string? LastName { get; set; }

        public string? CompanyName { get; set; }

        public string? StreetNumber { get; set; }

        public string? StreetName { get; set; }

        public string? ApartmentNo { get; set; }

        public string? City { get; set; }

        public string? Province { get; set; }

        public string? PostalCode { get; set; }

        public string? Area { get; set; }

        public string? PhoneNumber { get; set; }

        public decimal? CommissionRate { get; set; }

        public int? MaxNumberOfAssignedOrders { get; set; }

        public string? Designation { get; set; }

        public string? ProfileImage { get; set; }
        public string? LenderListUrl { get; set; }
        public string? CellNumber { get; set; }
        public string? EmailId { get; set; }
        public int? GetSms { get; set; }

        public int? GetEmail { get; set; }
    }
}
