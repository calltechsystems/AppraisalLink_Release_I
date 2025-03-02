using DBL.Models;

namespace DAL.Repository
{
    public interface IAuthService
    {
        Task<UserInformation> GetUserByEmailAsync(string email);
        bool IsEmailVerified(string email);
        bool VerifyPasswordHash(string password, string email);
        string GenerateJwtToken(UserInformation user);
        Task<Broker> GetBrokerDetails(long userId);
        Task<Brokerage> GetBrokerageDetails(long userId);
        Task<Appraiser> GetAppraiserDetails(long userId);
        Task<AppraiserCompany> GetAppraiserCompanyDetails(long userId);
        List<Subscription> GetSubscriptionDetails(long userId);
    }
}
