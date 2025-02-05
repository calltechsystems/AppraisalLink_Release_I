namespace DAL.Classes;

public class AppraiserCompanyDto
{
    public int CompanyId { get; set; }
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}