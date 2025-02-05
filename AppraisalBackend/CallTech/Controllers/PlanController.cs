using DAL.Classes;
using DAL.Rpository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
//using DBL.NewModels;
//using DBL.Models;

namespace CallTech.Controllers;

[Route("api/com.appraisalland.Plan")]
[ApiController]
public class PlanController : ControllerBase
{
    private readonly AppraisalLandsContext _AppraisallandContext;
    private readonly IPlans _planRepository;
    private readonly Log Log = new();

    public PlanController(IPlans plans, AppraisalLandsContext AppraisallandContext)
    {
        _planRepository = plans;
        _AppraisallandContext = AppraisallandContext;
    }

    [AllowAnonymous]
    [HttpGet("GetAllPlans")]
    public async Task<ActionResult<List<Plan>>> GetAllPlans()
    {
        Log.writeLog("GetAllPlans Function started");
        var plans = await _planRepository.GetAllPlans();
        return Ok(plans);
    }

    [AllowAnonymous]
    [HttpGet("GetPlanById")]
    public async Task<ActionResult<Plan>> GetPlanById(int id)
    {
        Log.writeLog("GetPlanById Function started");
        var plan = await _planRepository.GetPlanById(id);
        if (plan == null) return NotFound();

        return Ok(plan);
    }

    [Authorize]
    [HttpPut("UpdatePlan")]
    public async Task<ActionResult<Plan>> UpdatePlan(int PlanID, [FromBody] PlanClass plan)
    {
        Log.writeLog("UpdatePlan Function started");
        try
        {
            var UpdatePlan = _planRepository.UpdatePlan(PlanID, plan);
            if (UpdatePlan != null)
                return Ok(new { Message = $"Plan with ID {PlanID} updated successfully", Plan = UpdatePlan });
            return NotFound($"Plan not found with ID {PlanID} or update failed");
        }
        catch (Exception ex)
        {
            Log.writeLog("UpdatePlan" + ex);
            return BadRequest("An error occurred during the update process" + ex.Message);
        }
    }

    [Authorize]
    [HttpGet("getTopUpPlan")]
    public IActionResult getTopUpPlan(int user_type)
    {
        var topUp_Details = _AppraisallandContext.Topups.Where(x => x.UserType == user_type).ToList();
        if (topUp_Details != null)
            return Ok(topUp_Details);
        return NotFound();
    }

    [HttpGet("getPlan")]
    public IActionResult getPlan(int user_type)
    {
        var Plan_Details = _AppraisallandContext.Plans.Where(x => x.UserType == user_type).ToList();
        if (Plan_Details != null)
            return Ok(Plan_Details);
        return NotFound();
    }
}