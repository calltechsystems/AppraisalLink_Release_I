using DAL.Classes;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers
{
    [Route("api/com.appraisalland.Contactus")]
    [ApiController]
    public class ContactusController : ControllerBase
    {
        private readonly IContactusRepository _contactusRepository;
        Log Log = new Log();
        public ContactusController(IContactusRepository contactusRepository)
        {
            _contactusRepository= contactusRepository;
        }
       // [Authorize]
        [HttpPost("createContactus")]
        public async Task<IActionResult> createContactus([FromBody] ClsContactUs contactu)
        {
            Log.writeLog("CreateContactus Function started");
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
