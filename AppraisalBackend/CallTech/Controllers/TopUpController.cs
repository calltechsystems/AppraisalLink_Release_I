using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace CallTech.Controllers
{
    [Route("api/com.appraisalland.TopUp")]
    [ApiController]
    public class TopUpController : ControllerBase
    {
        private readonly AppraisallandsContext _AppraisallandContext;
        Log log = new Log();

        public TopUpController(AppraisallandsContext AppraisallandContext)
        {
            _AppraisallandContext= AppraisallandContext;
        }
        [Authorize]
        [HttpGet("getTopUp")]
        public IActionResult getTopUp() 
        {
            log.writeLog("getTopUp Function started");
            try
            {

                var topUpDetails = _AppraisallandContext.Topups.ToList();
                return Ok(topUpDetails);
            }
            catch (Exception ex)
            {
                log.writeLog("getTopUp function" + ex.Message);
                return BadRequest(ex.Message);
            }
          
        }
    }
}
