namespace DAL.Classes;

public class ClsSignUpUser
{
    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public short UserType { get; set; }
}