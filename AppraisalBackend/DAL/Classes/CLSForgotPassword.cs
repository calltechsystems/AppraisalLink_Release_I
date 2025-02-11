namespace DAL.Classes
{
    public class CLSForgotPassword
    {
        public string Email { get; set; } = String.Empty;
        public string NewPassword { get; set; } = String.Empty;
        public string Token { get; set; } = String.Empty;
    }
}
