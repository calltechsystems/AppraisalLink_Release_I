using Amazon.Runtime;
using Amazon.SimpleNotificationService;
using Amazon.SimpleNotificationService.Model;
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

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class RegistrationService : IRegistrationService
    {
        private readonly AppraisallandsContext context;
        private IConfiguration _configuration;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="_context"></param>
        /// <param name="configuration"></param>
        public RegistrationService(AppraisallandsContext _context, IConfiguration configuration)
        {
            context = _context;
            _configuration = configuration;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public bool EmailExists(string email)
        {
            bool isAvailable = context.UserInformations.Where(x => x.Email == email.ToLower()).Any();

            return isAvailable;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userInfo"></param>
        /// <param name="PasswordHash"></param>
        /// <param name="PasswordSalt"></param>
        /// <returns></returns>
        public async Task<bool> RegisterUserAsync(ClsSignUpUser userInfo, byte[] PasswordHash, byte[] PasswordSalt)
        {
            try
            {
                var userDetails = context.UserInformations.Where(x => x.Email.ToLower() == userInfo.Email.ToLower()).FirstOrDefault();
                if (userDetails != null)
                {
                    bool IsActive = true;

                    userDetails.Password = userInfo.Password;
                    userDetails.PasswordHash = PasswordHash;
                    userDetails.PasswordSalt = PasswordSalt;
                    userDetails.Password = userInfo.Password;
                    userDetails.IsPasswordSet = false;
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
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
                        new Claim(JwtRegisteredClaimNames.Email, user.Email),
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        public void BrokerageRegister(long UserId)
        {
            try
            {

                Brokerage brokerage = new Brokerage();
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserId"></param>
        public void AppraiserCompRegister(long UserId)
        {
            try
            {

                DBL.Models.AppraiserCompany appraiserCompany = new DBL.Models.AppraiserCompany();
                appraiserCompany.UserId = UserId;
                context.AppraiserCompanies.Add(appraiserCompany);
                context.SaveChanges();

            }
            catch (Exception)
            {

            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="property"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<int> RegisterPropertyAsync(ClsProperty property)
        {
            try
            {
                bool Attachment_Flag = false;

                if (property.Attachment != null)
                {
                    Attachment_Flag = true;
                }

                DateTime estTime = DateTimeHelper.GetEasternTime();
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
                    OBjproperty.AddedDatetime = estTime;
                    OBjproperty.BidLowerRange = property.BidLowerRange;
                    OBjproperty.BidUpperRange = property.BidUpperRange;
                    OBjproperty.Urgency = property.Urgency;
                    OBjproperty.PropertyStatus = property.PropertyStatus;
                    OBjproperty.UserId = property.UserId;
                    OBjproperty.IsArchive = false;
                    OBjproperty.IsCompleted = 0;
                    OBjproperty.AttachmentFlag = Attachment_Flag;
                    OBjproperty.ApartmentNumber = property.apartment_number;
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
                    return OBjproperty.OrderId;
                }
                else
                {
                    return 0;
                }


            }
            catch (Exception ex)
            {
                return 0;
                throw new Exception("An error occurred while registering the property.", ex);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyDetails"></param>
        /// <returns></returns>
        public async Task<bool> SendPropertyRegistrationEmail(ClsProperty propertyDetails)
        {
            await SendMailAppaisers(propertyDetails);  //In that add send mail to broker 
            return true;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clsProperty"></param>
        /// <returns></returns>
        public async Task<bool> SendMailAppaisers(ClsProperty clsProperty)
        {
            try
            {
                var Appraisers = context.Appraisers.ToList();

                foreach (var User in Appraisers)
                {
                    string pswd = "odkzjyvtiwmtdjtq";
                    var userId = User.UserId;
                    var UserDetails = context.UserInformations.Where(x => x.UserId == userId).FirstOrDefault();

                    if (UserDetails != null)
                    {


                        MailMessage appraiserMail = new MailMessage();
                        appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                        appraiserMail.Subject = "Your Expert Opinion Needed: New Property Listing on Appraisal Land";
                        appraiserMail.To.Add(new MailAddress(UserDetails.Email));
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

                        string emailBody = @"
                                      <!DOCTYPE html>
                                      <html lang='en'>
                                        <head>
                                          <meta charset='UTF-8' />
                                          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                                          <title>Email Content</title>
                                          <style>
                                            body {
                                              font-family: Arial, sans-serif;
                                              margin: 20px;
                                              background: #f4f4f9;
                                            }
                                            .container {
                                              max-width: 900px;
                                              margin: auto;
                                              background: #fff;
                                              border: 2px solid #2e008b;
                                              padding: 20px;
                                              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                            }
                                            header {
                                              text-align: center;
                                              padding-bottom: 10px;
                                            }
                                            .right-corner {
                                              display: flex;
                                              justify-content: end;
                                              align-items: center;
                                              margin-bottom: 20px;
                                            }
                                            .right-corner img {
                                              margin-right: 5px;
                                            }
                                            .button-container {
                                              display: flex;
                                              justify-content: center;
                                              align-items: center;
                                              height: 10vh;
                                              margin-bottom: 50px;
                                            }
                                            .styled-button {
                                              background-color: #97d700;
                                              color: #2e008b;
                                              border: 1px solid #2e008b;
                                              padding: 10px 40px;
                                              font-size: 16px;
                                              font-weight: bold;
                                              border-radius: 5px;
                                              cursor: pointer;
                                              transition: background-color 0.3s ease;
                                            }
                                            .styled-button:hover {
                                              background-color: rgb(243, 245, 243);
                                              border: 2px solid #2e008b;
                                              color: #2e008b;
                                            }
                                            .details,
                                            .items {
                                              margin: 20px 0;
                                            }
                                            footer {
                                              text-align: start;
                                              font-size: 0.9em;
                                              font-weight: bold;
                                            }
                                            .footer-section.contact-inline ul {
                                              list-style: none;
                                              padding: 0;
                                              margin: 0;
                                            }
                                            .footer-section.contact-inline li {
                                              display: flex;
                                              align-items: center;
                                              margin-bottom: 10px;
                                            }
                                            .footer-section.contact-inline img {
                                              margin-right: 10px;
                                            }
                                          </style>
                                        </head>
                                        <body>
                                          <div class='container'>
                                            <header>
                                              <div class='right-corner'>
                                                <img width='60' height='60' src='appraisal_land.png' alt='Appraisal Land Logo' />
                                                <span style='color: #2e008b; font-weight: bold;'>Appraisal</span>
                                                <span style='color: #97d700; font-weight: bold;'>Land</span>
                                              </div>
                                            </header>
                                            <section class='details'>
                                              <h4>Dear XYZ,</h4>
                                              <p>
                                                Thank you for choosing
                                                <span style='color: #2e008b; font-weight: bold;'>Appraisal</span>
                                                <span style='color: #97d700; font-weight: bold;'>Land</span>.
                                              </p>
                                              <p>
                                                A <strong>new property</strong> has been added to Appraisal Land. We’d value your expert opinion. Property <strong>Id - 1212</strong>.
                                              </p>
                                              <div style='text-align: center; margin-top: 40px;'>
                                                <p>Please take a moment to view the listing using this link.</p>
                                              </div>
                                            </section>
                                            <section class='items'>
                                              <div class='button-container'>
                                                <a href='https://appraisal-eta.vercel.app' style='text-decoration: none;'>
                                                  <button class='styled-button'>Click Here</button>
                                                </a>
                                              </div>
                                              <p>
                                                For any further assistance, feel free to contact us at
                                                <a href='mailto:info@appraisalland.ca'>info@appraisalland.ca</a> or call us at
                                                <a href='tel:+13020001111'>+1302-000-1111</a>.
                                              </p>
                                              <p>Thanks so much for your time and insights!</p>
                                              <p>
                                                Best Regards,<br />
                                                <span style='color: #2e008b; font-weight: bold;'>Appraisal</span>
                                                <span style='color: #97d700; font-weight: bold;'>Land</span><br />
                                                Customer Support Team
                                              </p>
                                            </section>
                                            <footer>
                                              <div class='social-media-icons'>
                                                <a href='#'><img width='30' src='fb.png' alt='Facebook' /></a>
                                                <a href='#'><img width='30' src='insta.png' alt='Instagram' /></a>
                                                <a href='#'><img width='30' src='youtube.png' alt='YouTube' /></a>
                                              </div>
                                              <div class='footer-section contact-inline'>
                                                <ul>
                                                  <li>
                                                    <img width='15' src='email.png' alt='Email' />
                                                    <a href='mailto:info@appraisalland.ca'>info@appraisalland.ca</a>
                                                  </li>
                                                  <li>
                                                    <img width='15' src='phone.png' alt='Phone' />
                                                    <a href='tel:+13020001111'>+1302-000-1111</a>
                                                  </li>
                                                </ul>
                                                <ul>
                                                  <li>
                                                    <img width='15' src='location.png' alt='Location' />
                                                    123 Main Street, Brampton, LX23Y2, Ontario.
                                                  </li>
                                                  <li>
                                                    <img width='15' src='website.webp' alt='Website' />
                                                    <a href='https://appraisal-eta.vercel.app'>appraisalland.ca</a>
                                                  </li>
                                                </ul>
                                              </div>
                                            </footer>
                                            <div style='font-size: 12px; text-align: center;'>
                                              <p>
                                                Please note that this email address is not monitored. For any inquiries, kindly direct your emails to
                                                <a href='mailto:info@appraisalland.ca'>info@appraisalland.ca</a>.
                                              </p>
                                            </div>
                                          </div>
                                        </body>
                                      </html>";


                        //appraiserMail.Body = @"<!DOCTYPE html>       
                        //              <html>
                        //               <head>
                        //                 <meta charset='utf-8' />
                        //                 <meta name='viewport' content='width=device-width, initial-scale=1' />
                        //                 <title>register</title>
                        //                 <link rel='stylesheet' type='text/css' href='rapido.css' />
                        //               </head>
                        //               <body>
                        //                 <div style='width: 100%; background-color: rgb(255, 255, 255); font-family: Verdana, Geneva, Tahoma, sans-serif;'>
                        //                   <div style='width: 50%'>
                        //                     <img src='/Appraisal_Land_Logo.png' alt='' width='100px' style='margin-top: 20px; position: relative' />
                        //                     <span style='color: #2e008b; font-weight: bold; font-size: 45px; position: absolute; margin-top: 80px; margin-left: -30px;'>Appraisal</span>
                        //                     <span style='color: #97d700; font-weight: bold; font-size: 45px; position: absolute; margin-top: 80px; margin-left: 210px;'>Land</span>
                        //                   </div>
                        //                   <div>
                        //                     <p>Dear User,</p>
                        //                     <p>Order ID-<span style='font-weight: bold'>1212</span></p>
                        //                     <p>Your appraisal insights hold great importance for us. We invite you to explore the listing on our website and share your insights.</p>
                        //                     <p>Thank you for being part of our community! If you have any queries, feel free to reach out.</p>
                        //                     <p></p>
                        //                    <a href=""https://appraisal-eta.vercel.app"" style=""text-decoration: none;"">
                        //                    <button style=""background-color: #2e008b; color: #97d700; border-radius: 20px; text-align: center; padding: 10px; font-size: 20px; font-weight: bold; margin-left: 40px; cursor: pointer;"">
                        //                            Click Here
                        //                      </button>
                        //                     </a>
                        //                     < p > If you have any questions, please reach out to our customer support at < a href = 'mailto:info@appraisalland.ca' > info@appraisalland.ca </ a >.</ p >
                        //                     < p > Best regards,</ p >
                        //                     < p >< span style = 'font-weight: bold; color: #2e008b' > Appraisal Land </ span >.</ p >
                        //                   </ div >
                        //                 </ div >
                        //               </ body >
                        //             </ html > ";

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
                }

                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userInformation"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<bool> RegisterUser(Classes.AppraiserCompanyClass userInformation, string token)
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
                user.UserId = UserId;
                user.Email = userInformation.Email.ToLower();
                // user.Password = userInformation.Password;
                user.IsPasswordSet = true;
                user.IsActive = IsActive;
                user.CreatedDateTime = DateTime.Now;
                user.UserType = 5;
                user.ForgotPasswordToken = null;
                user.VerifyEmailToken = token;
                //user.PasswordSalt = PasswordSalt;
                //user.PasswordHash = PasswordHash;
                await context.UserInformations.AddAsync(user);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraiserCompany"></param>
        /// <param name="userid"></param>
        /// <returns></returns>
        public async Task AppraiserRegisterByCompany(Classes.AppraiserCompanyClass appraiserCompany, long userid)
        {
            Appraiser appraiser = new Appraiser();
            appraiser.UserId = userid;
            appraiser.DateEstablished = DateTime.UtcNow;
            appraiser.CompanyId = appraiserCompany.CompanyId;
            context.Appraisers.Add(appraiser);
            context.SaveChanges();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerageCls"></param>
        /// <param name="userid"></param>
        /// <returns></returns>
        public async Task BrokerRegisterByBrokerage(BrokerageCls brokerageCls, long userid)
        {
            Broker objbroker = new Broker();
            objbroker.UserId = userid;
            objbroker.Brokerageid = brokerageCls.BrokerageId;
            objbroker.DateEstablished = DateTime.UtcNow;
            context.Brokers.Add(objbroker);
            context.SaveChanges();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <returns></returns>
        public bool CompanyExist(long CompanyId)
        {
            var AppraiserCompany = context.AppraiserCompanies.Where(x => x.AppraiserCompanyId == CompanyId).FirstOrDefault();
            if (AppraiserCompany != null)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="BrokerageId"></param>
        /// <returns></returns>
        public bool BrokerageExist(long BrokerageId)
        {
            var Brokerage = context.Brokerages.Where(x => x.Id == BrokerageId).FirstOrDefault();
            if (Brokerage != null)
            {
                return true;

            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerageCls"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<bool> RegisterBroker(BrokerageCls brokerageCls, string token)
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
                user.UserId = UserId;
                user.Email = brokerageCls.Email.ToLower();
                user.IsPasswordSet = true;
                user.IsActive = IsActive;
                user.CreatedDateTime = DateTime.Now;
                user.UserType = 6;
                user.ForgotPasswordToken = null;
                user.VerifyEmailToken = token;
                //user.PasswordSalt = PasswordSalt;
                //user.PasswordHash = PasswordHash;
                await context.UserInformations.AddAsync(user);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userInformation"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<bool> RegisterUser(ClsUserInformation userInformation, string token)
        {
            bool IsActive = false;
            var users = await context.UserInformations.ToListAsync();

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
            user.UserType = userInformation.UserType;
            user.IsPasswordSet = true;
            user.ForgotPasswordToken = null;
            user.VerifyEmailToken = token;
            await context.UserInformations.AddAsync(user);
            await context.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public bool? GetIsPassword(string email)
        {
            var isAvailable = context.UserInformations.Where(x => x.Email.ToLower() == email.ToLower()).FirstOrDefault();
            return isAvailable.IsPasswordSet;
        }
    }

}
