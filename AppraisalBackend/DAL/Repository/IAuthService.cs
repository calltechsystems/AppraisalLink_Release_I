using DAL.Classes;
using DBL.Models;
////using DBL.NewModels;
//using DBL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Rpository
{
    public interface IAuthService
    {
        Task<UserInformation> GetUserByEmailAsync(string email);
        bool IsEmailVerified(string email);
        bool VerifyPasswordHash(string password,string email);
        string GenerateJwtToken(UserInformation user);
        Task<Broker> GetBrokerdetails(long UserId);
        Task<Brokerage> GetBrokeragedetails(long UserId);
        Task<Appraiser> GetAppraiserdetails(long UserId);
        Task<AppraiserCompany> GetAppraiserCompanydetails(long UserId);
        List<Subscription> GetSubscriptiondetails(long UserId);
    }
}
