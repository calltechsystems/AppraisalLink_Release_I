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
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<AppraiserCompany> GetAppraiserCompanyDetails(long userId)
        {
            var appraisersDetails = await context.AppraiserCompanies.Where(x => x.UserId == userId).FirstOrDefaultAsync();
            if (appraisersDetails == null)
            {
                return null;
            }
            var Appraisers_Details_Dto = new AppraiserCompany
            {
                AppraiserCompanyId = appraisersDetails.AppraiserCompanyId,
                UserId = appraisersDetails.UserId,
                LicenseNumber = appraisersDetails.LicenseNumber,
                AppraiserCompanyName = appraisersDetails.AppraiserCompanyName,
                AddressLineOne = appraisersDetails.AddressLineOne,
                AddressLineTwo = appraisersDetails.AddressLineTwo,
                City = appraisersDetails.City,
                State = appraisersDetails.State,
                PostalCode = appraisersDetails.PostalCode,
                PhoneNumber = appraisersDetails.PhoneNumber,
                FirstName = appraisersDetails.FirstName,
                LastName = appraisersDetails.LastName,
                OfficeContactFirstName = appraisersDetails.OfficeContactFirstName,
                OfficeContactLastName = appraisersDetails.OfficeContactLastName,
                OfficeContactEmail = appraisersDetails.OfficeContactEmail,
                OfficeContactPhone = appraisersDetails.OfficeContactPhone,
                CellNumber = appraisersDetails.CellNumber,
                EmailId = appraisersDetails.EmailId,
                ApartmentNumber = appraisersDetails.ApartmentNumber,
                StreetName = appraisersDetails.StreetName,
                StreetNumber = appraisersDetails.StreetNumber,
                ProfileImage = appraisersDetails.ProfileImage,
                LenderListUrl = appraisersDetails.LenderListUrl,
                ModifiedDateTime = appraisersDetails.ModifiedDateTime
            };
            return Appraisers_Details_Dto;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<Appraiser> GetAppraiserDetails(long userId)
        {
            var appraisersDetails = await context.Appraisers.Where(x => x.UserId == userId).FirstOrDefaultAsync();
            if (appraisersDetails == null)
            {
                return null;
            }
            var appraisersDetailsDto = new Appraiser
            {
                Id = appraisersDetails.Id,
                UserId = appraisersDetails.UserId,
                FirstName = appraisersDetails.FirstName,
                MiddleName = appraisersDetails.MiddleName,
                LastName = appraisersDetails.LastName,
                CompanyName = appraisersDetails.CompanyName,
                StreetNumber = appraisersDetails.StreetNumber,
                StreetName = appraisersDetails.StreetName,
                ApartmentNo = appraisersDetails.ApartmentNo,
                City = appraisersDetails.City,
                Province = appraisersDetails.Province,
                PostalCode = appraisersDetails.PostalCode,
                DateEstablished = appraisersDetails.DateEstablished,
                Area = appraisersDetails.Area,
                PhoneNumber = appraisersDetails.PhoneNumber,
                CommissionRate = appraisersDetails.CommissionRate,
                MaxNumberOfAssignedOrders = appraisersDetails.MaxNumberOfAssignedOrders,
                Designation = appraisersDetails.Designation,
                ProfileImage = appraisersDetails.ProfileImage,
                CellNumber = appraisersDetails.CellNumber,
                EmailId = appraisersDetails.EmailId,
                CompanyId = appraisersDetails.CompanyId,
                LenderListUrl = appraisersDetails.LenderListUrl,
                ModifiedDateTime = appraisersDetails.ModifiedDateTime,
                IsActive = appraisersDetails.IsActive
            };
            return appraisersDetailsDto;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<Brokerage> GetBrokerageDetails(long userId)
        {
            var brokerDetailsDto = new Brokerage();
            try
            {
                var brokerageDetails = await context.Brokerages.Where(x => x.UserId == userId).FirstOrDefaultAsync();

                if (brokerageDetails == null)
                {
                    return null;
                }

                brokerDetailsDto = new Brokerage
                {
                    Id = brokerageDetails.Id,
                    UserId = brokerageDetails.UserId,
                    FirstName = brokerageDetails.FirstName,
                    MiddleName = brokerageDetails.MiddleName,
                    LastName = brokerageDetails.LastName,
                    CompanyName = brokerageDetails.CompanyName,
                    LicenseNo = brokerageDetails.LicenseNo,
                    BrokerageName = brokerageDetails.BrokerageName,
                    StreetNumber = brokerageDetails.StreetNumber,
                    StreetName = brokerageDetails.StreetName,
                    ApartmentNo = brokerageDetails.ApartmentNo,
                    City = brokerageDetails.City,
                    Province = brokerageDetails.Province,
                    PostalCode = brokerageDetails.PostalCode,
                    Area = brokerageDetails.Area,
                    PhoneNumber = brokerageDetails.PhoneNumber,
                    MortageBrokerageLicNo = brokerageDetails.MortageBrokerageLicNo,
                    MortageBrokerLicNo = brokerageDetails.MortageBrokerLicNo,
                    AssistantFirstName = brokerageDetails.AssistantFirstName,
                    AssistantPhoneNumber = brokerageDetails.AssistantPhoneNumber,
                    AssistantEmailAddress = brokerageDetails.AssistantEmailAddress,
                    ProfileImage = brokerageDetails.ProfileImage,
                    DateEstablished = brokerageDetails.DateEstablished,
                    IsActive = brokerageDetails.IsActive,
                    FaxNumber = brokerageDetails.FaxNumber,
                    Description = brokerageDetails.Description,
                    Cellnumber = brokerageDetails.Cellnumber,
                    EmailId = brokerageDetails.EmailId,
                    AssistantLastName = brokerageDetails.AssistantLastName,
                    AssistantTwoFirstName = brokerageDetails.AssistantTwoFirstName,
                    AssistantTwoLastName = brokerageDetails.AssistantTwoLastName,
                    AssistantTwoEmailAddress = brokerageDetails.AssistantTwoEmailAddress,
                    AssistantTwoPhoneNumber = brokerageDetails.AssistantTwoPhoneNumber,
                    ModifiedDateTime = brokerageDetails.ModifiedDateTime
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
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<Broker?> GetBrokerDetails(long userId)
        {
            var brokerDetails = context.Brokers.Where(x => x.UserId == userId).FirstOrDefault();
            if (brokerDetails == null)
            {
                return null;
            }
            var brokerDetailsDto = new Broker
            {
                Id = brokerDetails.Id,
                UserId = brokerDetails.UserId,
                FirstName = brokerDetails.FirstName,
                MiddleName = brokerDetails.MiddleName,
                LastName = brokerDetails.LastName,
                CompanyName = brokerDetails.CompanyName,
                LicenseNo = brokerDetails.LicenseNo,
                BrokerageName = brokerDetails.BrokerageName,
                StreetNumber = brokerDetails.StreetNumber,
                StreetName = brokerDetails.StreetName,
                ApartmentNo = brokerDetails.ApartmentNo,
                City = brokerDetails.City,
                Province = brokerDetails.Province,
                PostalCode = brokerDetails.PostalCode,
                Area = brokerDetails.Area,
                PhoneNumber = brokerDetails.PhoneNumber,
                MortageBrokerageLicNo = brokerDetails.MortageBrokerageLicNo,
                MortageBrokerLicNo = brokerDetails.MortageBrokerLicNo,
                AssistantFirstName = brokerDetails.AssistantFirstName,
                AssistantPhoneNumber = brokerDetails.AssistantPhoneNumber,
                AssistantEmailAddress = brokerDetails.AssistantEmailAddress,
                ProfileImage = brokerDetails.ProfileImage,
                DateEstablished = brokerDetails.DateEstablished,
                IsActive = brokerDetails.IsActive,
                FaxNumber = brokerDetails.FaxNumber,
                Description = brokerDetails.Description,
                CellNumber = brokerDetails.CellNumber,
                EmailId = brokerDetails.EmailId,
                AssistantLastName = brokerDetails.AssistantLastName,
                AssistantTwoPhoneNumber = brokerDetails.AssistantTwoPhoneNumber,
                AssistantTwoEmailAddress = brokerDetails.AssistantTwoEmailAddress,
                AssistantTwoFirstName = brokerDetails.AssistantTwoFirstName,
                AssistantTwoLastName = brokerDetails.AssistantTwoLastName,
                BrokerageId = brokerDetails.BrokerageId,
                ModifiedDateTime = brokerDetails.ModifiedDateTime
            };
            return brokerDetailsDto;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<Subscription> GetSubscriptionDetails(long userId)
        {
            try
            {
                var subscriptions = context.Subscriptions
                                 .Where(x => x.UserId == userId)
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
            var isValid = context.UserInformations.Where(x => x.Email == email.ToLower()).FirstOrDefault();
            if (isValid != null)
            {
                if (isValid.Password == password)
                {
                    return true;
                }
            }
            return false;
        }
    }
}