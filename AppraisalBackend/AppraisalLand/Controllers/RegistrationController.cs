using AppraisalLand.Helper;
using AppraisalLand.Class;
using DAL.Classes;
using DAL.Common.Enums;
using DAL.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace AppraisalLand.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.Registration")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private IRegistrationService registrationService;
        private IPropertyService _propertyService;
        private IEmailService _emailService;
        private NotificationHelper _smtpEmailService;
        private IEmailSmsNotification _emailSmsNotification;
        private readonly EncryptionHelper _encryptionHelper;
        Log Log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="_registrationService"></param>
        /// <param name="propertyService"></param>
        /// <param name="emailService"></param>
        /// <param name="authService"></param>
        /// <param name="encryptionHelper"></param>
        /// <param name="smtpEmailService"></param>
        /// <param name="emailSmsNotification"></param>
        public RegistrationController(IRegistrationService _registrationService, IPropertyService propertyService, IEmailService emailService, IAuthService authService, EncryptionHelper encryptionHelper, NotificationHelper smtpEmailService, IEmailSmsNotification emailSmsNotification)
        {
            registrationService = _registrationService;
            _propertyService = propertyService;
            _emailService = emailService;
            _authService = authService;
            _encryptionHelper = encryptionHelper;
            _smtpEmailService = smtpEmailService;
            _emailSmsNotification = emailSmsNotification;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        // [Route("Registration")]
        [AllowAnonymous]
        [HttpPost("userRegistration")]
        public async Task<IActionResult> userRegistration([FromBody] ClsUserInformation model)
        {
            Log.WriteLog("Register Function started");
            try
            {
                if (model.UserType > 0 && model.UserType < 8)
                {
                    if (registrationService.EmailExists(model.Email))
                    {
                        return Conflict("Email is already registered.");
                    }
                    var username = model.Email;
                    string token = registrationService.GenerateJwtToken(model);
                    var valid = _emailService.SendEmail(username, token);
                    if (valid)
                    {
                        var success = await registrationService.RegisterUser(model, token);
                        return Ok(new { Message = "Email sent successful!" });
                    }
                }

                return BadRequest(new { Message = "Please provide correct Usertype ,Registration failed ." });
            }
            catch (Exception ex)
            {
                Log.WriteLog("An error occurred during Registration" + ex);
                return StatusCode(500, new { Message = "An error occurred during Registration" });
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("signUpUser")]
        public async Task<IActionResult> signUpUser([FromBody] ClsSignUpUser model)
        {
            try
            {
                var isPass = registrationService.GetIsPassword(model.Email);
                bool isPasswordSet = isPass ?? false;
                if (isPasswordSet)
                {
                    if (model.UserType > 0 && model.UserType < 8)
                    {
                        CreatePasswordHash(model.Password, out byte[] passwordHash, out byte[] passwordSalt);
                        bool valid;

                        var PasswordHash = passwordHash;
                        var PasswordSalt = passwordSalt;

                        //if (registrationService.EmailExists(model.Email))
                        //{
                        //    return Conflict("Email is already registered.");
                        //}
                        //else
                        //{
                        //    string apiKey = "xtayxnjtfxy0z3vcjxi4b4k0zrrrfmau";
                        // valid = await _emailService.SendEmail(model.Email, apiKey);
                        //}

                        //if (valid)
                        //{
                        var emailId = model.Email;
                        //string token = registrationService.GenerateJwtToken(model);
                        var userDetail = _emailService.getUser(emailId);
                        if (userDetail.IsActive)
                        {
                            //var Pss= _encryptionHelper.Encrypt(model.Password);
                            // model.Password=Pss;
                            var success = await registrationService.RegisterUserAsync(model, PasswordHash, PasswordSalt);

                            if (success == true)
                            {
                                var user = registrationService.UserId(emailId);
                                switch (user.UserType)
                                {
                                    case 1:
                                        registrationService.BrokerRegister(user.UserId);
                                        break;
                                    case 2:
                                        registrationService.BrokerageRegister(user.UserId);
                                        break;
                                    case 3:
                                        registrationService.AppraiserIndividualRegister(user.UserId);
                                        break;
                                    case 4:
                                        registrationService.AppraiserCompRegister(user.UserId);
                                        break;
                                    case 5:
                                        // registrationService.AppraiserIndividualRegister(user.UserId);
                                        break;
                                    case 6:
                                        // registrationService.BrokerRegister(user.UserId);
                                        break;
                                    default:
                                        // code block
                                        break;
                                }
                                List<string> emailIds = new List<string>();
                                emailIds.Add(emailId);

                                //_emailService.SendEmail(user.Email, user.VerifyEmailToken);
                                var notificationDetail = await _emailSmsNotification.getEmailSmsBody((int)MessageCode.NewUserRegistration);
                                if (notificationDetail != null)
                                {
                                    Task.Run(async () => await _smtpEmailService.SendEmailToUser(emailIds, "Common", "0", notificationDetail.EmailContent, notificationDetail.TriggerPoint));
                                }

                                return Ok(new { Message = "Registration successful!", UserId = user.UserId, UserEmail = user.Email, UserType = user.UserType });
                            }
                        }
                        else
                        {
                            return BadRequest("Your email is not verified. Please verify your email to proceed.");
                        }
                    }
                    return BadRequest(new { Message = "Please provide correct Usertype ,Registration failed ." });
                }
                else
                {
                    return BadRequest(new { Message = "Link Expired" });
                }
            }
            catch (Exception ex)
            {

                Log.WriteLog("An error occurred during Registration" + ex);
                return StatusCode(500, new { Message = "An error occurred during Registration" });
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
        /// <param name="token"></param>
        /// <param name="emailId"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("VerifyEmailToken")]
        public IActionResult VerifyEmailToken(string token, string emailId)
        {
            Log.WriteLog("VerifyEmailToken Function started");
            try
            {
                bool isValid = _emailService.VerifyEmailToken(token);
                if (!isValid)
                {
                    return BadRequest("Invalid Token.");
                }
                var user = _emailService.getdata(emailId);
                string redirectUrl = $"https://appraisal-eta.vercel.app/register?emailId={Uri.EscapeDataString(user.Email)}&UserType={Uri.EscapeDataString(Convert.ToString(user.UserType))}";
                return Redirect(redirectUrl);
            }
            catch (Exception ex)
            {
                Log.WriteLog("An error occurred during VerifyEmailToken" + ex);
                return StatusCode(500, new { Message = "An error occurred during VerifyEmailToken" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraiserCompany"></param>
        /// <returns></returns>
        [HttpPost("RegisterAppraiserByCompany")]
        public async Task<IActionResult> RegisterAppraiserByCompany(DAL.Classes.AppraiserCompanyClass appraiserCompany)
        {
            Log.WriteLog("RegisterAppraiserByCompany Function started");
            try
            {
                //CreatePasswordHash(appraiserCompanyClass.Password, out byte[] passwordHash, out byte[] passwordSalt);
                //var hashedPassword = passwordHash;
                //var salt = passwordSalt;

                if (registrationService.EmailExists(appraiserCompany.Email))
                {
                    return Conflict("Email is already registered.");
                }

                if (!registrationService.CompanyExist(appraiserCompany.CompanyId))
                {
                    return NotFound($"AppraiserCompany Not Found with {appraiserCompany.CompanyId} Id");
                }

                var companyEmail = appraiserCompany.Email;
                string token = registrationService.GenerateJwtToken();
                var valid = _emailService.SendEmail(companyEmail, token);
                if (valid)
                {
                    var success = await registrationService.RegisterUser(appraiserCompany, token);

                    if (success)
                    {
                        var user = registrationService.GetUserId(appraiserCompany.Email);
                        await registrationService.AppraiserRegisterByCompany(appraiserCompany, user.Result.UserId);

                        return Ok(new { Message = "mail sent successful!" });
                    }
                    else
                    {
                        return BadRequest(new { Message = "Registration failed" });
                    }
                }
                else
                {
                    return BadRequest("The provided email address is not associated with an account. Please double-check your email address or sign up if you don't have an account");
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog("An error occurred during Register Appraiser By Company: " + ex.Message);
                return StatusCode(500, new { Message = "An error occurred during Registration" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerage"></param>
        /// <returns></returns>
        [HttpPost("RegisterBrokerByBrokerage")]
        public async Task<IActionResult> RegisterBrokerByBrokerage(BrokerageCls brokerage)
        {
            Log.WriteLog("RegisterBrokerByBrokerage Function started");
            try
            {
                //CreatePasswordHash(brokerageCls.Password, out byte[] passwordHash, out byte[] passwordSalt);
                //var hashedPassword = passwordHash;
                //var salt = passwordSalt;

                if (registrationService.EmailExists(brokerage.Email))
                {
                    return Conflict("Email is already registered.");
                }

                if (!registrationService.BrokerageExist(brokerage.BrokerageId))
                {
                    return NotFound($"Brokerage Not Found with {brokerage.BrokerageId} Id");
                }

                var userEmail = brokerage.Email;
                string token = registrationService.GenerateJwtToken();

                var valid = _emailService.SendEmail(userEmail, token);
                if (valid)
                {
                    var success = await registrationService.RegisterBroker(brokerage, token);
                    if (success)
                    {
                        var user = registrationService.GetUserId(brokerage.Email);
                        await registrationService.BrokerRegisterByBrokerage(brokerage, user.Result.UserId);

                        return Ok(new { Message = "Mail sent successful!" });
                    }
                    else
                    {
                        return BadRequest(new { Message = "Registration failed" });
                    }
                }
                else
                {
                    return BadRequest("The provided email address is not associated with an account. Please double-check your email address or sign up if you don't have an account");
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog("An error occurred during Register Broker By Brokerage: " + ex.Message);
                return StatusCode(500, new { Message = "An error occurred during Registration" });
            }
        }
    }
}
