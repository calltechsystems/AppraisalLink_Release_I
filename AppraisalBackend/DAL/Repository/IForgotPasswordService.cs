namespace DAL.Repository
{
    public interface IForgotPasswordService
    {
        Task<bool> SendResetTokenAsync(string email);
        Task<bool> VerifyResetTokenAsync(string email, string token, string newPassword);
    }
}
