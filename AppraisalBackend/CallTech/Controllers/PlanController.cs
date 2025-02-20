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
        private readonly AppraisallandsContext _AppraisallandContext;
        Log Log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="plans"></param>
        /// <param name="AppraisallandContext"></param>
        public PlanController(IPlans plans, AppraisallandsContext AppraisallandContext)
        {
            _planRepository = plans;
            _AppraisallandContext = AppraisallandContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("GetAllPlans")]
        public async Task<ActionResult<List<Plan>>> GetAllPlans()
        {
            Log.WriteLog("GetAllPlans Function started");
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
            Log.WriteLog("GetPlanById Function started");
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
        /// <param name="PlanID"></param>
        /// <param name="plan"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("UpdatePlan")]
        public async Task<ActionResult<Plan>> UpdatePlan(int PlanID, [FromBody] PlanClass plan)
        {
            Log.WriteLog("UpdatePlan Function started");
            try
            {
                var UpdatePlan = _planRepository.UpdatePlan(PlanID, plan);
                if (UpdatePlan != null)
                {
                    return Ok(new { Message = $"Plan with ID {PlanID} updated successfully", Plan = UpdatePlan });
                }
                else
                {
                    return NotFound($"Plan not found with ID {PlanID} or update failed");
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog("UpdatePlan" + ex);
                return BadRequest("An error occurred during the update process" + ex.Message);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user_type"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getTopUpPlan")]
        public IActionResult getTopUpPlan(int user_type)
        {
            var topUp_Details = _AppraisallandContext.Topups.Where(x => x.UserType == user_type).ToList();
            if (topUp_Details != null)
            {
                return Ok(topUp_Details);
            }
            else
            {
                return NotFound();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user_type"></param>
        /// <returns></returns>
        [HttpGet("getPlan")]
        public IActionResult getPlan(int user_type)
        {
            var Plan_Details = _AppraisallandContext.Plans.Where(x => x.UserType == user_type).ToList();
            if (Plan_Details != null)
            {
                return Ok(Plan_Details);
            }
            else
            {
                return NotFound();
            }
        }
    }
}