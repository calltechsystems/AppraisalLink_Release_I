using DAL.Classes;
using DAL.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers;

[Route("api/com.appraisalland.Contactus")]
[ApiController]
public class ContactusController : ControllerBase
{
    private readonly IContactusRepository _contactusRepository;
    private readonly Log Log = new();

    public ContactusController(IContactusRepository contactusRepository)
    {
        _contactusRepository = contactusRepository;
    }

    // [Authorize]
    [HttpPost("createContactus")]
    public async Task<IActionResult> createContactus([FromBody] ClsContactUs contactu)
    {
        Log.WriteLog("CreateContactus Function started");
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _contactusRepository.CreateContactusAsync(contactu);

            return Ok("Contactus created successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error creating Contactus: {ex.Message}");
        }
    }
}