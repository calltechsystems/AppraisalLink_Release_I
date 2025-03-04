using AppraisalLand.Class;
using DAL.Classes;
using DAL.Repository;
using AppraisalLand.Common.Enums;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace AppraisalLand.Controllers
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
                var appraiserCompany = "";
                if (user == null)
                {
                    return Unauthorized(new { Message = "User does not exist" });
                }
                if (user.IsActive && model.Password != null)
                {
                    if (user.UserType == (short)UserType.SubAppraiser)
                    {
                        var subAppraiser = _authService.GetAppraiserDetails(user.UserId);
                        if (subAppraiser.Result.IsActive == false)
                        {
                            //return new JsonResult(new
                            //{
                            //    status = "error",
                            //    code = 403,
                            //    message = "Your access to Appraisal Land has been revoked. Please contact your Appraiser Company for further assistance."
                            //});
                            return BadRequest(new { Message = "Your access to Appraisal Land has been revoked. Please contact your Appraiser Company for further assistance." });
                        }
                        var appraiserCompanyDetail = _context.AppraiserCompanies.Where(x => x.AppraiserCompanyId == subAppraiser.Result.CompanyId).FirstOrDefault();
                        if (appraiserCompanyDetail != null)
                        {
                            var userInfo = _context.UserInformations.Where(x => x.UserId == appraiserCompanyDetail.UserId).FirstOrDefault();
                            appraiserCompany = userInfo.Email;
                        }
                    }
                    else if (user.UserType == (short)UserType.SubBroker)
                    {
                        var subBroker = _authService.GetBrokerDetails(user.UserId);
                        if (subBroker.Result.IsActive1 == false || subBroker.Result.IsActive == false)
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
                    var userType = user.UserType;
                    var userId = user.UserId;
                    var brokerDetail = _authService.GetBrokerDetails(userId);
                    var brokerageDetail = _authService.GetBrokerageDetails(userId);
                    if (brokerageDetail.Result == null)
                    {
                        brokerageDetail = null;
                    }
                    if (brokerDetail.Result == null)
                    {
                        brokerDetail = null;
                    }
                    var appraiserDetail = _authService.GetAppraiserDetails(userId);
                    if (appraiserDetail.Result == null)
                    {
                        appraiserDetail = null;
                    }
                    var appraiserCompanyDatail = _authService.GetAppraiserCompanyDetails(userId);
                    if (appraiserCompanyDatail.Result == null)
                    {
                        appraiserCompanyDatail = null;
                    }
                    List<Plan> plans = new List<Plan>();

                    if (userType == (short)UserType.SubBroker)
                    {
                        var subBrokerDetail = _context.Brokers.Where(x => x.UserId == userId).FirstOrDefault();
                        var subBrokerageDetail = _context.Brokerages.Where(x => x.Id == subBrokerDetail.BrokerageId).FirstOrDefault();
                        userId = (long)subBrokerageDetail.UserId;
                    }
                    if (userType == (short)UserType.SubAppraiser)
                    {
                        var subAppraiserDetail = _context.Appraisers.Where(x => x.UserId == userId).FirstOrDefault();
                        var subAppraiserCompanyDetail = _context.Brokerages.Where(x => x.Id == subAppraiserDetail.CompanyId).FirstOrDefault();
                        userId = (long)subAppraiserCompanyDetail.UserId;
                    }

                    List<Subscription> subscriptionDTOs = new List<Subscription>();
                    var subscriptionDetail = _authService.GetSubscriptionDetails(userId);
                    var transactionLog = _context.TransactionLogs
                                 .Where(x => x.UserId == userId && x.IsActive == true)
                                 .FirstOrDefault();

                    long? usedProperty = 0;

                    if (subscriptionDetail != null)
                    {
                        foreach (var item in subscriptionDetail)
                        {
                            if (transactionLog.PaymentId == item.PaymentId)
                            {
                                subscriptionDTOs.Add(item);
                                usedProperty = transactionLog.UsedProperties;
                            }
                        }
                    }
                    var planLimitExceed = 0;
                    if (transactionLog != null)
                    {
                        if (transactionLog.UsedProperties < transactionLog.TotalProperties)
                        {
                            planLimitExceed = 0;
                        }
                        else
                        {
                            planLimitExceed = 1;
                        }
                    }

                    var userSubscription = subscriptionDTOs.Select(sub => new SubscriptionDto
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
                        UserSubscription = userSubscription,
                        usedProperties = usedProperty,
                        totalNoOfProperties = transactionLog?.TotalProperties ?? 0,
                        plans = plans,
                        brokerDetail = brokerDetail != null ? await brokerDetail : null,
                        Brokerage_Details = brokerageDetail != null ? await brokerageDetail : null,
                        Appraiser_Details = appraiserDetail != null ? await appraiserDetail : null,
                        AppraiserCompany_Datails = appraiserCompanyDatail != null ? await appraiserCompanyDatail : null,
                        AppraiserCompanyEmail = appraiserCompany
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

                var Success = _broker.UpdateNewPassword(model, passwordHash, passwordSalt);
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
