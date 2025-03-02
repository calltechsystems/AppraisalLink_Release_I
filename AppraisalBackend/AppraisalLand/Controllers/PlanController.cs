using DAL.Classes;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppraisalLand.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.Plan")]
    [ApiController]
    public class PlanController : ControllerBase
    {
        private readonly IPlans _planRepository;
        private readonly AppraisallandsContext _appraisallandContext;
        Log log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="plans"></param>
        /// <param name="appraisallandContext"></param>
        public PlanController(IPlans plans, AppraisallandsContext appraisallandContext)
        {
            _planRepository = plans;
            _appraisallandContext = appraisallandContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("GetAllPlans")]
        public async Task<ActionResult<List<Plan>>> GetAllPlans()
        {
            log.WriteLog("GetAllPlans Function started");
            var plans = await _planRepository.GetAllPlans();
            return Ok(plans);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("GetPlanById")]
        public async Task<ActionResult<Plan>> GetPlanById(int id)
        {
            log.WriteLog("GetPlanById Function started");
            var plan = await _planRepository.GetPlanById(id);
            if (plan == null)
            {
                return NotFound();
            }

            return Ok(plan);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="planId"></param>
        /// <param name="plan"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("UpdatePlan")]
        public async Task<ActionResult<Plan>> UpdatePlan(int planId, [FromBody] PlanClass plan)
        {
            log.WriteLog("UpdatePlan Function started");
            try
            {
                var updatePlan = _planRepository.UpdatePlan(planId, plan);
                if (updatePlan != null)
                {
                    return Ok(new { Message = $"Plan with ID {planId} updated successfully", Plan = updatePlan });
                }
                else
                {
                    return NotFound($"Plan not found with ID {planId} or update failed");
                }
            }
            catch (Exception ex)
            {
                log.WriteLog("UpdatePlan" + ex);
                return BadRequest("An error occurred during the update process" + ex.Message);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userType"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getTopUpPlan")]
        public IActionResult getTopUpPlan(int userType)
        {
            var topUpDetails = _appraisallandContext.Topups.Where(x => x.UserType == userType).ToList();
            if (topUpDetails != null)
            {
                return Ok(topUpDetails);
            }
            else
            {
                return NotFound();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userType"></param>
        /// <returns></returns>
        [HttpGet("getPlan")]
        public IActionResult getPlan(int userType)
        {
            var planDetails = _appraisallandContext.Plans.Where(x => x.UserType == userType).ToList();
            if (planDetails != null)
            {
                return Ok(planDetails);
            }
            else
            {
                return NotFound();
            }
        }
    }
}