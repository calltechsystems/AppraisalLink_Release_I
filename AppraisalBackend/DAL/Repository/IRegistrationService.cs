using Amazon.SimpleNotificationService.Model;
using CallTech.Classes;
using DAL.Classes;
using DBL.Models;
////using DBL.NewModels;
//using DBL.Models;

namespace DAL.Rpository;

public interface IRegistrationService
{
    Task<bool> RegisterUserAsync(ClsSignUpUser userInformation, byte[] PasswordHash, byte[] PasswordSalt);
    Task<bool> RegisterUser(ClsUserInformation userInformation, string token);

    Task<bool> RegisterUser(AppraiserCompanyClass userInformation, byte[] PasswordHash, byte[] PasswordSalt,
        string token);

    Task<bool> RegisterBroker(BrokerageCls brokerageCls, byte[] PasswordHash, byte[] PasswordSalt, string token);
    bool EmailExists(string email);
    bool CompanyExist(long CompanyId);
    bool BrokerageExist(long BrokerageId);
    void BrokerRegister(long UserId);
    void BrokerageRegister(long UserId);
    void AppraiserIndividualRegister(long UserId);
    void AppraiserCompRegister(long UserId);
    UserInformation UserId(string email);

    Task<UserInformation> GetUserId(string email);
    long GetUserIdByCompanyId(long companyId);
    Task<bool> RegisterPropertyAsync(ClsProperty property);
    Task AppraiserRegisterByCompany(AppraiserCompanyClass appraiserCompany, long userid);
    Task BrokerRegisterByBrokerage(BrokerageCls brokerageCls, long userid);
    bool SendPropertyRegistrationEmail(ClsProperty propertyDetails);
    string GenerateJwtToken(ClsUserInformation user);
    string GenerateJwtToken();
    Task<PublishResponse> SendSms();
}