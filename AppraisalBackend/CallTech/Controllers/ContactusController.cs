using DAL.Classes;
using DAL.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers;

[Route("api/com.appraisalland.Contactus")]
[ApiController]
public class ContactUsController : ControllerBase
{
    private readonly IContactUsRepository _contactUsRepository;
    private readonly Log _log = new();

    public ContactUsController(IContactUsRepository contactUsRepository)
    {
        _contactUsRepository = contactUsRepository;
    }

    // [Authorize]
    [HttpPost("createcontactus")]
    public async Task<IActionResult> CreateContactUs([FromBody] ContactUsDto contactUs)
    {
        _log.writeLog("CreateContactUs Function started");
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _contactUsRepository.CreateContactUsAsync(contactUs);

            return Ok("ContactUs created successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error creating ContactUs: {ex.Message}");
        }
    }
}