using AppraisalLand.Helper;
using DAL.Classes;
using AppraisalLand.Common.Enums;
using DAL.Repository;
using Microsoft.AspNetCore.Mvc;

namespace AppraisalLand.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.Contactus")]
    [ApiController]
    public class ContactusController : ControllerBase
    {
        private readonly IContactusRepository _contactUsRepository;
        private NotificationHelper _smtpEmailService;
        private IEmailSmsNotification _emailSmsNotification;
        Log log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="contactUsRepository"></param>
        public ContactusController(IContactusRepository contactUsRepository, IEmailSmsNotification emailSmsNotification, NotificationHelper smtpEmailService)
        {
            _contactUsRepository = contactUsRepository;
            _emailSmsNotification= emailSmsNotification;
            _smtpEmailService= smtpEmailService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="contactU"></param>
        /// <returns></returns>
       // [Authorize]
        [HttpPost("createContactus")]
        public async Task<IActionResult> createContactus([FromBody] ClsContactUs contactU)
        {
            log.WriteLog("CreateContactus Function started");
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                await _contactUsRepository.CreateContactusAsync(contactU);
                
                List<string> emailIds = new List<string>();
                emailIds.Add(contactU.EmailAddress);
                
                var notificationDetail = await _emailSmsNotification.getEmailSmsBody((int)MessageCode.ThankYouforContactingUs);
                if (notificationDetail != null)
                {
                    Task.Run(async () => await _smtpEmailService.SendEmailToUser(emailIds, "Common", "0", notificationDetail.EmailContent, notificationDetail.TriggerPoint));
                }

                return Ok("Contactus created successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error creating Contactus: {ex.Message}");
            }
        }
    }
}
