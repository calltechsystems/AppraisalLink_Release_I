using DBL.Models;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class ForgotPasswordService : IForgotPasswordService
    {
        private IEmailService _emailService;
        private readonly AppraisallandsContext _callContext;
        private IConfiguration _configuration;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="callContext"></param>
        /// <param name="configuration"></param>
        /// <param name="emailService"></param>
        public ForgotPasswordService(AppraisallandsContext callContext, IConfiguration configuration, IEmailService emailService)
        {
            _callContext = callContext;
            _configuration = configuration;
            _emailService = emailService;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public async Task<bool> SendResetTokenAsync(string email)
        {
            var user = _callContext.UserInformations.FirstOrDefault(x => x.Email == email);

            if (user == null)
            {
                return false;
            }
            try
            {
                string resetToken = GenerateToken();

                user.ForgotPasswordToken = resetToken;
                user.ResetTokenExpiry = DateTime.Now;

                _callContext.UserInformations.Update(user);
                _callContext.SaveChanges();

                var emailSent = SendEmail(user.Email, resetToken);
                return emailSent;
            }
            catch (Exception)
            {

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
                string pswd = "odkzjyvtiwmtdjtq";
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("pradhumn7078@gmail.com");
                mailMessage.Subject = "Password Reset Request for Your '" + toEmail + "' Account";
                mailMessage.To.Add(new MailAddress(toEmail));
                mailMessage.Body = $"Dear User,\n\n";
                mailMessage.Body += $"As requested, here is your one-time password (OTP) for resetting your password:\n";
                mailMessage.Body += $"[OTP Code: {key}]\n\n";
                mailMessage.Body += $"Please enter this OTP on the password reset page to complete the process.\n";
                mailMessage.Body += $"If you didn't initiate this request or need further assistance, please contact our support team immediately.\n\n";
                mailMessage.Body += $"Best regards,\n";
                mailMessage.Body += $"Support Team\n";
                mailMessage.Body += $"Appraisal Land";


                NetworkCredential credential = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = credential,
                    EnableSsl = true
                };
                smtp.Send(mailMessage);
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
        /// <param name="email"></param>
        /// <param name="token"></param>
        /// <param name="newPassword"></param>
        /// <returns></returns>
        public async Task<bool> VerifyResetTokenAsync(string email, string token, string newPassword)
        {
            var user = _callContext.UserInformations.FirstOrDefault(x => x.Email == email);
            if (user == null)
            {
                return false;
            }
            if (user.ForgotPasswordToken != token)
            {
                return false;
            }
            DateTime? resetTokenExpiry = user.ResetTokenExpiry;

            if (resetTokenExpiry.HasValue)
            {
                TimeSpan timeElapsed = DateTime.UtcNow - resetTokenExpiry.Value;

                if (timeElapsed.TotalMinutes <= 10)
                {
                    user.ForgotPasswordToken = null;
                    CreatePasswordHash(newPassword, out byte[] _passwordHash, out byte[] _passwordSalt);
                    var PasswordHash = _passwordHash;
                    var PasswordSalt = _passwordSalt;
                    user.PasswordSalt = _passwordSalt;
                    user.PasswordHash = _passwordHash;
                    user.Password = newPassword;
                    _callContext.UserInformations.Update(user);
                    _callContext.SaveChanges();
                    return true;
                }
                return false;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="password"></param>
        /// <param name="passwordHash"></param>
        /// <param name="passwordSalt"></param>
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string GenerateToken()
        {
            const string chars = "0123456789"; // Define the characters to use for the token
            int tokenLength = 6;
            Random random = new Random();
            char[] token = new char[tokenLength];

            for (int i = 0; i < tokenLength; i++)
            {
                token[i] = chars[random.Next(chars.Length)];
            }

            return new string(token);
        }
    }
}