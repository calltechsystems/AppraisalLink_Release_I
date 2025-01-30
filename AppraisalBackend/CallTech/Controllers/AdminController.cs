using DAL.Repository;
using DAL.Rpository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers;

[Route("api/com.appraisalland.Admin")]
[ApiController]
public class AdminController : ControllerBase
{
    private readonly IAppraiserIndividual _appraiserIndividual;
    private readonly IBroker _BrokerService;
    private readonly IAdmin admin;
    private readonly Log Log = new();

    public AdminController(IBroker BrokerService, IAppraiserIndividual appraiserIndividual, IAdmin admin)
    {
        _BrokerService = BrokerService;
        _appraiserIndividual = appraiserIndividual;
        this.admin = admin;
    }

    [Authorize]
    [HttpGet]
    [Route("Broker/All")]
    public ActionResult GetAllBroker()
    {
        Log.WriteLog("GetAllBroker Function started");
        try
        {
            var Brokers = _BrokerService.AllBroker();
            if (Brokers != null)
                return Ok(Brokers);
            return NotFound();
        }
        catch (Exception ex)
        {
            Log.WriteLog("An error occurred get All Brokers" + ex);
            return StatusCode(500, new {Message = "An error occurred while Get Brokers"});
        }
    }

    [Authorize]
    [HttpGet]
    [Route("Apraiser/All")]
    public ActionResult GetAllApraiser()
    {
        Log.WriteLog("GetAllApraiser Function started");
        try
        {
            var Apraisers = _appraiserIndividual.GetAllApps();
            if (Apraisers != null)
                return Ok(Apraisers);
            return NotFound();
        }
        catch (Exception ex)
        {
            Log.WriteLog("An error occurred get All Apraisers" + ex);
            return StatusCode(500, new {Message = "An error occurred while Get Apraisers"});
        }
    }

    [Authorize]
    [HttpGet]
    [Route("Brokerage/All")]
    public ActionResult getAllBrokerage()
    {
        Log.WriteLog("getAllBrokerage Function started");
        try
        {
            var Brokerages = _appraiserIndividual.GetAllBrokerage();
            if (Brokerages != null)
                return Ok(Brokerages);
            return NotFound();
        }
        catch (Exception ex)
        {
            Log.WriteLog("An error occurred get All Brokerages" + ex);
            return StatusCode(500, new {Message = "An error occurred while Get Brokerages"});
        }
    }


    [Authorize]
    [HttpGet]
    [Route("appraiserCompany/All")]
    public ActionResult getAllappraiserCompany()
    {
        Log.WriteLog("getAllappraiserCompany Function started");
        try
        {
            var AppraiserCompany = _appraiserIndividual.GetAllAppraiserCompany();
            if (AppraiserCompany != null)
                return Ok(AppraiserCompany);
            return NotFound();
        }
        catch (Exception ex)
        {
            Log.WriteLog("An error occurred get All AppraiserCompany" + ex);
            return StatusCode(500, new {Message = "An error occurred while Get AppraiserCompany"});
        }
    }

    [Authorize]
    [HttpPut]
    [Route("updatePlan")]
    public ActionResult updatePlan(int planID, int numberOfProperty, double amount)
    {
        if (numberOfProperty != 0 || amount != 0)
        {
            var plan = _appraiserIndividual.UpdatePlan(planID, numberOfProperty, amount);
            if (plan.Result != null)
                return Ok("Plan Update successfully");
            return NotFound();
        }

        return BadRequest("Both numberOfProperty and amount cannot be 0.");
    }

    [Authorize]
    [Route("getAllBrokerpropeties")]
    [HttpGet]
    public ActionResult getAllBrokerpropeties()
    {
        var properties = _appraiserIndividual.GetAllProperties();
        return Ok(properties);
    }

    //GetAllbrokerageProperies
    [Authorize]
    [HttpGet]
    [Route("getAllbrokerageProperies")]
    public ActionResult getAllbrokerageProperies()
    {
        var properties = _appraiserIndividual.GetAllbrokerageProperies();
        return Ok(properties);
    }

    [Authorize]
    [HttpGet]
    [Route("getAllAppraiserCompany")]
    public ActionResult getAllAppraiserCompany()
    {
        var appraiser_Company = _appraiserIndividual.GetAllAppraiserCompany();
        return Ok(appraiser_Company);
    }

    [Authorize]
    [HttpPost]
    [Route("archiveUser")]
    public ActionResult archiveUser(int userId)
    {
        try
        {
            var user = admin.PostArchiveUser(userId);
            if (user != null) return Ok("User archived successfully.");
            return NotFound("User not found according to this user ID.");
        }
        catch (Exception ex)
        {
            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    [Authorize]
    [HttpPost]
    [Route("archiveProperty")]
    public ActionResult archiveProperty(int orderId)
    {
        try
        {
            var user = admin.PostArchiveProperty(orderId);
            if (user != null) return Ok("Property archived successfully.");
            return NotFound("Property not found according to this user ID.");
        }
        catch (Exception ex)
        {
            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    [Authorize]
    [HttpGet]
    [Route("getArchiveProperty")]
    public ActionResult getArchiveProperty()
    {
        var properties = admin.GetAllArchivedProperty();
        return Ok(properties);
    }

    [Authorize]
    [HttpGet]
    [Route("getArchiveUser")]
    public ActionResult getArchiveUser()
    {
        var Users = admin.GetAllArchiveUser();
        return Ok(Users);
    }
}