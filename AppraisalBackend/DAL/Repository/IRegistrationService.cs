using Amazon.SimpleNotificationService.Model;
using CallTech.Classes;
using DAL.Classes;
using DBL.Models;

namespace DAL.Repository;

public interface IRegistrationService
{
    Task<bool> RegisterUserAsync(ClsSignUpUser userInformation, byte[] passwordHash, byte[] passwordSalt);
    Task<bool> RegisterUserAsync(ClsUserInformation userInformation, string token);

    Task<bool> RegisterUserAsync(AppraiserCompanyDto userInformation, byte[] passwordHash, byte[] passwordSalt,
        string token);

    Task<bool> RegisterBrokerAsync(BrokerageCls brokerageCls, byte[] passwordHash, byte[] passwordSalt, string token);
    bool EmailExists(string email);
    bool CompanyExist(long companyId);
    bool BrokerageExist(long brokerageId);
    void BrokerRegister(long userId);
    void BrokerageRegister(long userId);
    void AppraiserIndividualRegister(long userId);
    void AppraiserCompRegister(long userId);
    UserInformation UserId(string email);

    Task<UserInformation> GetUserIdAsync(string email);
    long GetUserIdByCompanyId(long companyId);
    Task<bool> RegisterPropertyAsync(ClsProperty property);
    Task AppraiserRegisterByCompanyAsync(AppraiserCompanyDto appraiserCompany, long userid);
    Task BrokerRegisterByBrokerageAsync(BrokerageCls brokerageCls, long userid);
    bool SendPropertyRegistrationEmail(ClsProperty propertyDetails);
    string GenerateJwtToken(ClsUserInformation user);
    string GenerateJwtToken();
    Task<PublishResponse> SendSmsAsync();
}