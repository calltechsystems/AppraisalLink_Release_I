using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers;

[Route("api/com.appraisalland.TopUp")]
[ApiController]
public class TopUpController : ControllerBase
{
    private readonly AppraisallandsContext _AppraisallandContext;
    private readonly Log log = new();

    public TopUpController(AppraisallandsContext AppraisallandContext)
    {
        _AppraisallandContext = AppraisallandContext;
    }

    [Authorize]
    [HttpGet("getTopUp")]
    public IActionResult getTopUp()
    {
        log.WriteLog("getTopUp Function started");
        try
        {
            var topUpDetails = _AppraisallandContext.Topups.ToList();
            return Ok(topUpDetails);
        }
        catch (Exception ex)
        {
            log.WriteLog("getTopUp function" + ex.Message);
            return BadRequest(ex.Message);
        }
    }
}