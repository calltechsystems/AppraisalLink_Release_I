using Amazon.Runtime;
using Amazon.SimpleNotificationService;
using Amazon.SimpleNotificationService.Model;
using AppraisalLand.Common.Enums;
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
        private readonly AppraisallandsContext _context;
        private IConfiguration _configuration;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="_context"></param>
        /// <param name="configuration"></param>
        public RegistrationService(AppraisallandsContext _context, IConfiguration configuration)
        {
            this._context = _context;
            _configuration = configuration;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public bool EmailExists(string email)
        {
            bool isAvailable = _context.UserInformations.Where(x => x.Email == email.ToLower()).Any();

            return isAvailable;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userInfo"></param>
        /// <param name="passwordHash"></param>
        /// <param name="passwordSalt"></param>
        /// <returns></returns>
        public async Task<bool> RegisterUserAsync(ClsSignUpUser userInfo, byte[] passwordHash, byte[] passwordSalt)
        {
            try
            {
                var userDetails = _context.UserInformations.Where(x => x.Email.ToLower() == userInfo.Email.ToLower()).FirstOrDefault();
                if (userDetails != null)
                {
                    bool isActive = true;

                    userDetails.Password = userInfo.Password;
                    userDetails.PasswordHash = passwordHash;
                    userDetails.PasswordSalt = passwordSalt;
                    userDetails.Password = userInfo.Password;
                    userDetails.IsPasswordSet = false;
                    _context.UserInformations.Update(userDetails);
                    await _context.SaveChangesAsync();
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

                NetworkCredential credential = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = credential,
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
                var user = _context.UserInformations.Where(x => x.Email == email.ToLower()).FirstOrDefault();

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
        /// <param name="userId"></param>
        public void BrokerRegister(long userId)
        {
            try
            {

                Broker broker = new Broker
                {
                    UserId = userId,
                    IsActive = true
                };

                _context.Brokers.Add(broker);
                _context.SaveChanges();

            }
            catch (Exception)
            {

            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        public void BrokerageRegister(long userId)
        {
            try
            {
                Brokerage brokerage = new Brokerage();
                brokerage.UserId = userId;
                brokerage.IsActive = true;
                _context.Brokerages.Add(brokerage);
                _context.SaveChanges();
            }
            catch (Exception)
            {

            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        public void AppraiserIndividualRegister(long userId)
        {
            try
            {
                Appraiser appraiser = new Appraiser();
                appraiser.UserId = userId;
                appraiser.IsActive = false;
                _context.Appraisers.Add(appraiser);
                _context.SaveChanges();
            }
            catch (Exception)
            {

            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        public void AppraiserCompRegister(long userId)
        {
            try
            {
                DBL.Models.AppraiserCompany appraiserCompany = new DBL.Models.AppraiserCompany();
                appraiserCompany.UserId = userId;
                _context.AppraiserCompanies.Add(appraiserCompany);
                _context.SaveChanges();
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
                bool attachmentFlag = false;

                if (property.Attachment != null)
                {
                    attachmentFlag = true;
                }

                DateTime estTime = DateTimeHelper.GetEasternTime();
                var userDetail = _context.UserInformations.Where(x => x.UserId == property.UserId).FirstOrDefault();
                if (userDetail != null)
                {
                    Property newProperty = new Property();
                    newProperty.StreetName = property.StreetName;
                    newProperty.StreetNumber = property.StreetNumber;
                    newProperty.City = property.City;
                    newProperty.Province = property.Province;
                    newProperty.ZipCode = property.ZipCode;
                    newProperty.Area = property.Area;
                    newProperty.Community = property.Community;
                    newProperty.TypeOfBuilding = property.TypeOfBuilding;
                    newProperty.ApplicantFirstName = property.ApplicantFirstName;
                    newProperty.ApplicantLastName = property.ApplicantLastName;
                    newProperty.ApplicantPhoneNumber = property.ApplicantPhoneNumber;
                    newProperty.ApplicantEmailAddress = property.ApplicantEmailAddress;
                    newProperty.AddedDatetime = estTime;
                    newProperty.BidLowerRange = property.BidLowerRange;
                    newProperty.BidUpperRange = property.BidUpperRange;
                    newProperty.Urgency = property.Urgency;
                    newProperty.PropertyStatus = property.PropertyStatus;
                    newProperty.UserId = property.UserId;
                    newProperty.IsArchive = false;
                    newProperty.IsCompleted = 0;
                    newProperty.AttachmentFlag = attachmentFlag;
                    newProperty.ApartmentNumber = property.ApartmentNumber;
                    newProperty.Remark = property.Remark;
                    newProperty.QuoteRequiredDate = property.QuoteRequiredDate;
                    newProperty.EstimatedValue = property.EstimatedValue;
                    newProperty.Purpose = property.Purpose;
                    newProperty.TypeOfAppraisal = property.TypeOfAppraisal;
                    newProperty.LenderInformation = property.LenderInformation;
                    newProperty.ApplicantAddress = property.ApplicantAddress;
                    newProperty.Attachment = property.Attachment;
                    newProperty.Sqft = property.Sqft;
                    newProperty.Image = property.Image;
                    newProperty.IsOnHold = false;
                    newProperty.IsOnCancel = false;
                    newProperty.IsArchiveAppraiser = false;
                    _context.Properties.Add(newProperty);
                    await _context.SaveChangesAsync();
                    return newProperty.OrderId;
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
        public async Task<bool> SendPropertyRegistrationEmail(ClsProperty propertyDetails, int orderId)
        {
            // await SendMailAppaisers(propertyDetails, orderid);
            // await sendMailToBroker(propertyDetails.UserId);//In that add send mail to broker 
            return true;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="property"></param>
        /// <returns></returns>
        public async Task<bool> SendMailAppaisers(ClsProperty property, int orderId)
        {
            try
            {
                var appraisers = await _context.Appraisers.ToListAsync();
                var appraiserCompanies = await _context.AppraiserCompanies.ToListAsync();

                var emailTasks = new List<Task>();

                if (appraisers != null)
                {
                    foreach (var User in appraisers)
                    {
                        emailTasks.Add(SendEmailToUser(User.UserId));
                    }
                }
                if (appraiserCompanies != null)
                {
                    foreach (var User in appraiserCompanies)
                    {
                        emailTasks.Add(SendEmailToUser(User.UserId));
                    }
                }
                await Task.WhenAll(emailTasks);
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
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task sendMailToBroker(long userId /*/*,int orderid*/)
        {
            var emailTasks = new List<Task>();

            emailTasks.Add(SendEmailToBroker(userId));

            await Task.WhenAll(emailTasks);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        private string GetEmailBody()
        {
            var t = "data";
            // Return the same email body as you have in the original code
            return @" <!DOCTYPE html>
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
                           <img width='60' height='60' src='https://appraisal-eta.vercel.app/_next/image?url=%2Fassets%2Fimages%2FAppraisal_Land_Logo.png&w=48&q=75' alt='Appraisal Land Logo' />
                           <span style='color: #2e008b; font-weight: bold;'>Appraisal</span>
                           <span style='color: #97d700; font-weight: bold;'>Land</span>
                         </div>
                       </header>
                        <section class=""details"">
                         <h4>Dear XYZ</h4>
                         <p>
                           Thank you for choosing
                           <span style=""margin-top: 25px; color: #2e008b; font-weight: bold"">
                             Appraisal
                           </span>
                           <span style=""margin-top: 25px; color: #97d700; font-weight: bold"">
                             Land </span
                           >.
                         </p>
                         <p>
                           A <strong>new property</strong> has been added to Appraisal Land, We’d
                           value your expert opinion. Property <strong>Id - 1212</strong> .
                         </p>
                         <div style=""text-align: center; margin-top: 40px"">
                           <p>Please take a moment to view the listing using this link.</p>
                         </div>
                       </section>
                       <footer>
                         <div class='social-media-icons'>
                           <!-- Online links to social media icons -->
                           <a class=""fa fa-facebook mx-2"" href='https://facebook.com'><img width='30' src='https://upload.wikimedia.org/wikipedia/commons/d/dd/Facebook-icon.png' alt='Facebook' /></a>
                           <a  href='https://instagram.com'><img width='30' src='https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' alt='Instagram' /></a>
                           <a class=""fa fa-facebook mx-2"" href='https://youtube.com'><img width='30' src='https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png' alt='YouTube' /></a>
                         </div>
                         <div class='footer-section contact-inline'>
                            <ul>
                              <li>
                                <img width='15' src='https://upload.wikimedia.org/wikipedia/commons/0/0d/EMail_Icone_%281%29.png' alt='Email' />
                                <a href='mailto:info@appraisalland.ca'>info@appraisalland.ca</a>
                              </li>
                              <li>
                                <img width='15' src='https://upload.wikimedia.org/wikipedia/commons/b/ba/FIN_TELECOM.png' alt='Phone' />
                                <a href='tel:+13020001111'>+1302-000-1111</a>
                              </li>
                            </ul>
                             <li>
                               <img width='15' src='https://upload.wikimedia.org/wikipedia/commons/e/eb/Address_-_icon.png' alt='Location' />
                               123 Main Street, Brampton, LX23Y2, Ontario.
                             </li>
                             <li>
                               <img width='15' src='https://appraisal-eta.vercel.app/_next/image?url=%2Fassets%2Fimages%2FAppraisal_Land_Logo.png&w=48&q=75' alt='Website' />
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
        }
        private string GetEmailBodyForBroker()
        {
            // Return the same email body as you have in the original code
            return @"
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
                           <img width='60' height='60' src='https://appraisal-eta.vercel.app/_next/image?url=%2Fassets%2Fimages%2FAppraisal_Land_Logo.png&w=48&q=75' alt='Appraisal Land Logo' />
                           <span style='color: #2e008b; font-weight: bold;'>Appraisal</span>
                           <span style='color: #97d700; font-weight: bold;'>Land</span>
                         </div>
                       </header>
                        <section class=""details"">
                         <h4>Dear Broker</h4>
                         <p>
                           Thank you for choosing
                           <span style=""margin-top: 25px; color: #2e008b; font-weight: bold"">
                             Appraisal
                           </span>
                           <span style=""margin-top: 25px; color: #97d700; font-weight: bold"">
                             Land </span
                           >.
                         </p>
                         <p>
                           A <strong>add new property</strong> has been added to Appraisal Land, We’d
                           value your expert opinion. Property <strong>Id - 1212</strong> .
                         </p>
                         <div style=""text-align: center; margin-top: 40px"">
                           <p>Please take a moment to view the listing using this link.</p>
                         </div>
                       </section>
                       <footer>
                         <div class='social-media-icons'>
                           <!-- Online links to social media icons -->
                           <a class=""fa fa-facebook mx-2"" href='https://facebook.com'><img width='30' src='https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' alt='Facebook' /></a>
                           <a  href='https://instagram.com'><img width='30' src='https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' alt='Instagram' /></a>
                           <a class=""fa fa-facebook mx-2"" href='https://youtube.com'><img width='30' src='https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png' alt='YouTube' /></a>
                         </div>
                         <div class='footer-section contact-inline'>
                            <ul>
                              <li>
                                <img width='15' src='https://upload.wikimedia.org/wikipedia/commons/0/0d/EMail_Icone_%281%29.png' alt='Email' />
                                <a href='mailto:info@appraisalland.ca'>info@appraisalland.ca</a>
                              </li>
                              <li>
                                <img width='15' src='https://upload.wikimedia.org/wikipedia/commons/2/21/Deepin_Icon_Theme_%E2%80%93_deepin-phone-assistant_%28edited%29.svg' alt='Phone' />
                                <a href='tel:+13020001111'>+1302-000-1111</a>
                              </li>
                            </ul>
                             <li>
                               <img width='15' src='https://upload.wikimedia.org/wikipedia/commons/e/eb/Address_-_icon.png' alt='Location' />
                               123 Main Street, Brampton, LX23Y2, Ontario.
                             </li>
                             <li>
                               <img width='15' src='https://appraisal-eta.vercel.app/_next/image?url=%2Fassets%2Fimages%2FAppraisal_Land_Logo.png&w=48&q=75' alt='Website' />
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
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        private async Task SendEmailToUser(long userId)
        {
            var userDetail = _context.UserInformations.FirstOrDefault(x => x.UserId == userId);

            if (userDetail != null)
            {
                var pswd = _configuration["EmailSettings:SmtpPassword"];
                var appraiserMail = new MailMessage
                {
                    From = new MailAddress(_configuration["EmailSettings:SmtpFrom"]),
                    Subject = "Your Expert Opinion Needed: New Property Listing on Appraisal Land",
                    IsBodyHtml = true
                };
                appraiserMail.To.Add(new MailAddress(userDetail.Email));

                // Email body (you can refactor it to make it reusable as shown above)
                string emailBody = GetEmailBody();

                appraiserMail.Body = emailBody;
                NetworkCredential credential = new NetworkCredential(_configuration["EmailSettings:SmtpFrom"], pswd);
                SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587, // Using the standard port for Gmail SMTP
                    Credentials = credential, // Provide credentials
                    EnableSsl = true // Enable SSL for secure connection
                };

                // Use SendMailAsync instead of Send to make it asynchronous
                smtp.Send(appraiserMail);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        private async Task SendEmailToBroker(long userId)
        {
            var userDetails = _context.UserInformations.FirstOrDefault(x => x.UserId == userId);

            if (userDetails != null)
            {
                var pswd = "odkzjyvtiwmtdjtq"; // Secure this password
                var appraiserMail = new MailMessage
                {
                    From = new MailAddress("pradhumn7078@gmail.com"),
                    Subject = "Your Expert Opinion Needed: New Property Listing on Appraisal Land",
                    IsBodyHtml = true
                };
                appraiserMail.To.Add(new MailAddress("Pradhumn73022@gmail.com"));

                // Email body (you can refactor it to make it reusable as shown above)
                string emailBody = GetEmailBodyForBroker();

                appraiserMail.Body = emailBody;
                NetworkCredential credential = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587, // Using the standard port for Gmail SMTP
                    Credentials = credential, // Provide credentials
                    EnableSsl = true // Enable SSL for secure connection
                };

                // Use SendMailAsync instead of Send to make it asynchronous
                smtp.Send(appraiserMail);
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
                var appraisers = _context.Appraisers.ToList();

                foreach (var User in appraisers)
                {
                    var mobileNumber = User.PhoneNumber;

                    if (mobileNumber != null)
                    {
                        string awsKeyId = "AKIA463TBXUOCZ3E2BYH";
                        string awsKeySecret = "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";

                        var awsCredentials = new BasicAWSCredentials(awsKeyId, awsKeySecret);
                        var snsClient = new AmazonSimpleNotificationServiceClient(awsCredentials, Amazon.RegionEndpoint.APSoutheast1);

                        var publishRequest = new PublishRequest
                        {
                            Message = "A new property has been added to our platform",
                            PhoneNumber = mobileNumber
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
                bool isActive = false;
                var users = _context.UserInformations.ToList();

                long userId = 1;
                if (users.Any())
                {
                    var maxId = users.Max(x => x.UserId);
                    userId = maxId + 1;
                }
                UserInformation user = new UserInformation();
                user.UserId = userId;
                user.Email = userInformation.Email.ToLower();
                // user.Password = userInformation.Password;
                user.IsPasswordSet = true;
                user.IsActive = isActive;
                user.CreatedDateTime = DateTime.Now;
                user.UserType = (short)UserType.SubAppraiser;
                user.ForgotPasswordToken = null;
                user.VerifyEmailToken = token;
                //user.PasswordSalt = PasswordSalt;
                //user.PasswordHash = PasswordHash;
                await _context.UserInformations.AddAsync(user);
                await _context.SaveChangesAsync();
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
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task AppraiserRegisterByCompany(Classes.AppraiserCompanyClass appraiserCompany, long userId)
        {
            Appraiser appraiser = new Appraiser();
            appraiser.UserId = userId;
            appraiser.DateEstablished = DateTime.UtcNow;
            appraiser.CompanyId = appraiserCompany.CompanyId;
            _context.Appraisers.Add(appraiser);
            _context.SaveChanges();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerage"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task BrokerRegisterByBrokerage(BrokerageCls brokerage, long userId)
        {
            Broker newBroker = new Broker();
            newBroker.UserId = userId;
            newBroker.BrokerageId = brokerage.BrokerageId;
            newBroker.DateEstablished = DateTime.UtcNow;
            _context.Brokers.Add(newBroker);
            _context.SaveChanges();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public long GetUserIdByCompanyId(long companyId)
        {
            var appraiserCompany = _context.AppraiserCompanies.Where(x => x.AppraiserCompanyId == companyId).FirstOrDefault();
            if (appraiserCompany != null)
            {
                long userId = appraiserCompany.UserId;
                return userId;
            }
            return 0;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public bool CompanyExist(long companyId)
        {
            var appraiserCompany = _context.AppraiserCompanies.Where(x => x.AppraiserCompanyId == companyId).FirstOrDefault();
            if (appraiserCompany != null)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerageId"></param>
        /// <returns></returns>
        public bool BrokerageExist(long brokerageId)
        {
            var brokerageDetail = _context.Brokerages.Where(x => x.Id == brokerageId).FirstOrDefault();

            if (brokerageDetail != null)
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
                var user = _context.UserInformations.Where(x => x.Email == email.ToLower()).FirstOrDefault();
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
        /// <param name="brokerage"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<bool> RegisterBroker(BrokerageCls brokerage, string token)
        {
            try
            {
                bool isActive = false;
                var users = _context.UserInformations.ToList();

                long userId = 1;
                if (users.Any())
                {
                    var maxId = users.Max(x => x.UserId);
                    userId = maxId + 1;
                }
                UserInformation user = new UserInformation();
                user.UserId = userId;
                user.Email = brokerage.Email.ToLower();
                user.IsPasswordSet = true;
                user.IsActive = isActive;
                user.CreatedDateTime = DateTime.Now;
                user.UserType = (short)UserType.SubBroker;
                user.ForgotPasswordToken = null;
                user.VerifyEmailToken = token;
                //user.PasswordSalt = PasswordSalt;
                //user.PasswordHash = PasswordHash;
                await _context.UserInformations.AddAsync(user);
                await _context.SaveChangesAsync();
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
            bool isActive = false;
            var users = await _context.UserInformations.ToListAsync();

            long userId = 1;
            if (users.Any())
            {
                var maxId = users.Max(x => x.UserId);
                userId = maxId + 1;
            }
            UserInformation user = new UserInformation();
            user.UserId = userId;
            user.Email = userInformation.Email.ToLower();
            user.IsActive = isActive;
            user.CreatedDateTime = DateTime.Now;
            user.UserType = userInformation.UserType;
            user.IsPasswordSet = true;
            user.ForgotPasswordToken = null;
            user.VerifyEmailToken = token;
            await _context.UserInformations.AddAsync(user);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public bool? GetIsPassword(string email)
        {
            var isAvailable = _context.UserInformations.Where(x => x.Email.ToLower() == email.ToLower()).FirstOrDefault();
            return isAvailable.IsPasswordSet;
        }
    }

}
