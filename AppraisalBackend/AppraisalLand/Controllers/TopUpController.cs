using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppraisalLand.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.TopUp")]
    [ApiController]
    public class TopUpController : ControllerBase
    {
        private readonly AppraisallandsContext _appraisallandContext;
        Log log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraisallandContext"></param>
        public TopUpController(AppraisallandsContext appraisallandContext)
        {
            _appraisallandContext = appraisallandContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getTopUp")]
        public IActionResult getTopUp()
        {
            log.WriteLog("getTopUp Function started");
            try
            {
                var topUpDetails = _appraisallandContext.Topups.ToList();
                return Ok(topUpDetails);
            }
            catch (Exception ex)
            {
                log.WriteLog("getTopUp function" + ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}