using Amazon;
using Amazon.Runtime;
using Amazon.SimpleNotificationService;
using Amazon.SimpleNotificationService.Model;
using CallTech.Classes;
using DAL.Classes;
using DBL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;

namespace DAL.Repository;

public class RegistrationService : IRegistrationService
{
    private readonly AppraisalLandsContext context;
    private readonly IConfiguration _configuration;

    public RegistrationService(AppraisalLandsContext _context, IConfiguration configuration)
    {
        context = _context;
        _configuration = configuration;
    }

    public bool EmailExists(string email)
    {
        var isAvailable = context.UserInformations.Where(x => x.Email == email.ToLower()).Any();

        return isAvailable;
    }

    public async Task<bool> RegisterUserAsync(ClsSignUpUser userInfo, byte[] PasswordHash, byte[] PasswordSalt)
    {
        try
        {
            var userDetails = context.UserInformations.Where(x => x.Email.ToLower() == userInfo.Email.ToLower())
                .FirstOrDefault();
            if (userDetails != null)
            {
                var IsActive = true;

                userDetails.Password = userInfo.Password;
                userDetails.PasswordHash = PasswordHash;
                userDetails.PasswordSalt = PasswordSalt;
                userDetails.Password = userInfo.Password;
                context.UserInformations.Update(userDetails);
                await context.SaveChangesAsync();
                return true;
            }

            return false;
        }
        catch (Exception ex)
        {
            return false;
        }
    }


    public string GenerateJwtToken(ClsUserInformation user)
    {
        var builder = new StringBuilder();
        Enumerable
            .Range(65, 26)
            .Select(e => ((char)e).ToString())
            .Concat(Enumerable.Range(97, 26).Select(e => ((char)e).ToString()))
            .Concat(Enumerable.Range(0, 10).Select(e => e.ToString()))
            .OrderBy(e => Guid.NewGuid())
            .Take(11)
            .ToList().ForEach(e => builder.Append(e));
        var id = builder.ToString();

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
            new Claim(JwtRegisteredClaimNames.Jti, id),
            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString())
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: signIn);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public UserInformation UserId(string email)
    {
        try
        {
            var userInformation = new UserInformation();
            var user = context.UserInformations.Where(x => x.Email == email.ToLower()).FirstOrDefault();

            return user;
        }
        catch (Exception ex)
        {
            var _ex = ex.Message;
        }

        return null;
    }

    public void BrokerRegister(long UserId)
    {
        try
        {
            var broker = new Broker
            {
                UserId = UserId,
                IsActive = true
            };

            context.Brokers.Add(broker);
            context.SaveChanges();
        }
        catch (Exception)
        {
        }
    }

    public void BrokerageRegister(long UserId)
    {
        try
        {
            var brokerage = new Brokerage();
            brokerage.UserId = UserId;
            brokerage.IsActive = true;
            context.Brokerages.Add(brokerage);
            context.SaveChanges();
        }
        catch (Exception)
        {
        }
    }

    public void AppraiserIndividualRegister(long UserId)
    {
        try
        {
            var appraiser = new Appraiser();
            appraiser.UserId = UserId;
            appraiser.IsActive = false;
            context.Appraisers.Add(appraiser);
            context.SaveChanges();
        }
        catch (Exception)
        {
        }
    }

    public void AppraiserCompRegister(long UserId)
    {
        try
        {
            var appraiserCompany = new AppraiserCompany();
            appraiserCompany.UserId = UserId;
            context.AppraiserCompanies.Add(appraiserCompany);
            context.SaveChanges();
        }
        catch (Exception)
        {
        }
    }

    public async Task<bool> RegisterPropertyAsync(ClsProperty property)
    {
        try
        {
            var User = context.UserInformations.Where(x => x.UserId == property.UserId).FirstOrDefault();
            if (User != null)
            {
                var OBjproperty = new Property();
                OBjproperty.StreetName = property.StreetName;
                OBjproperty.StreetNumber = property.StreetNumber;
                OBjproperty.City = property.City;
                OBjproperty.Province = property.Province;
                OBjproperty.ZipCode = property.ZipCode;
                OBjproperty.Area = property.Area;
                OBjproperty.Community = property.Community;
                OBjproperty.TypeOfBuilding = property.TypeOfBuilding;
                OBjproperty.ApplicantFirstName = property.ApplicantFirstName;
                OBjproperty.ApplicantLastName = property.ApplicantLastName;
                OBjproperty.ApplicantPhoneNumber = property.ApplicantPhoneNumber;
                OBjproperty.ApplicantEmailAddress = property.ApplicantEmailAddress;
                OBjproperty.AddedDatetime = DateTime.Now;
                OBjproperty.BidLowerRange = property.BidLowerRange;
                OBjproperty.BidUpperRange = property.BidUpperRange;
                OBjproperty.Urgency = property.Urgency;
                OBjproperty.PropertyStatus = property.PropertyStatus;
                OBjproperty.UserId = property.UserId;
                OBjproperty.IsArchive = false;
                OBjproperty.IsCompleted = 0;
                OBjproperty.Remark = property.Remark;
                OBjproperty.QuoteRequiredDate = property.QuoteRequiredDate;
                OBjproperty.EstimatedValue = property.EstimatedValue;
                OBjproperty.Purpose = property.Purpose;
                OBjproperty.TypeOfAppraisal = property.TypeOfAppraisal;
                OBjproperty.LenderInformation = property.LenderInformation;
                OBjproperty.ApplicantAddress = property.ApplicantAddress;
                OBjproperty.Attachment = property.Attachment;
                OBjproperty.Sqft = property.Sqft;
                OBjproperty.Image = property.Image;
                OBjproperty.Isonhold = false;
                OBjproperty.Isoncancel = false;
                OBjproperty.IsArchiveappraiser = false;
                context.Properties.Add(OBjproperty);
                await context.SaveChangesAsync();
                return true;
            }

            return false;
        }
        catch (Exception ex)
        {
            return false;
            throw new Exception("An error occurred while registering the property.", ex);
        }
    }

    public bool SendPropertyRegistrationEmail(ClsProperty propertyDetails)
    {
        SendMailAppaisers(propertyDetails); //In that add send mail to broker 
        return true;
    }

    public async Task<PublishResponse> SendSmsAsync()
    {
        var Appraisers = context.Appraisers.ToList();

        foreach (var User in Appraisers)
        {
            var Number = User.PhoneNumber;

            if (Number != null)
            {
                var awsKeyId = "AKIA463TBXUOCZ3E2BYH";
                var awsKeySecret = "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";

                var awsCredentials = new BasicAWSCredentials(awsKeyId, awsKeySecret);
                var snsClient = new AmazonSimpleNotificationServiceClient(awsCredentials, RegionEndpoint.APSoutheast1);

                var publishRequest = new PublishRequest
                {
                    Message = "A new property has been added to our platform",
                    PhoneNumber = Number
                };

                publishRequest.MessageAttributes.Add("AWS.SNS.SMS.SMSType",
                    new MessageAttributeValue { StringValue = "Transactional", DataType = "String" });

                var publishResponse = await snsClient.PublishAsync(publishRequest);
                return publishResponse;
            }
        }

        return null;
    }

    public string GenerateJwtToken()
    {
        var builder = new StringBuilder();
        Enumerable
            .Range(65, 26)
            .Select(e => ((char)e).ToString())
            .Concat(Enumerable.Range(97, 26).Select(e => ((char)e).ToString()))
            .Concat(Enumerable.Range(0, 10).Select(e => e.ToString()))
            .OrderBy(e => Guid.NewGuid())
            .Take(11)
            .ToList().ForEach(e => builder.Append(e));
        var id = builder.ToString();

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
            new Claim(JwtRegisteredClaimNames.Jti, id),
            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString())
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: DateTime.UtcNow.AddHours(72),
            signingCredentials: signIn);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<bool> RegisterUserAsync(AppraiserCompanyDto userInformation, byte[] passwordHash,
        byte[] passwordSalt, string token)
    {
        try
        {
            const bool isActive = true;
            var users = context.UserInformations.ToList();

            long userId = 1;
            if (users.Any())
            {
                var maxId = users.Max(x => x.UserId);
                userId = maxId + 1;
            }

            var user = new UserInformation
            {
                UserId = userId,
                Email = userInformation.Email.ToLower(),
                Password = userInformation.Password,
                IsActive = isActive,
                CreatedDateTime = DateTime.Now,
                UserType = 5,
                ForgotPasswordToken = null,
                VerifyEmailToken = token,
                PasswordSalt = passwordSalt,
                PasswordHash = passwordHash
            };
            await context.UserInformations.AddAsync(user);
            await context.SaveChangesAsync();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    public async Task AppraiserRegisterByCompanyAsync(AppraiserCompanyDto appraiserCompany, long userid)
    {
        var appraiser = new Appraiser
        {
            UserId = userid,
            DateEstablished = DateTime.UtcNow,
            CompanyId = appraiserCompany.CompanyId
        };
        context.Appraisers.Add(appraiser);
        await context.SaveChangesAsync();
    }

    public async Task BrokerRegisterByBrokerageAsync(BrokerageCls brokerageCls, long userid)
    {
        var broker = new Broker
        {
            UserId = userid,
            Brokerageid = brokerageCls.BrokerageId,
            DateEstablished = DateTime.UtcNow
        };
        context.Brokers.Add(broker);
        await context.SaveChangesAsync();
    }

    public long GetUserIdByCompanyId(long companyId)
    {
        var appraiserCompanies =
            context.AppraiserCompanies.FirstOrDefault(x => x.AppraiserCompanyId == companyId);
        if (appraiserCompanies != null)
        {
            var userid = appraiserCompanies.UserId;
            return userid;
        }

        return 0;
    }

    public bool CompanyExist(long CompanyId)
    {
        var AppraiserCompany =
            context.AppraiserCompanies.Where(x => x.AppraiserCompanyId == CompanyId).FirstOrDefault();
        if (AppraiserCompany != null) return true;
        return false;
    }

    public bool BrokerageExist(long BrokerageId)
    {
        var Brokerage = context.Brokerages.Where(x => x.Id == BrokerageId).FirstOrDefault();
        if (Brokerage != null) return true;
        return false;
    }

    public async Task<UserInformation> GetUserIdAsync(string email)
    {
        try
        {
            var user = await context.UserInformations.FirstOrDefaultAsync(x => x.Email == email.ToLower());
            if (user != null) return user;

            return null;
        }
        catch (Exception ex)
        {
            var _ex = ex.Message;
        }

        return null;
    }

    public async Task<bool> RegisterBrokerAsync(BrokerageCls brokerageCls, byte[] passwordHash, byte[] passwordSalt,
        string token)
    {
        try
        {
            const bool isActive = false;
            var users = context.UserInformations.ToList();

            long userId = 1;
            if (users.Any())
            {
                var maxId = users.Max(x => x.UserId);
                userId = maxId + 1;
            }

            var user = new UserInformation();
            user.UserId = userId;
            user.Email = brokerageCls.Email.ToLower();
            user.Password = brokerageCls.Password;
            user.IsActive = isActive;
            user.CreatedDateTime = DateTime.Now;
            user.UserType = 6;
            user.ForgotPasswordToken = null;
            user.VerifyEmailToken = token;
            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;
            await context.UserInformations.AddAsync(user);
            await context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public async Task<bool> RegisterUserAsync(ClsUserInformation userInformation, string token)
    {
        const bool isActive = false;
        var users = context.UserInformations.ToList();

        long userId = 1;
        if (users.Any())
        {
            var maxId = users.Max(x => x.UserId);
            userId = maxId + 1;
        }

        var user = new UserInformation
        {
            UserId = userId,
            Email = userInformation.Email.ToLower(),
            IsActive = isActive,
            CreatedDateTime = DateTime.Now,
            UserType = 5,
            ForgotPasswordToken = null,
            VerifyEmailToken = token
        };
        await context.UserInformations.AddAsync(user);
        await context.SaveChangesAsync();
        return true;
    }

    public bool SendMailRegisterAppraiserByCompany(string email)
    {
        try
        {
            var password = "odkzjyvtiwmtdjtq";
            var appraiserMail = new MailMessage();
            appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
            appraiserMail.Subject = "New Appraiser Added";
            appraiserMail.To.Add(new MailAddress(email));

            var appraiserMessage = "Dear Appraiser,\n\n";
            appraiserMessage +=
                "We're thrilled to inform you that you have been successfully added to our team of appraisers.\n";
            appraiserMessage += "Welcome aboard!\n\n";
            appraiserMessage +=
                "Thank you for being part of our community! If you have any queries, feel free to reach out.\n\n";
            appraiserMessage += "Best regards,\n";
            appraiserMessage += "Support Team\n";
            appraiserMessage += "Appraisal Land";

            appraiserMail.Body = appraiserMessage;

            var info = new NetworkCredential("pradhumn7078@gmail.com", password);
            var smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = info,
                EnableSsl = true
            };

            smtp.Send(appraiserMail);
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    public bool SendMailAppaisers(ClsProperty clsProperty)
    {
        try
        {
            var appraisers = context.Appraisers.ToList();

            foreach (var User in appraisers)
            {
                var password = "odkzjyvtiwmtdjtq";
                var userId = User.UserId;
                var userDetails = context.UserInformations.Where(x => x.UserId == userId).FirstOrDefault();


                var appraiserMail = new MailMessage();
                appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                appraiserMail.Subject = "Your Expert Opinion Needed: New Property Listing on Appraisal Land";
                appraiserMail.To.Add(new MailAddress(userDetails.Email));
                appraiserMail.IsBodyHtml = true;
                //string appraiserMessage = $"Dear Appraiser's,\n\n";
                //appraiserMessage += "We have a new property listing on our platform, and we need your expert appraisal.\n";
                //appraiserMessage += $"1. Property Name :{clsProperty.StreetName},{clsProperty.StreetNumber},Address:{clsProperty.City},{clsProperty.ZipCode}\n";
                ////appraiserMessage += $"2. Property OrderID:{clsProperty.ord}\n";
                ////appraiserMessage += $"3. Description:\n";
                //appraiserMessage += $"4. Other relevant details:\n\n";
                //appraiserMessage += "Your appraisal insights hold great importance for us. We invite you to explore the listing on our website and share your insights.\n";
                //appraiserMessage += "<a href='http://appraisal-eta.vercel.app'>Login || Appraisal Link</a>\n\n";
                //appraiserMessage += "Thank you for being part of our community! If you have any queries, feel free to reach out.\n\n";
                //appraiserMessage += "Best regards,\nSupport Team\nAppraisal Land";


                appraiserMail.Body = @"<!DOCTYPE html>       
                             <html>
                              <head>
                                <meta charset='utf-8' />
                                <meta name='viewport' content='width=device-width, initial-scale=1' />
                                <title>register</title>
                                <link rel='stylesheet' type='text/css' href='rapido.css' />
                              </head>
                              <body>
                                <div style='width: 100%; background-color: rgb(255, 255, 255); font-family: Verdana, Geneva, Tahoma, sans-serif;'>
                                  <div style='width: 50%'>
                                    <img src='/Appraisal_Land_Logo.png' alt='' width='100px' style='margin-top: 20px; position: relative' />
                                    <span style='color: #2e008b; font-weight: bold; font-size: 45px; position: absolute; margin-top: 80px; margin-left: -30px;'>Appraisal</span>
                                    <span style='color: #97d700; font-weight: bold; font-size: 45px; position: absolute; margin-top: 80px; margin-left: 210px;'>Land</span>
                                  </div>
                                  <div>
                                    <p>Dear User,</p>
                                    <p>Order ID-<span style='font-weight: bold'>1212</span></p>
                                    <p>Your appraisal insights hold great importance for us. We invite you to explore the listing on our website and share your insights.</p>
                                    <p>Thank you for being part of our community! If you have any queries, feel free to reach out.</p>
                                    <p></p>
                                   <a href=""https://appraisal-eta.vercel.app"" style=""text-decoration: none;"">
                                   <button style=""background-color: #2e008b; color: #97d700; border-radius: 20px; text-align: center; padding: 10px; font-size: 20px; font-weight: bold; margin-left: 40px; cursor: pointer;"">
                                           Click Here
                                     </button>
                                    </a>
                                    < p > If you have any questions, please reach out to our customer support at < a href = 'mailto:info@appraisalland.ca' > info@appraisalland.ca </ a >.</ p >
                                    < p > Best regards,</ p >
                                    < p >< span style = 'font-weight: bold; color: #2e008b' > Appraisal Land </ span >.</ p >
                                  </ div >
                                </ div >
                              </ body >
                            </ html > ";

                appraiserMail.IsBodyHtml = true;
                var info = new NetworkCredential("pradhumn7078@gmail.com", password);
                var smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = info,
                    EnableSsl = true
                };

                smtp.Send(appraiserMail);
            }

            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}