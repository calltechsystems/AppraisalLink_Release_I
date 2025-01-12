
using Amazon.S3;
using Amazon.S3.Model;
using CallTech.Class;
using DAL.Classes;
using DAL.Rpository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
//using DBL.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Security.Cryptography;

namespace CallTech.Controllers
{
    [Route("api/com.appraisalland.Login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService _authService;
        private IRegistrationService _registrationService;
        private readonly IBroker _broker;
        private IEmailService _emailService;
        private AppraisallandsContext _context;
        private readonly ILogger<LoginController> _logger;
        Log log = new Log();
        public LoginController(IAuthService authService, ILogger<LoginController> logger, IBroker broker, IRegistrationService registrationService, IEmailService emailService, AppraisallandsContext context)
        {
            _authService = authService;
            _logger = logger;
            _broker = broker;
            _registrationService = registrationService;
            _emailService = emailService;
            _context = context;
          
        }
        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] ClsLogin model)
        {
            string bucketName = "appraisallandfiles";
            string keyName = "AppraisalLogFile.txt";
            S3Logger s3Logger = new S3Logger(bucketName, keyName);
            await s3Logger.Log("Login Function started.");
            try
            {
                var user = await _authService.GetUserByEmailAsync(model.Email);

                if (user == null)
                {
                    return Unauthorized(new { Message = "User does not exist" });
                }
                if (user.IsActive)
                {
                    var isPasswordValid = _authService.VerifyPasswordHash(model.Password, model.Email);

                    if (!isPasswordValid)
                    {
                        return Unauthorized(new { Message = "Invalid password provided" });
                    }
                    //bool IsEmailVerified = _authService.IsEmailVerified(user.Email);
                    //if (IsEmailVerified)
                    //{
                    var token = _authService.GenerateJwtToken(user);
                    var UserType = user.UserType;
                    var User_Id = user.UserId;
                    var Broker_Details = _authService.GetBrokerdetails(User_Id);
                    var Brokerage_Details = _authService.GetBrokeragedetails(User_Id);
                    if (Brokerage_Details.Result == null)
                    {
                        Brokerage_Details = null;
                    }
                    if (Broker_Details.Result == null)
                    {
                        Broker_Details = null;
                    }
                    List<Plan> plans = new List<Plan>();
                    var UserSubscription = _authService.GetSubscriptiondetails(User_Id);
                    var subscription = _context.Subscriptions
                                 .Where(x => x.UserId == User_Id && x.EndDate >= DateTime.Today)
                                 .OrderBy(x => x.EndDate)
                                 .FirstOrDefault();
                    if (subscription != null)
                    {
                        //foreach (var item in UserSubscription)
                        //{
                            var plan = _context.Plans.Where(x => x.Id == subscription.PlanId).FirstOrDefault();
                            plans.Add(plan);
                        //}
                    }
                    
                    var Appraiser_Details = _authService.GetAppraiserdetails(User_Id);
                    if (Appraiser_Details.Result == null)
                    {
                        Appraiser_Details = null;
                    }
                    var AppraiserCompany_Datails = _authService.GetAppraiserCompanydetails(User_Id);
                    if (AppraiserCompany_Datails.Result == null)
                    {
                        AppraiserCompany_Datails = null;
                    }
                    return Ok(new
                    {
                        Token = token,
                        UserId = user.UserId,
                        UserEmail = user.Email,
                        EmailNotification=user.GetEmail,
                        SmsNotification=user.GetSms,
                        IsAdmin= user.IsAdmin,
                        UserType = user.UserType,
                        message = "Login successful",
                        UserSubscription = UserSubscription,
                        plans= plans,
                        Broker_Details = Broker_Details != null ? await Broker_Details : null,
                        Brokerage_Details = Brokerage_Details != null ? await Brokerage_Details : null,
                        Appraiser_Details = Appraiser_Details != null ? await Appraiser_Details : null,
                        AppraiserCompany_Datails = AppraiserCompany_Datails != null ? await AppraiserCompany_Datails : null
                    });
                }
                else
                {
                    string token = _registrationService.GenerateJwtToken();
                    if (token != null)
                    {
                        user.VerifyEmailToken= token;
                        _context.UserInformations.Update(user);
                        _context.SaveChanges();
                    }
                    var valid = _emailService.SendEmail(model.Email, token);
                    return StatusCode(403, "Your account is not yet verified.or resend email verification  Please check your email and follow the verification link to activate your account.");
                }


            }
            catch (Exception ex)
            {

                //log.writeLog("An error occurred during login" + ex);
                await s3Logger.Log("An error occurred during login" + ex);
                return StatusCode(500, new { Message = "An error occurred during login" });
            }
        }

        [HttpPost("changepassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ClsChangePassword model)
        {
           // log.writeLog("ChangePassword Function started");
            string bucketName = "appraisallandfiles";
            string keyName = "AppraisalLogFile.txt";
            S3Logger s3Logger = new S3Logger(bucketName, keyName);
            await s3Logger.Log("ChangePassword Function started");
            try
            {
                var user = await _authService.GetUserByEmailAsync(model.Email);

                if (user == null)
                {
                    return Unauthorized(new { Message = "User does not exist" });
                }
                //if(user.IsActive)
                //{
                var isPasswordValid = _broker.VerifyPasswordHash(model.OldPassword);

                if (!isPasswordValid)
                {
                    return Unauthorized(new { Message = "Invalid old password" });
                }

                CreatePasswordHash(model.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);
                var PasswordHash = passwordHash;
                var PasswordSalt = passwordSalt;

                var Success = _broker.UpdateNewPassword(model, PasswordHash, PasswordSalt);
                if (Success)
                {


                    return Ok(new { message = "Password changed successfully." });

                }
                else
                {
                    return BadRequest(new { message = "Error changing password." });
                }
                //}
                //else
                //{
                //    return StatusCode(403, "Your account is not yet verified. Please check your email and follow the verification link to activate your account.");
                //}


            }
            catch (Exception ex)
            {

                await s3Logger.Log("During Password changed." + ex);
                return StatusCode(500, new { Message = "An error occurred during login" });
            }
        }


        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        [HttpPost]
        public async Task<IActionResult> UploadFileAsync(IFormFile file)
        {
            

            return Ok($"File uploaded to S3 successfully! Access it at: ");

        }
    }
}
