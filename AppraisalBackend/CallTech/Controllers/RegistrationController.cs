using System.Security.Cryptography;
using System.Text;
using CallTech.Classes;
using DAL.Classes;
using DAL.Rpository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
//using DBL.Models;

namespace CallTech.Controllers;

[Route("api/com.appraisalland.Registration")]
[ApiController]
public class RegistrationController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IEmailService _emailService;
    private IPropertyService _propertyService;
    private readonly Log Log = new();
    private readonly IRegistrationService registrationService;

    public RegistrationController(IRegistrationService _registrationService, IPropertyService propertyService,
        IEmailService emailService, IAuthService authService)
    {
        registrationService = _registrationService;
        _propertyService = propertyService;
        _emailService = emailService;
        _authService = authService;
    }

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
                // CreatePasswordHash(model.Password, out byte[] passwordHash, out byte[] passwordSalt);
                //bool valid;


                //var PasswordHash = passwordHash;
                //var PasswordSalt = passwordSalt;

                if (registrationService.EmailExists(model.Email)) return Conflict("Email is already registered.");
                //else
                //{
                //    string apiKey = "xtayxnjtfxy0z3vcjxi4b4k0zrrrfmau";
                // valid = await _emailService.SendEmail(model.Email, apiKey);
                //}

                //if (valid)
                //{
                var username = model.Email;
                var token = registrationService.GenerateJwtToken(model);
                var valid = _emailService.SendEmail(username, token);
                if (valid)
                {
                    var success = await registrationService.RegisterUser(model, token);
                }
                //    if (success == true)
                //    {
                //        var user = registrationService.UserId(username);
                //        switch (user.UserType)
                //        {
                //            case 1:
                //                registrationService.BrokerRegister(user.UserId);
                //                break;
                //            case 2:
                //                registrationService.BrokerageRegister(user.UserId);
                //                break;
                //            case 3:
                //                registrationService.AppraiserIndividualRegister(user.UserId);
                //                break;
                //            case 4:
                //                registrationService.AppraiserCompRegister(user.UserId);
                //                break;
                //            default:
                //                // code block
                //                break;
                //        }
                //        //_emailService.SendEmail(user.Email, user.VerifyEmailToken);

                //        return Ok(new { Message = "Registration successful!", UserId = user.UserId, UserEmail = user.Email, UserType = user.UserType });
                //    }
                //}
                //else
                //{
                //    return BadRequest("The provided email address is not associated with an account. Please double-check your email address or sign up if you don't have an account");
                //}
            }

            return BadRequest(new {Message = "Please provide correct Usertype ,Registration failed ."});
        }
        catch (Exception ex)
        {
            Log.WriteLog("An error occurred during Registration" + ex);
            return StatusCode(500, new {Message = "An error occurred during Registration"});
        }
    }


    [AllowAnonymous]
    [HttpPost("signUpUser")]
    public async Task<IActionResult> signUpUser([FromBody] ClsSignUpUser model)
    {
        try
        {
            if (model.UserType > 0 && model.UserType < 8)
            {
                CreatePasswordHash(model.Password, out var passwordHash, out var passwordSalt);
                bool valid;


                var PasswordHash = passwordHash;
                var PasswordSalt = passwordSalt;

                if (registrationService.EmailExists(model.Email)) return Conflict("Email is already registered.");
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
                    var success = await registrationService.RegisterUserAsync(model, PasswordHash, PasswordSalt);

                    if (success)
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
                        }
                        //_emailService.SendEmail(user.Email, user.VerifyEmailToken);

                        return Ok(new
                            {Message = "Registration successful!", user.UserId, UserEmail = user.Email, user.UserType});
                    }
                }
                else
                {
                    return BadRequest("Your email is not verified. Please verify your email to proceed.");
                }
            }

            return BadRequest(new {Message = "Please provide correct Usertype ,Registration failed ."});
        }
        catch (Exception ex)
        {
            Log.WriteLog("An error occurred during Registration" + ex);
            return StatusCode(500, new {Message = "An error occurred during Registration"});
        }
    }


    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }
    }

    [AllowAnonymous]
    [HttpGet("VerifyEmailToken")]
    public IActionResult VerifyEmailToken(string token)
    {
        Log.WriteLog("VerifyEmailToken Function started");
        try
        {
            var isValid = _emailService.VerifyEmailToken(token);
            if (!isValid) return BadRequest("Invalid Token.");
            var User = _emailService.getdata(token);
            var redirectUrl =
                $"https://appraisalland.vercel.app/register?emailId={Uri.EscapeDataString(User.Email)}&UserType={Uri.EscapeDataString(Convert.ToString(User.UserType))}";
            return Redirect(redirectUrl);
        }
        catch (Exception ex)
        {
            Log.WriteLog("An error occurred during VerifyEmailToken" + ex);
            return StatusCode(500, new {Message = "An error occurred during VerifyEmailToken"});
        }
    }


    [HttpPost("RegisterAppraiserByCompany")]
    public async Task<IActionResult> RegisterAppraiserByCompany(AppraiserCompanyClass appraiserCompanyClass)
    {
        Log.WriteLog("RegisterAppraiserByCompany Function started");
        try
        {
            CreatePasswordHash(appraiserCompanyClass.Password, out var passwordHash, out var passwordSalt);
            var hashedPassword = passwordHash;
            var salt = passwordSalt;

            if (registrationService.EmailExists(appraiserCompanyClass.Email))
                return Conflict("Email is already registered.");

            if (!registrationService.CompanyExist(appraiserCompanyClass.CompanyId))
                return NotFound($"AppraiserCompany Not Found with {appraiserCompanyClass.CompanyId} Id");

            var username = appraiserCompanyClass.Email;
            var token = registrationService.GenerateJwtToken();
            var valid = _emailService.SendEmail(username, token);
            if (valid)
            {
                var success =
                    await registrationService.RegisterUser(appraiserCompanyClass, hashedPassword, salt, token);

                if (success)
                {
                    var user = registrationService.GetUserId(appraiserCompanyClass.Email);
                    await registrationService.AppraiserRegisterByCompany(appraiserCompanyClass, user.Result.UserId);

                    return Ok(new
                    {
                        Message = "Registration successful!", user.Result.UserId,
                        UserEmail = appraiserCompanyClass.Email
                    });
                }

                return BadRequest(new {Message = "Registration failed"});
            }

            return BadRequest(
                "The provided email address is not associated with an account. Please double-check your email address or sign up if you don't have an account");
        }
        catch (Exception ex)
        {
            Log.WriteLog("An error occurred during Register Appraiser By Company: " + ex.Message);
            return StatusCode(500, new {Message = "An error occurred during Registration"});
        }
    }

    [HttpPost("RegisterBrokerByBrokerage")]
    public async Task<IActionResult> RegisterBrokerByBrokerage(BrokerageCls brokerageCls)
    {
        Log.WriteLog("RegisterBrokerByBrokerage Function started");
        try
        {
            CreatePasswordHash(brokerageCls.Password, out var passwordHash, out var passwordSalt);
            var hashedPassword = passwordHash;
            var salt = passwordSalt;

            if (registrationService.EmailExists(brokerageCls.Email)) return Conflict("Email is already registered.");

            if (!registrationService.BrokerageExist(brokerageCls.BrokerageId))
                return NotFound($"Brokerage Not Found with {brokerageCls.BrokerageId} Id");

            var username = brokerageCls.Email;
            var token = registrationService.GenerateJwtToken();

            var valid = _emailService.SendEmail(username, token);
            if (valid)
            {
                var success = await registrationService.RegisterBroker(brokerageCls, hashedPassword, salt, token);
                if (success)
                {
                    var user = registrationService.GetUserId(brokerageCls.Email);
                    await registrationService.BrokerRegisterByBrokerage(brokerageCls, user.Result.UserId);

                    return Ok(new
                        {Message = "Registration successful!", user.Result.UserId, UserEmail = brokerageCls.Email});
                }

                return BadRequest(new {Message = "Registration failed"});
            }

            return BadRequest(
                "The provided email address is not associated with an account. Please double-check your email address or sign up if you don't have an account");
        }
        catch (Exception ex)
        {
            Log.WriteLog("An error occurred during Register Broker By Brokerage: " + ex.Message);
            return StatusCode(500, new {Message = "An error occurred during Registration"});
        }
    }
}