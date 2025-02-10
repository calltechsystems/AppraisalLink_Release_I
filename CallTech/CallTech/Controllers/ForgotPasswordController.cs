using DAL.Classes;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace CallTech.Controllers
{
    [Route("api/com.appraisalland.ForgotPassword")]
    [ApiController]
    public class ForgotPasswordController : ControllerBase
    {
        private readonly IForgotPasswordService _forgotPasswordService;
        private readonly AppraisallandsContext _context;
        Log Log=new Log();
        public ForgotPasswordController(IForgotPasswordService forgotPasswordService, AppraisallandsContext context)
        {
            _forgotPasswordService= forgotPasswordService;
            _context= context;
        }
        [HttpPost("send-reset-token")]
        public async Task<IActionResult> SendResetToken(String Email)
        {
            Log.writeLog("SendResetToken Function started");
            if (await _forgotPasswordService.SendResetTokenAsync(Email))
            {
                return Ok("Reset token sent successfully.");
            }

            return BadRequest("Failed to send reset token. User not found or an error occurred.");
        }
        [HttpPost("verify-reset-Password")]
        public async Task<IActionResult> VerifyResetPassword([FromBody] CLSForgotPassword request)
        {
            Log.writeLog("VerifyResetPassword Function started");
            var user_Details = _context.UserInformations.Where(p => p.Password == request.NewPassword && p.Email == request.Email.ToLower()).FirstOrDefault();
            if (user_Details == null)
            {
                if (await _forgotPasswordService.VerifyResetTokenAsync(request.Email, request.Token, request.NewPassword))
                {
                    return Ok("Password reset successfully.");
                }
            }
            else
            {
                return BadRequest("The new password cannot be the same as the old password.Please choose a different password.");
            }
           

            return BadRequest("Invalid or expired token. or Failed to reset the password.");
        }

    }
}
