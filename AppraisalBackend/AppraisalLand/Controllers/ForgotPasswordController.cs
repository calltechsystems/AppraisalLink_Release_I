using DAL.Classes;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppraisalLand.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.ForgotPassword")]
    [ApiController]
    public class ForgotPasswordController : ControllerBase
    {
        private readonly IForgotPasswordService _forgotPasswordService;
        private readonly AppraisallandsContext _context;
        Log Log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="forgotPasswordService"></param>
        /// <param name="context"></param>
        public ForgotPasswordController(IForgotPasswordService forgotPasswordService, AppraisallandsContext context)
        {
            _forgotPasswordService = forgotPasswordService;
            _context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Email"></param>
        /// <returns></returns>
        [HttpPost("send-reset-token")]
        public async Task<IActionResult> SendResetToken(String Email)
        {
            Log.WriteLog("SendResetToken Function started");
            if (await _forgotPasswordService.SendResetTokenAsync(Email))
            {
                return Ok("Reset token sent successfully.");
            }

            return BadRequest("Failed to send reset token. User not found or an error occurred.");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("verify-reset-Password")]
        public async Task<IActionResult> VerifyResetPassword([FromBody] CLSForgotPassword request)
        {
            Log.WriteLog("VerifyResetPassword Function started");
            var userDetail = _context.UserInformations.Where(p => p.Password == request.NewPassword && p.Email == request.Email.ToLower()).FirstOrDefault();
            if (userDetail == null)
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
