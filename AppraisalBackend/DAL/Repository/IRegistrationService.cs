using Amazon.SimpleNotificationService.Model;
using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
    public interface IRegistrationService
    {
        Task<bool> RegisterUserAsync(ClsSignUpUser userInformation, byte[] PasswordHash, byte[] PasswordSalt);
        Task<bool> RegisterUser(ClsUserInformation userInformation, string token);
        Task<bool> RegisterUser(Classes.AppraiserCompanyClass userInformation, string token);
        Task<bool> RegisterBroker(BrokerageCls brokerageCls, string token);
        bool EmailExists(string email);
        bool? GetIsPassword(string email);
        bool CompanyExist(long CompanyId);
        bool BrokerageExist(long BrokerageId);
        void BrokerRegister(long UserId);
        void BrokerageRegister(long UserId);
        void AppraiserIndividualRegister(long UserId);
        void AppraiserCompRegister(long UserId);
        UserInformation UserId(string email);

        Task<UserInformation> GetUserId(string email);
        long GetUserIdByCompanyId(long companyId);
        Task<int> RegisterPropertyAsync(ClsProperty property);
        Task AppraiserRegisterByCompany(Classes.AppraiserCompanyClass appraiserCompany, long userid);
        Task BrokerRegisterByBrokerage(BrokerageCls brokerageCls, long userid);
        Task<bool> SendPropertyRegistrationEmail(ClsProperty propertyDetails);
        string GenerateJwtToken(ClsUserInformation user);
        string GenerateJwtToken();
        Task<PublishResponse> SendSms();
    }
}
