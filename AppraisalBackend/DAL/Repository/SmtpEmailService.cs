using DAL.Classes;
using DBL.Models;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class SmtpEmailService : IEmailService
    {
        private readonly AppraisallandsContext _appraisallandContext;
        private IConfiguration _configuration;
        //private readonly HttpClient _httpClient;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraisallandContext"></param>
        public SmtpEmailService(AppraisallandsContext appraisallandContext)
        {
            _appraisallandContext = appraisallandContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="emailClass"></param>
        /// <returns></returns>
        public bool Email(EmailClass emailClass)
        {
            try
            {
                string pswd = "odkzjyvtiwmtdjtq";
                MailMessage message = new MailMessage();
                message.From = new MailAddress("pradhumn7078@gmail.com");
                message.Subject = emailClass.Subject;
                message.To.Add(new MailAddress(emailClass.ToEmail));
                message.Body = emailClass.Body;
                NetworkCredential credential = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = credential,
                    EnableSsl = true
                };
                smtp.Send(message);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return false;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="toEmail"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public bool SendEmail(string toEmail, string key)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(toEmail))
                {
                    Console.WriteLine("Email address is empty or null");
                    return false;
                }

                if (!IsValidEmail(toEmail))
                {
                    Console.WriteLine("Invalid email address format");
                    return false;
                }

                string pswd = "odkzjyvtiwmtdjtq";
                MailMessage message = new MailMessage();
                message.From = new MailAddress("pradhumn7078@gmail.com");
                message.Subject = "Verify Your Email Address - Action Required";
                message.To.Add(new MailAddress(toEmail));
                message.IsBodyHtml = true;

                //string emailBody = $"Dear User,\n\n";
                //emailBody += $"Your profile has been created successfully. To complete the verification process and access your account, please click the link below:\n";
                //emailBody += $"http://appraisalland-prod.us-east-1.elasticbeanstalk.com/api/com.appraisalland.Registration/VerifyEmailToken?token={key}\n\n";
                //emailBody += $"After verification, you can log in to our website using your credentials.\n\n";
                //emailBody += $"Best regards,\n";
                //emailBody += $"Support Team\n";
                //emailBody += $"Appraisal Land";


                string emailBody = @"
                                     <html>
                                       <head>
                                         <style>
                                           .appraisal-text {
                                             color: #2e008b;
                                             font-weight: bold;
                                             font-size: 45px;
                                             margin-top: 80px;
                                             margin-left: 5px;
                                           }
                                     
                                           .land-text {
                                             color: #97d700;
                                             font-weight: bold;
                                             font-size: 45px;
                                             margin-top: 80px;
                                             margin-left: 10px;
                                             margin-bottom: 10px;
                                           }
                                     
                                           .btn {
                                             display: inline-block;
                                             padding: 10px 20px;
                                             font-size: 16px;
                                             background-color: #007bff;
                                             color: white;
                                             text-align: center;
                                             text-decoration: none;
                                             border-radius: 5px;
                                           }
                                     
                                           .content {
                                             margin-top: 20px;
                                           }
                                     
                                           .footer {
                                             margin-top: 20px;
                                             font-size: 14px;
                                           }
                                     
                                           .footer a {
                                             color: #2e008b;
                                             text-decoration: none;
                                           }
                                         </style>
                                       </head>
                                       <body>
                                         <div class='Appraisal-div'>
                                           <span class='appraisal-text'>Appraisal</span>
                                           <span class='land-text'>Land</span>
                                         </div>
                                     
                                         <div class='content'>
                                           <p>Dear User,</p>
                                           <p>Your profile has been created successfully. To complete the verification process and access your account, please click the button below:</p>
                                           <a href='http://appraisalland-prod.us-east-1.elasticbeanstalk.com/api/com.appraisalland.Registration/VerifyEmailToken?token=" + key + @"&emailid=" + toEmail + @"' 
                                             class='btn'>Verify Your Email</a>
                                           <p>After verification, you can log in to our website using your credentials.</p>
                                           
                                           <p class='footer'>
                                             Best regards,<br>
                                             Support Team<br>
                                             Appraisal Land
                                           </p>
                                         </div>
                                       </body>
                                     </html>";


                message.Body = emailBody;

                NetworkCredential credential = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = credential,
                    EnableSsl = true
                };
                smtp.Send(message);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return false;
            }


            //// Configure your SMTP settings for Gmail
            //var smtpClient = new SmtpClient("smtp.gmail.com")
            //{
            //    Port = 587,
            //    Credentials = new NetworkCredential("pradhumn7078@gmail.com", "CSE@Pradhumn02"),
            //    EnableSsl = true,
            //};

            //// Create and send the verification email
            //var mailMessage = new MailMessage
            //{
            //    From = new MailAddress("pradhumn7078@gmail.com"),
            //    Subject = "Email Verification",
            //    Body = $"Click the following link to verify your email: https://localhost:7094/api/Registration/verify/{key}",
            //    IsBodyHtml = true,
            //};

            //mailMessage.To.Add(toEmail);

            //try
            //{
            //    smtpClient.Send(mailMessage);
            //    Console.WriteLine("Email sent successfully!");
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine($"Failed to send email: {ex.Message}");
            //}
        }

        private bool IsValidEmail(string email)
        {
            string emailPattern = @"^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
            return Regex.IsMatch(email, emailPattern);
        }

        //public async Task<bool> SendEmail(string toEmail, string key)
        //{

        //     bool isValid = await VerifyEmail(key, toEmail);
        //    if (!isValid) { return  false; }
        //    return true;
        //}
        //public async Task<bool> VerifyEmail(string apiKey, string email)
        //{

        //    var User = _AppraisallandContext.UserInformations.Where(x => x.VerifyEmailToken == apiKey).FirstOrDefault();

        //    if (User == null)
        //    {
        //        return false;
        //    }
        //    else
        //    {
        //        UserInformation user = new UserInformation();
        //        user.IsActive = true;
        //        _AppraisallandContext.Update(user);
        //        _AppraisallandContext.SaveChanges();
        //        return true;
        //    }
        //    //using (var httpClient = new HttpClient())
        //    //{
        //    //    httpClient.DefaultRequestHeaders.Add("ApiKey", apiKey); // Add the API key in headers

        //    //    string apiUrl = $"https://api.bouncify.io/v1/verify?apikey={apiKey}&email={email}";


        //    //    HttpResponseMessage response = await httpClient.GetAsync(apiUrl);
        //    //    if (response.IsSuccessStatusCode)
        //    //    {

        //    //        var responseBody = await response.Content.ReadAsStringAsync();
        //    //        var jsonResponse = JObject.Parse(responseBody);
        //    //        bool isValid = jsonResponse["success"]?.Value<bool>() ?? false;
        //    //        bool isUndeliverable = jsonResponse["result"]?.Value<string>() == "undeliverable" ? false : true;

        //    //        return isUndeliverable;
        //    //    }


        //    //    return false;
        //    //}
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public bool VerifyEmailToken(string token)
        {
            var userDetail = _appraisallandContext.UserInformations.FirstOrDefault(x => x.VerifyEmailToken == token);
            if (userDetail == null)
            {
                return false;
            }
            TimeSpan timeDifference = DateTime.Now - userDetail.CreatedDateTime;
            if (timeDifference.TotalHours >= 72)
            {
                return false;
            }
            else
            {
                userDetail.IsActive = true;
                _appraisallandContext.Update(userDetail);
                _appraisallandContext.SaveChanges();
                return true;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public UserInformation getdata(string token)
        {
            var userDetail = _appraisallandContext.UserInformations.FirstOrDefault(x => x.Email.ToLower() == token.ToLower());
            if (userDetail == null)
            {
                return null;
            }
            else
            {
                //User.IsPasswordSet = true;
                _appraisallandContext.Update(userDetail);
                _appraisallandContext.SaveChanges();
                return userDetail;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="emailId"></param>
        /// <returns></returns>
        public UserInformation getUser(string emailId)
        {
            var userInformation = _appraisallandContext.UserInformations.FirstOrDefault(x => x.Email.ToLower() == emailId.ToLower());
            if (userInformation == null)
            {
                return null;
            }
            else { return userInformation; }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <param name="brokerage"></param>
        /// <returns></returns>
        public bool sendEmailAddBrokerByBrokerageCompany(string email, BrokerageCls brokerage)
        {
            try
            {
                var brokerageName = _appraisallandContext.Brokerages.Where(x => x.Id == brokerage.BrokerageId).Select(x => x.BrokerageName).FirstOrDefault();

                string pswd = "odkzjyvtiwmtdjtq";
                MailMessage appraiserMail = new MailMessage();
                appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                appraiserMail.Subject = $"Welcome to [{brokerageName}]!";
                appraiserMail.To.Add(new MailAddress(email));

                string appraiserMessage = $"Dear Broker's,\n\n";
                appraiserMessage += $"We are thrilled to welcome you to the [Brokerage Company] family! Your expertise and dedication to the real estate industry make you a valuable addition to our team.\n\n";
                appraiserMessage += $"Broker's Details:\n";
                appraiserMessage += $"• Name: [Broker's Name]\n";
                appraiserMessage += $"• Brokerage Company: [Brokerage Company Name:{brokerageName}]\n";
                appraiserMessage += $"• Contact Information: [Broker's Contact Information]\n";
                appraiserMessage += $"• Broker ID: [Broker ID]\n\n";
                appraiserMessage += $"At [Brokerage Company], we are committed to providing you with the support and resources you need to thrive in your role. Whether you're an experienced broker or just starting your career, we're here to help you succeed.\n\n";
                appraiserMessage += $"[Login](appraisal-eta.vercel.app) || [Appraisal Link](appraisal-eta.vercel.app)\n\n";
                appraiserMessage += $"Thank you for being part of our community! If you have any queries, feel free to reach out.\n\n";
                appraiserMessage += $"Best regards,\n";
                appraiserMessage += $"Support Team\n";
                appraiserMessage += $"Appraisal Land\n";

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

        //public async Task<HttpResponseMessage> Create(SubscriptionRequest subscriptionRequest)
        //{
        //    try
        //    {

        //        var jsonContent = JsonConvert.SerializeObject(subscriptionRequest);
        //        var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

        //        // Send the HTTP POST request to the PayPal subscriptions API endpoint
        //        var response = await _httpClient.PostAsync("/v1/billing/subscriptions", content);

        //        return response;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Failed to create subscription", ex);
        //    }
        //}
    }
}