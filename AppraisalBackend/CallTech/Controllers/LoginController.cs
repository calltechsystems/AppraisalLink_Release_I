using CallTech.Class;
using DAL.Classes;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace CallTech.Controllers
{
    /// <summary>
    /// 
    /// </summary>
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
        private readonly EncryptionHelper _encryptionHelper;
        Log log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="authService"></param>
        /// <param name="logger"></param>
        /// <param name="broker"></param>
        /// <param name="registrationService"></param>
        /// <param name="emailService"></param>
        /// <param name="context"></param>
        /// <param name="encryptionHelper"></param>
        public LoginController(IAuthService authService, ILogger<LoginController> logger, IBroker broker, IRegistrationService registrationService, IEmailService emailService, AppraisallandsContext context, EncryptionHelper encryptionHelper)
        {
            _authService = authService;
            _logger = logger;
            _broker = broker;
            _registrationService = registrationService;
            _emailService = emailService;
            _context = context;
            _encryptionHelper = encryptionHelper;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] ClsLogin model)
        {
            //string bucketName = "appraisallandfile";
            //string keyName = "AppraisalLogFile.txt";
            //S3Logger s3Logger = new S3Logger(bucketName, keyName);
            //await s3Logger.Log("Login Function started.");
            try
            {
                var user = await _authService.GetUserByEmailAsync(model.Email);
                var AppraiserCompany = "";
                if (user == null)
                {
                    return Unauthorized(new { Message = "User does not exist" });
                }
                if (user.IsActive && model.Password != null)
                {
                    if (user.UserType == 5)
                    {
                        var SubAppraiser = _authService.GetAppraiserdetails(user.UserId);
                        if (SubAppraiser.Result.IsActive == false)
                        {
                            //return new JsonResult(new
                            //{
                            //    status = "error",
                            //    code = 403,
                            //    message = "Your access to Appraisal Land has been revoked. Please contact your Appraiser Company for further assistance."
                            //});
                            return BadRequest(new { Message = "Your access to Appraisal Land has been revoked. Please contact your Appraiser Company for further assistance." });
                        }
                        var AppraiserComp = _context.AppraiserCompanies.Where(x => x.AppraiserCompanyId == SubAppraiser.Result.CompanyId).FirstOrDefault();
                        if (AppraiserComp != null)
                        {
                            var UserInfo = _context.UserInformations.Where(x => x.UserId == AppraiserComp.UserId).FirstOrDefault();
                            AppraiserCompany = UserInfo.Email;
                        }
                    }
                    else if (user.UserType == 6)
                    {
                        var sub_Broker = _authService.GetBrokerdetails(user.UserId);
                        if (sub_Broker.Result.Isactive1 == false || sub_Broker.Result.IsActive == false)
                        {
                            //return StatusCode(StatusCodes.Status403Forbidden, new
                            //{
                            //    Message = "The access to Appraisal Land has been revoked, kindly contact your Mortgage Brokerage."
                            //});
                            return BadRequest(new { Message = "Your access to Appraisal Land has been revoked. Please contact your Mortgage Brokerage for further assistance." });
                        }
                    }

                    var isPasswordValid = _authService.VerifyPasswordHash(model.Password, model.Email);
                    //var isPasswordValid = model.Password == _encryptionHelper.Decrypt(user.Password);
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
                    var Brokerage_Details = _authService.GetBrokerageDetails(User_Id);
                    if (Brokerage_Details.Result == null)
                    {
                        Brokerage_Details = null;
                    }
                    if (Broker_Details.Result == null)
                    {
                        Broker_Details = null;
                    }
                    List<Plan> plans = new List<Plan>();
                    List<Subscription> subscriptionDTOs = new List<Subscription>();
                    var objsub = _authService.GetSubscriptiondetails(User_Id);
                    var transtion_log = _context.TransactionLogs
                                 .Where(x => x.UserId == User_Id && x.IsActive == true)
                                 .FirstOrDefault();
                    if (objsub != null)
                    {


                        foreach (var item in objsub)
                        {
                            if (transtion_log.Paymentid == item.PaymentId)
                            {
                                subscriptionDTOs.Add(item);
                            }
                        }
                    }
                    var planLimitExceed = 0;
                    if (transtion_log != null)
                    {


                        if (transtion_log.UsedProperties < transtion_log.TotalProperties)
                        {
                            planLimitExceed = 0;
                        }
                        else
                        {
                            planLimitExceed = 1;
                        }
                    }
                    var UserSubscription = subscriptionDTOs.Select(sub => new SubscriptionDto
                    {
                        SubscriptionId = sub.SubscriptionId,
                        StartDate = sub.StartDate,
                        EndDate = sub.EndDate,
                        PlanId = sub.PlanId,
                        UserId = sub.UserId,
                        TopUpId = sub.TopUpId,
                        Status = sub.Status,
                        CurrencyCode = sub.CurrencyCode,
                        PaymentId = sub.PaymentId,
                        IsActive = sub.EndDate > DateTime.UtcNow // Determine if active
                    }).ToList();



                    //var subscription = _context.Subscriptions
                    //             .Where(x => x.UserId == User_Id && x.EndDate >= DateTime.Today)
                    //             .OrderBy(x => x.EndDate)
                    //             .FirstOrDefault();
                    if (subscriptionDTOs.Count > 0)
                    {

                        var plan = _context.Plans.Where(x => x.Id == subscriptionDTOs[0].PlanId).FirstOrDefault();
                        plans.Add(plan);

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
                        EmailNotification = user.GetEmail,
                        SmsNotification = user.GetSms,
                        IsAdmin = user.IsAdmin,
                        planLimitExceed = planLimitExceed,
                        UserType = user.UserType,
                        message = "Login successful",
                        UserSubscription = UserSubscription,
                        plans = plans,
                        Broker_Details = Broker_Details != null ? await Broker_Details : null,
                        Brokerage_Details = Brokerage_Details != null ? await Brokerage_Details : null,
                        Appraiser_Details = Appraiser_Details != null ? await Appraiser_Details : null,
                        AppraiserCompany_Datails = AppraiserCompany_Datails != null ? await AppraiserCompany_Datails : null,
                        AppraiserCompanyEmail = AppraiserCompany
                    });
                }
                else
                {
                    string token = _registrationService.GenerateJwtToken();
                    if (token != null)
                    {
                        user.VerifyEmailToken = token;
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
                // await s3Logger.Log("An error occurred during login" + ex);
                return StatusCode(500, new { Message = "An error occurred during login" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
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


        /// <summary>
        /// 
        /// </summary>
        /// <param name="password"></param>
        /// <param name="passwordHash"></param>
        /// <param name="passwordSalt"></param>
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
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
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> UploadFileAsync(IFormFile file)
        {
            return Ok($"File uploaded to S3 successfully! Access it at: ");
        }
    }
}
