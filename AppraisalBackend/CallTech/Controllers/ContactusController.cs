using DAL.Classes;
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
        private readonly IContactusRepository _contactusRepository;
        Log log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="contactusRepository"></param>
        public ContactusController(IContactusRepository contactusRepository)
        {
            _contactusRepository = contactusRepository;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="contactu"></param>
        /// <returns></returns>
       // [Authorize]
        [HttpPost("createContactus")]
        public async Task<IActionResult> createContactus([FromBody] ClsContactUs contactu)
        {
            log.WriteLog("CreateContactus Function started");
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                await _contactusRepository.CreateContactusAsync(contactu);

                return Ok("Contactus created successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error creating Contactus: {ex.Message}");
            }
        }
    }
}
