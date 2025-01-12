using Azure;
using CallTech;
using CallTech.Classes;
using DAL.Classes;
using DBL.Models;
////using DBL.NewModels;
//using DBL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Amazon.SimpleNotificationService;
using Amazon.Runtime;
using Amazon.SimpleNotificationService.Model;
using PayPal.Api.OpenIdConnect;
using PayPal.Api;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Twilio.TwiML.Messaging;

namespace DAL.Rpository
{
    public class RegistrationService : IRegistrationService
    {
        private readonly AppraisallandsContext context;
        private IConfiguration _configuration;
        public RegistrationService(AppraisallandsContext _context, IConfiguration configuration)
        {
            context = _context;
            _configuration = configuration;
        }

        public bool EmailExists(string email)
        {
            bool isAvailable = context.UserInformations.Where(x => x.Email == email.ToLower()).Any();

            return isAvailable;

        }

        public async Task<bool> RegisterUserAsync(ClsSignUpUser userInfo, byte[] PasswordHash, byte[] PasswordSalt)
        {
            try
            {
               var userDetails=context.UserInformations.Where(x=>x.Email.ToLower() == userInfo.Email.ToLower()).FirstOrDefault();
                if (userDetails != null)
                {
                    bool IsActive = true;

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

        public bool SendMailRegisterAppraiserByCompany(string email)
        {
            try
            {
                string pswd = "odkzjyvtiwmtdjtq";
                MailMessage appraiserMail = new MailMessage();
                appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                appraiserMail.Subject = "New Appraiser Added";
                appraiserMail.To.Add(new MailAddress(email));

                string appraiserMessage = $"Dear Appraiser,\n\n";
                appraiserMessage += $"We're thrilled to inform you that you have been successfully added to our team of appraisers.\n";
                appraiserMessage += $"Welcome aboard!\n\n";
                appraiserMessage += $"Thank you for being part of our community! If you have any queries, feel free to reach out.\n\n";
                appraiserMessage += $"Best regards,\n";
                appraiserMessage += $"Support Team\n";
                appraiserMessage += $"Appraisal Land";

                appraiserMail.Body = appraiserMessage;

                NetworkCredential info = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                SmtpClient smtp = new SmtpClient("smtp.gmail.com")
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


        public string GenerateJwtToken(ClsUserInformation user)
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
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: signIn);
            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        public UserInformation UserId(string email)
        {
            try
            {
                UserInformation userInformation = new UserInformation();
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
                
                Broker broker = new Broker
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

                Brokerage brokerage = new Brokerage();
                brokerage.UserId = UserId;
                brokerage.IsActive= true;
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

                Appraiser appraiser = new Appraiser();
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

                AppraiserCompany appraiserCompany = new AppraiserCompany();
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
                    Property OBjproperty = new Property();
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
                else
                {
                    return false;
                }


            }
            catch (Exception ex)
            {
                return false;
                throw new Exception("An error occurred while registering the property.", ex);
            }
        }

        public bool SendPropertyRegistrationEmail(ClsProperty propertyDetails)
        {
            SendMailAppaisers(propertyDetails);  //In that add send mail to broker 
                return true;
           
        }

        public bool SendMailAppaisers(ClsProperty clsProperty)
        {
            try
            {
                var Appraisers = context.Appraisers.ToList();

                foreach (var User in Appraisers)
                {
                    string pswd = "odkzjyvtiwmtdjtq";
                    var userId = User.UserId;
                    var UserDetails = context.UserInformations.Where(x => x.UserId == userId).FirstOrDefault();


                    MailMessage appraiserMail = new MailMessage();
                    appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                    appraiserMail.Subject = "Your Expert Opinion Needed: New Property Listing on Appraisal Land";
                    appraiserMail.To.Add(new MailAddress(UserDetails.Email));
                    appraiserMail.IsBodyHtml=true;
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
                    NetworkCredential info = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                    SmtpClient smtp = new SmtpClient("smtp.gmail.com")
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

        public async Task<PublishResponse> SendSms()
        {
            try
            {
                var Appraisers = context.Appraisers.ToList();

                foreach (var User in Appraisers)
                {
                    var Number = User.PhoneNumber;

                    if (Number != null)
                    {
                        string awsKeyId = "AKIA463TBXUOCZ3E2BYH";
                        string awsKeySecret = "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";

                        var awsCredentials = new BasicAWSCredentials(awsKeyId, awsKeySecret);
                        var snsClient = new AmazonSimpleNotificationServiceClient(awsCredentials, Amazon.RegionEndpoint.APSoutheast1);

                        var publishRequest = new PublishRequest
                        {
                            Message = "A new property has been added to our platform",
                            PhoneNumber = Number
                        };

                        publishRequest.MessageAttributes.Add("AWS.SNS.SMS.SMSType", new MessageAttributeValue { StringValue = "Transactional", DataType = "String" });

                        PublishResponse publishResponse = await snsClient.PublishAsync(publishRequest);
                        return publishResponse;
                    }

                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return null;
        }

        public string GenerateJwtToken()
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
                expires: DateTime.UtcNow.AddHours(72),
                signingCredentials: signIn);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<bool> RegisterUser(AppraiserCompanyClass userInformation, byte[] PasswordHash, byte[] PasswordSalt, string token)
        {
            try
            {
                bool IsActive = true;
                var users = context.UserInformations.ToList();

                long UserId = 1;
                if (users.Any())
                {
                    var maxId = users.Max(x => x.UserId);
                    UserId = maxId + 1;
                }
                UserInformation user = new UserInformation();
                user.UserId= UserId;
                user.Email = userInformation.Email.ToLower();
                user.Password = userInformation.Password;
                user.IsActive = IsActive;
                user.CreatedDateTime = DateTime.Now;
                user.UserType = 5;
                user.ForgotPasswordToken = null;
                user.VerifyEmailToken = token;
                user.PasswordSalt = PasswordSalt;
                user.PasswordHash = PasswordHash;
                await context.UserInformations.AddAsync(user);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }

        public async Task AppraiserRegisterByCompany(AppraiserCompanyClass appraiserCompany, long userid)
        {
            Appraiser appraiser = new Appraiser();
            appraiser.UserId = userid;
            appraiser.DateEstablished = DateTime.UtcNow;
            appraiser.CompanyId = appraiserCompany.CompanyId;
            context.Appraisers.Add(appraiser);
            context.SaveChanges();
        }
        public async Task BrokerRegisterByBrokerage(BrokerageCls brokerageCls, long userid)
        {
            Broker objbroker = new Broker();
            objbroker.UserId = userid;
            objbroker.Brokerageid = brokerageCls.BrokerageId;
            objbroker.DateEstablished=DateTime.UtcNow;
            context.Brokers.Add(objbroker);
            context.SaveChanges();
        }

        public long GetUserIdByCompanyId(long companyId)
        {
            var AppraiserCompanies = context.AppraiserCompanies.Where(x => x.AppraiserCompanyId == companyId).FirstOrDefault();
            if (AppraiserCompanies != null)
            {
                long userid = AppraiserCompanies.UserId;
                return userid;
            }
            return 0;
        }

        public bool CompanyExist(long CompanyId)
        {
            var AppraiserCompany = context.AppraiserCompanies.Where(x => x.AppraiserCompanyId == CompanyId).FirstOrDefault();
            if (AppraiserCompany != null)
            {
                return true;
            }
            return false;
        }
        public bool BrokerageExist(long BrokerageId)
        {
            var Brokerage = context.Brokerages.Where(x => x.Id == BrokerageId).FirstOrDefault();
            if (Brokerage != null)
            {
                return true;

            }
            return false;
        }

        public async Task<UserInformation> GetUserId(string email)
        {
            try
            {
                var user = context.UserInformations.Where(x => x.Email == email.ToLower()).FirstOrDefault();
                var users = context.UserInformations.ToList();
                if (user != null)
                {
                    return user;
                }

                return null;
            }
            catch (Exception ex)
            {
                var _ex = ex.Message;
            }
            return null;
        }

        public async Task<bool> RegisterBroker(BrokerageCls brokerageCls, byte[] PasswordHash, byte[] PasswordSalt, string token)
        {
            try
            {
                bool IsActive = false;
                var users = context.UserInformations.ToList();

                long UserId = 1;
                if (users.Any())
                {
                    var maxId = users.Max(x => x.UserId);
                    UserId = maxId + 1;
                }
                UserInformation user = new UserInformation();
                user.UserId= UserId;
                user.Email = brokerageCls.Email.ToLower();
                user.Password = brokerageCls.Password;
                user.IsActive = IsActive;
                user.CreatedDateTime = DateTime.Now;
                user.UserType = 6;
                user.ForgotPasswordToken = null;
                user.VerifyEmailToken = token;
                user.PasswordSalt = PasswordSalt;
                user.PasswordHash = PasswordHash;
                await context.UserInformations.AddAsync(user);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        public async Task<bool> RegisterUser(ClsUserInformation userInformation, string token)
        {
            bool IsActive = false;
            var users = context.UserInformations.ToList();

            long UserId = 1;
            if (users.Any())
            {
                var maxId = users.Max(x => x.UserId);
                UserId = maxId + 1;
            }
            UserInformation user = new UserInformation();
            user.UserId = UserId;
            user.Email = userInformation.Email.ToLower();
            user.IsActive = IsActive;
            user.CreatedDateTime = DateTime.Now;
            user.UserType = 5;
            user.ForgotPasswordToken = null;
            user.VerifyEmailToken = token;
            await context.UserInformations.AddAsync(user);
            await context.SaveChangesAsync();
            return true;
        }
    }

}
