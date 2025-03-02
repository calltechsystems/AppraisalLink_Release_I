using DAL.Classes;
using DAL.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppraisalLand.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.SMPT")]
    [ApiController]
    public class SMPTController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly ITwilioSms _twilioSms;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="emailService"></param>
        /// <param name="twilioSms"></param>
        public SMPTController(IEmailService emailService, ITwilioSms twilioSms)
        {
            _emailService = emailService;
            _twilioSms = twilioSms;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpPost("send")]
        public IActionResult SendVerificationEmail(EmailClass email)
        {
            try
            {
                bool isEmailSent = _emailService.Email(email);

                if (isEmailSent)
                {
                    return Ok("Email sent successfully!");
                }
                else
                {
                    return BadRequest("Failed to send email. Please try again.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public IActionResult SendSms([FromBody] SmsRequest request)
        {
            var toPhoneNumber = request.ToPhoneNumber;
            var message = request.Message;
            var status = _twilioSms.SendSms(toPhoneNumber, message);
            if (status != null)
            {
                return Ok(new { Status = "Success", Message = $"SMS sent successfully! SMS ID: {status}" });
            }
            else
            {
                return BadRequest(new { Status = "Failure", Message = "Failed to send SMS." });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        public class SmsRequest
        {
            public string ToPhoneNumber { get; set; }
            public string Message { get; set; }
        }
    }
}