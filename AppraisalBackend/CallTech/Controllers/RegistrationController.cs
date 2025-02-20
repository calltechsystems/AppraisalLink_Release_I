using AppraisalLand.Class;
using DAL.Classes;
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
        public RegistrationController(IRegistrationService _registrationService, IPropertyService propertyService, IEmailService emailService, IAuthService authService, EncryptionHelper encryptionHelper)
        {
            registrationService = _registrationService;
            _propertyService = propertyService;
            _emailService = emailService;
            _authService = authService;
            _encryptionHelper = encryptionHelper;
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
                var Ispass = registrationService.GetIsPassword(model.Email);
                bool isPasswordSet = Ispass ?? false;
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
                        var UserDetails = _emailService.getUser(emailId);
                        if (UserDetails.IsActive)
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
                                //_emailService.SendEmail(user.Email, user.VerifyEmailToken);

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
        /// <param name="emailid"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("VerifyEmailToken")]
        public IActionResult VerifyEmailToken(string token, string emailid)
        {
            Log.WriteLog("VerifyEmailToken Function started");
            try
            {
                bool isValid = _emailService.VerifyEmailToken(token);
                if (!isValid)
                {
                    return BadRequest("Invalid Token.");
                }
                var User = _emailService.getdata(emailid);
                string redirectUrl = $"https://appraisal-eta.vercel.app/register?emailId={Uri.EscapeDataString(User.Email)}&UserType={Uri.EscapeDataString(Convert.ToString(User.UserType))}";
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
        /// <param name="appraiserCompanyClass"></param>
        /// <returns></returns>
        [HttpPost("RegisterAppraiserByCompany")]
        public async Task<IActionResult> RegisterAppraiserByCompany(DAL.Classes.AppraiserCompanyClass appraiserCompanyClass)
        {
            Log.WriteLog("RegisterAppraiserByCompany Function started");
            try
            {
                //CreatePasswordHash(appraiserCompanyClass.Password, out byte[] passwordHash, out byte[] passwordSalt);
                //var hashedPassword = passwordHash;
                //var salt = passwordSalt;

                if (registrationService.EmailExists(appraiserCompanyClass.Email))
                {
                    return Conflict("Email is already registered.");
                }

                if (!registrationService.CompanyExist(appraiserCompanyClass.CompanyId))
                {
                    return NotFound($"AppraiserCompany Not Found with {appraiserCompanyClass.CompanyId} Id");
                }

                var username = appraiserCompanyClass.Email;
                string token = registrationService.GenerateJwtToken();
                var valid = _emailService.SendEmail(username, token);
                if (valid)
                {
                    var success = await registrationService.RegisterUser(appraiserCompanyClass, token);

                    if (success)
                    {
                        var user = registrationService.GetUserId(appraiserCompanyClass.Email);
                        await registrationService.AppraiserRegisterByCompany(appraiserCompanyClass, user.Result.UserId);

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
        /// <param name="brokerageCls"></param>
        /// <returns></returns>
        [HttpPost("RegisterBrokerByBrokerage")]
        public async Task<IActionResult> RegisterBrokerByBrokerage(BrokerageCls brokerageCls)
        {
            Log.WriteLog("RegisterBrokerByBrokerage Function started");
            try
            {
                //CreatePasswordHash(brokerageCls.Password, out byte[] passwordHash, out byte[] passwordSalt);
                //var hashedPassword = passwordHash;
                //var salt = passwordSalt;

                if (registrationService.EmailExists(brokerageCls.Email))
                {
                    return Conflict("Email is already registered.");
                }

                if (!registrationService.BrokerageExist(brokerageCls.BrokerageId))
                {
                    return NotFound($"Brokerage Not Found with {brokerageCls.BrokerageId} Id");
                }

                var username = brokerageCls.Email;
                string token = registrationService.GenerateJwtToken();

                var valid = _emailService.SendEmail(username, token);
                if (valid)
                {
                    var success = await registrationService.RegisterBroker(brokerageCls, token);
                    if (success)
                    {
                        var user = registrationService.GetUserId(brokerageCls.Email);
                        await registrationService.BrokerRegisterByBrokerage(brokerageCls, user.Result.UserId);

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
