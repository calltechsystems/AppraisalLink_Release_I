using DBL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class AuthService : IAuthService
    {
        private readonly AppraisallandsContext context;
        private IConfiguration _configuration;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="_context"></param>
        /// <param name="configuration"></param>
        public AuthService(AppraisallandsContext _context, IConfiguration configuration)
        {
            context = _context;
            _configuration = configuration;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public string GenerateJwtToken(UserInformation user)
        {

            StringBuilder builder = new StringBuilder();
            Enumerable
               .Range(65, 26)
                .Select(e => ((char)e).ToString())
                .Concat(Enumerable.Range(97, 26).Select(e => ((char)e).ToString()))
                .Concat(Enumerable.Range(0, 10).Select(e => e.ToString()))
                .OrderBy(e => Guid.NewGuid())
                .Take(11)
                .ToList().ForEach(e => builder.Append(e));
            string id = builder.ToString();

            var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, id.ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),

                    };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddDays(2),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        public async Task<AppraiserCompany> GetAppraiserCompanydetails(long UserId)
        {
            var Appraisers_Details = await context.AppraiserCompanies.Where(x => x.UserId == UserId).FirstOrDefaultAsync();
            if (Appraisers_Details == null)
            {
                return null;
            }
            var Appraisers_Details_Dto = new AppraiserCompany
            {
                AppraiserCompanyId = Appraisers_Details.AppraiserCompanyId,
                UserId = Appraisers_Details.UserId,
                LicenseNumber = Appraisers_Details.LicenseNumber,
                AppraiserCompanyName = Appraisers_Details.AppraiserCompanyName,
                AddressLineOne = Appraisers_Details.AddressLineOne,
                AddressLineTwo = Appraisers_Details.AddressLineTwo,
                City = Appraisers_Details.City,
                State = Appraisers_Details.State,
                PostalCode = Appraisers_Details.PostalCode,
                PhoneNumber = Appraisers_Details.PhoneNumber,
                FirstName = Appraisers_Details.FirstName,
                LastName = Appraisers_Details.LastName,
                OfficeContactFirstName = Appraisers_Details.OfficeContactFirstName,
                OfficeContactLastName = Appraisers_Details.OfficeContactLastName,
                OfficeContactEmail = Appraisers_Details.OfficeContactEmail,
                OfficeContactPhone = Appraisers_Details.OfficeContactPhone,
                CellNumber = Appraisers_Details.CellNumber,
                EmailId = Appraisers_Details.EmailId,
                ApartmentNumber = Appraisers_Details.ApartmentNumber,
                StreetName = Appraisers_Details.StreetName,
                StreetNumber = Appraisers_Details.StreetNumber,
                ProfileImage = Appraisers_Details.ProfileImage,
                LenderListUrl = Appraisers_Details.LenderListUrl,
                ModifiedDateTime = Appraisers_Details.ModifiedDateTime
            };
            return Appraisers_Details_Dto;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        public async Task<Appraiser> GetAppraiserdetails(long UserId)
        {
            var Appraisers_Details = await context.Appraisers.Where(x => x.UserId == UserId).FirstOrDefaultAsync();
            if (Appraisers_Details == null)
            {
                return null;
            }
            var Appraisers_Details_Dto = new Appraiser
            {
                Id = Appraisers_Details.Id,
                UserId = Appraisers_Details.UserId,
                FirstName = Appraisers_Details.FirstName,
                MiddleName = Appraisers_Details.MiddleName,
                LastName = Appraisers_Details.LastName,
                CompanyName = Appraisers_Details.CompanyName,
                StreetNumber = Appraisers_Details.StreetNumber,
                StreetName = Appraisers_Details.StreetName,
                ApartmentNo = Appraisers_Details.ApartmentNo,
                City = Appraisers_Details.City,
                Province = Appraisers_Details.Province,
                PostalCode = Appraisers_Details.PostalCode,
                DateEstablished = Appraisers_Details.DateEstablished,
                Area = Appraisers_Details.Area,
                PhoneNumber = Appraisers_Details.PhoneNumber,
                CommissionRate = Appraisers_Details.CommissionRate,
                MaxNumberOfAssignedOrders = Appraisers_Details.MaxNumberOfAssignedOrders,
                Designation = Appraisers_Details.Designation,
                ProfileImage = Appraisers_Details.ProfileImage,
                CellNumber = Appraisers_Details.CellNumber,
                EmailId = Appraisers_Details.EmailId,
                CompanyId = Appraisers_Details.CompanyId,
                LenderListUrl = Appraisers_Details.LenderListUrl,
                ModifiedDateTime = Appraisers_Details.ModifiedDateTime,
                IsActive = Appraisers_Details.IsActive
            };
            return Appraisers_Details_Dto;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        public async Task<Brokerage> GetBrokerageDetails(long UserId)
        {
            var brokerDetailsDto = new Brokerage();
            try
            {
                var Brokerage_Details = await context.Brokerages.Where(x => x.UserId == UserId).FirstOrDefaultAsync();

                if (Brokerage_Details == null)
                {
                    return null;
                }

                brokerDetailsDto = new Brokerage
                {
                    Id = Brokerage_Details.Id,
                    UserId = Brokerage_Details.UserId,
                    FirstName = Brokerage_Details.FirstName,
                    MiddleName = Brokerage_Details.MiddleName,
                    LastName = Brokerage_Details.LastName,
                    CompanyName = Brokerage_Details.CompanyName,
                    LicenseNo = Brokerage_Details.LicenseNo,
                    BrokerageName = Brokerage_Details.BrokerageName,
                    StreetNumber = Brokerage_Details.StreetNumber,
                    StreetName = Brokerage_Details.StreetName,
                    ApartmentNo = Brokerage_Details.ApartmentNo,
                    City = Brokerage_Details.City,
                    Province = Brokerage_Details.Province,
                    PostalCode = Brokerage_Details.PostalCode,
                    Area = Brokerage_Details.Area,
                    PhoneNumber = Brokerage_Details.PhoneNumber,
                    MortageBrokerageLicNo = Brokerage_Details.MortageBrokerageLicNo,
                    MortageBrokerLicNo = Brokerage_Details.MortageBrokerLicNo,
                    AssistantFirstName = Brokerage_Details.AssistantFirstName,
                    AssistantPhoneNumber = Brokerage_Details.AssistantPhoneNumber,
                    AssistantEmailAddress = Brokerage_Details.AssistantEmailAddress,
                    ProfileImage = Brokerage_Details.ProfileImage,
                    DateEstablished = Brokerage_Details.DateEstablished,
                    IsActive = Brokerage_Details.IsActive,
                    FaxNumber = Brokerage_Details.FaxNumber,
                    Description = Brokerage_Details.Description,
                    Cellnumber = Brokerage_Details.Cellnumber,
                    EmailId = Brokerage_Details.EmailId,
                    AssistantLastName = Brokerage_Details.AssistantLastName,
                    AssistantTwoFirstName = Brokerage_Details.AssistantTwoFirstName,
                    AssistantTwoLastName = Brokerage_Details.AssistantTwoLastName,
                    AssistantTwoEmailAddress = Brokerage_Details.AssistantTwoEmailAddress,
                    AssistantTwoPhoneNumber = Brokerage_Details.AssistantTwoPhoneNumber,
                    ModifiedDateTime = Brokerage_Details.ModifiedDateTime
                };
                return brokerDetailsDto;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ApprisalLandAppError: AuthService->GetBrokeragedetails Method: {ex.Message}");
            }

            return brokerDetailsDto;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        public async Task<Broker?> GetBrokerdetails(long UserId)
        {
            var Broker_Details = context.Brokers.Where(x => x.UserId == UserId).FirstOrDefault();
            if (Broker_Details == null)
            {
                return null;
            }
            var brokerDetailsDto = new Broker
            {
                Id = Broker_Details.Id,
                UserId = Broker_Details.UserId,
                FirstName = Broker_Details.FirstName,
                MiddleName = Broker_Details.MiddleName,
                LastName = Broker_Details.LastName,
                CompanyName = Broker_Details.CompanyName,
                LicenseNo = Broker_Details.LicenseNo,
                BrokerageName = Broker_Details.BrokerageName,
                StreetNumber = Broker_Details.StreetNumber,
                StreetName = Broker_Details.StreetName,
                ApartmentNo = Broker_Details.ApartmentNo,
                City = Broker_Details.City,
                Province = Broker_Details.Province,
                PostalCode = Broker_Details.PostalCode,
                Area = Broker_Details.Area,
                PhoneNumber = Broker_Details.PhoneNumber,
                MortageBrokerageLicNo = Broker_Details.MortageBrokerageLicNo,
                MortageBrokerLicNo = Broker_Details.MortageBrokerLicNo,
                AssistantFirstName = Broker_Details.AssistantFirstName,
                AssistantPhoneNumber = Broker_Details.AssistantPhoneNumber,
                AssistantEmailAddress = Broker_Details.AssistantEmailAddress,
                ProfileImage = Broker_Details.ProfileImage,
                DateEstablished = Broker_Details.DateEstablished,
                IsActive = Broker_Details.IsActive,
                FaxNumber = Broker_Details.FaxNumber,
                Description = Broker_Details.Description,
                Cellnumber = Broker_Details.Cellnumber,
                EmailId = Broker_Details.EmailId,
                AssistantLastName = Broker_Details.AssistantLastName,
                AssistantTwoPhoneNumber = Broker_Details.AssistantTwoPhoneNumber,
                AssistantTwoEmailAddress = Broker_Details.AssistantTwoEmailAddress,
                AssistantTwoFirstName = Broker_Details.AssistantTwoFirstName,
                AssistantTwoLastName = Broker_Details.AssistantTwoLastName,
                Brokerageid = Broker_Details.Brokerageid,
                ModifiedDateTime = Broker_Details.ModifiedDateTime
            };
            return brokerDetailsDto;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        public List<Subscription> GetSubscriptiondetails(long UserId)
        {
            try
            {
                var subscriptions = context.Subscriptions
                                 .Where(x => x.UserId == UserId)
                                  .Select(x => new Subscription
                                  {
                                      SubscriptionId = x.SubscriptionId,
                                      StartDate = x.StartDate,
                                      EndDate = x.EndDate,
                                      PlanId = x.PlanId,
                                      UserId = x.UserId,
                                      PaymentId = x.PaymentId,
                                  })
                                  .ToList();

                if (subscriptions.Count() != 0)
                {
                    return subscriptions;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ApprisalLandAppError: AuthService->GetSubscriptiondetails Method: {ex.Message}");
            }

            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public async Task<UserInformation> GetUserByEmailAsync(string email)
        {
            try
            {
                var user = context.UserInformations.Where(x => x.Email == email.ToLower()).FirstOrDefault();
                if (user != null)
                {
                    return user;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ApprisalLandAppError: AuthService->GetUserByEmailAsync Method: {ex.Message}");
            }

            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public bool IsEmailVerified(string email)
        {
            var user = context.UserInformations.Where(x => x.Email == email).FirstOrDefault();
            if (user != null)
            {
                if (user.IsActive == true)
                {
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="password"></param>
        /// <param name="email"></param>
        /// <returns></returns>
        public bool VerifyPasswordHash(string password, string email)
        {
            var Isvalid = context.UserInformations.Where(x => x.Email == email.ToLower()).FirstOrDefault();
            if (Isvalid != null)
            {
                if (Isvalid.Password == password)
                {
                    return true;
                }
            }
            return false;
        }
    }
}