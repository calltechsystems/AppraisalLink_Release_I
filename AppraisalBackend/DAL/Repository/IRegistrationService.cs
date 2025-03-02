using Amazon.SimpleNotificationService.Model;
using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
    public interface IRegistrationService
    {
        Task<bool> RegisterUserAsync(ClsSignUpUser userInformation, byte[] passwordHash, byte[] passwordSalt);
        Task<bool> RegisterUser(ClsUserInformation userInformation, string token);
        Task<bool> RegisterUser(Classes.AppraiserCompanyClass userInformation, string token);
        Task<bool> RegisterBroker(BrokerageCls brokerageCls, string token);
        bool EmailExists(string email);
        bool? GetIsPassword(string email);
        bool CompanyExist(long companyId);
        bool BrokerageExist(long brokerageId);
        void BrokerRegister(long userId);
        void BrokerageRegister(long userId);
        void AppraiserIndividualRegister(long userId);
        void AppraiserCompRegister(long userId);
        UserInformation UserId(string email);

        Task<UserInformation> GetUserId(string email);
        long GetUserIdByCompanyId(long companyId);
        Task<int> RegisterPropertyAsync(ClsProperty property);
        Task AppraiserRegisterByCompany(Classes.AppraiserCompanyClass appraiserCompany, long userId);
        Task BrokerRegisterByBrokerage(BrokerageCls brokerageCls, long userId);
        Task<bool> SendPropertyRegistrationEmail(ClsProperty propertyDetails, int orderId);
        string GenerateJwtToken(ClsUserInformation user);
        string GenerateJwtToken();
        Task<PublishResponse> SendSms();
    }
}
