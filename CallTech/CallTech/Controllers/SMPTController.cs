using DAL.Classes;
using DAL.Repository;
using DAL.Rpository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;

namespace CallTech.Controllers
{
    [Route("api/com.appraisalland.SMPT")]
    [ApiController]
    public class SMPTController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly ITwilioSms _twilioSms;
        public SMPTController(IEmailService emailService, ITwilioSms twilioSms)
        {
            _emailService=emailService;
            _twilioSms=twilioSms;
        }
        [HttpPost("send")]
        public IActionResult SendVerificationEmail(EmailClass emailClass)
        {
            try
            {
                bool isEmailSent = _emailService.Email(emailClass);

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

        [Authorize]
        [HttpPost]
        public IActionResult SendSms([FromBody] SmsRequest request)
        {
            
            var toPhoneNumber = request.ToPhoneNumber;
            var message = request.Message;         
            var status= _twilioSms.SendSms(toPhoneNumber, message);
            if (status!=null)
            {
                return Ok(new { Status = "Success", Message = $"SMS sent successfully! SMS ID: {status}" });
            }
            else
            {
                return BadRequest(new { Status = "Failure", Message = "Failed to send SMS." });
            }
        }
        public class SmsRequest
        {
            public string ToPhoneNumber { get; set; }
            public string Message { get; set; }
        }
    }
}
