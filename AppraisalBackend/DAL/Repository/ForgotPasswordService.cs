using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using DAL.Rpository;
using DBL.Models;
using Microsoft.Extensions.Configuration;
//using DBL.NewModels;

namespace DAL.Repository;

public class ForgotPasswordService : IForgotPasswordService
{
    private readonly AppraisallandsContext _callContext;
    private IConfiguration _configuration;
    private IEmailService _emailService;

    public ForgotPasswordService(AppraisallandsContext callContext, IConfiguration configuration,
        IEmailService emailService)
    {
        _callContext = callContext;
        _configuration = configuration;
        _emailService = emailService;
    }

    public async Task<bool> SendResetTokenAsync(string email)
    {
        var user = _callContext.UserInformations.FirstOrDefault(x => x.Email == email);

        if (user == null) return false;
        try
        {
            var resetToken = GenerateToken();

            user.ForgotPasswordToken = resetToken;
            user.Resettokenexpiry = DateTime.Now;

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

    public async Task<bool> VerifyResetTokenAsync(string email, string token, string NewPassword)
    {
        var User = _callContext.UserInformations.FirstOrDefault(x => x.Email == email);
        if (User == null) return false;
        if (User.ForgotPasswordToken != token) return false;
        var resetTokenExpiry = User.Resettokenexpiry;

        if (resetTokenExpiry.HasValue)
        {
            var timeElapsed = DateTime.UtcNow - resetTokenExpiry.Value;

            if (timeElapsed.TotalMinutes <= 10)
            {
                User.ForgotPasswordToken = null;
                CreatePasswordHash(NewPassword, out var _passwordHash, out var _passwordSalt);
                var PasswordHash = _passwordHash;
                var PasswordSalt = _passwordSalt;
                User.PasswordSalt = _passwordSalt;
                User.PasswordHash = _passwordHash;
                User.Password = NewPassword;
                _callContext.UserInformations.Update(User);
                _callContext.SaveChanges();
                return true;
            }

            return false;
        }

        return false;
    }

    public bool SendEmail(string toEmail, string key)
    {
        try
        {
            var pswd = "odkzjyvtiwmtdjtq";
            var m = new MailMessage();
            m.From = new MailAddress("pradhumn7078@gmail.com");
            m.Subject = "Password Reset Request for Your '" + toEmail + "' Account";
            m.To.Add(new MailAddress(toEmail));
            m.Body = "Dear User,\n\n";
            m.Body += "As requested, here is your one-time password (OTP) for resetting your password:\n";
            m.Body += $"[OTP Code: {key}]\n\n";
            m.Body += "Please enter this OTP on the password reset page to complete the process.\n";
            m.Body +=
                "If you didn't initiate this request or need further assistance, please contact our support team immediately.\n\n";
            m.Body += "Best regards,\n";
            m.Body += "Support Team\n";
            m.Body += "Appraisal Land";


            var info = new NetworkCredential("pradhumn7078@gmail.com", pswd);
            var smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = info,
                EnableSsl = true
            };
            smtp.Send(m);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
            return false;
        }
    }

    public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }
    }

    public string GenerateToken()
    {
        const string chars = "0123456789"; // Define the characters to use for the token
        var tokenLength = 6;
        var random = new Random();
        var token = new char[tokenLength];

        for (var i = 0; i < tokenLength; i++) token[i] = chars[random.Next(chars.Length)];

        return new string(token);
    }
}