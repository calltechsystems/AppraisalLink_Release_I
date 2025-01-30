namespace DAL.Classes;

public class CommanClass
{
    public int Id { get; set; }
    public string Email { get; set; }

    public string Password { get; set; }
    public long UserId { get; set; }

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

    public long? CompanyId { get; set; }

    public bool? IsActive { get; set; }
}