using DBL.Models;

namespace DAL.Repository
{
    public interface IAuthService
    {
        Task<UserInformation> GetUserByEmailAsync(string email);
        bool IsEmailVerified(string email);
        bool VerifyPasswordHash(string password, string email);
        string GenerateJwtToken(UserInformation user);
        Task<Broker> GetBrokerdetails(long UserId);
        Task<Brokerage> GetBrokerageDetails(long UserId);
        Task<Appraiser> GetAppraiserdetails(long UserId);
        Task<AppraiserCompany> GetAppraiserCompanydetails(long UserId);
        List<Subscription> GetSubscriptiondetails(long UserId);
    }
}
