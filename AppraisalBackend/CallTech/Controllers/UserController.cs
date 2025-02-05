using DAL.Repository;
using DAL.Rpository;
using DBL.Models;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers;

[Route("api/com.appraisalland.User")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IAppraiserCompany _appraiserCompany;
    private readonly IAppraiserIndividual _appraiserIndividual;
    private readonly IBroker _broker;
    private readonly IBrokerage _brokerage;
    private readonly AppraisalLandsContext _context;
    private readonly Log log = new();

    public UserController(AppraisalLandsContext context, IBroker broker, IBrokerage brokerage,
        IAppraiserIndividual appraiserIndividual, IAppraiserCompany appraiserCompany)
    {
        _context = context;
        _broker = broker;
        _brokerage = brokerage;
        _appraiserIndividual = appraiserIndividual;
        _appraiserCompany = appraiserCompany;
    }

    // [Authorize]
    [HttpGet("UserProfile")]
    public async Task<IActionResult> getUserDetails(int UserId)
    {
        log.writeLog("getUserDetails Function starting");
        try
        {
            var User = _context.UserInformations.Where(x => x.UserId == UserId).FirstOrDefault();
            if (User != null)
            {
                var UserType = User.UserType;

                switch (UserType)
                {
                    case 1:
                        var Broker = _broker.GetBrokerByUserId(UserId);
                        if (Broker != null) return Ok(Broker);
                        break;
                    case 2:
                        var Brokerage = _brokerage.GetBrokerageByUserId(UserId);
                        if (Brokerage != null) return Ok(Brokerage);
                        break;
                    case 3:

                        var Appraiser = _appraiserIndividual.GetAppraiserByUserId(UserId);
                        if (Appraiser != null) return Ok(new { Appraiser });
                        break;
                    case 4:
                        var AppraiserCompany = _appraiserCompany.GetAppraisersCompany(UserId);
                        if (AppraiserCompany != null) return Ok(new { AppraiserCompany });
                        break;
                    case 5:
                        var AppraiserByCompany = _appraiserIndividual.GetAppraiserByUserId(UserId);
                        if (AppraiserByCompany != null) return Ok(new { AppraiserByCompany });
                        break;
                    case 6:
                        var BrokerByBrokerageCompany = _broker.GetBrokerByUserId(UserId);
                        if (BrokerByBrokerageCompany != null) return Ok(new { BrokerByBrokerageCompany });
                        break;
                }
            }
            else
            {
                return NotFound($"User not found with UserID {UserId}");
            }
        }
        catch (Exception ex)
        {
            log.writeLog("GetBrokerById Function " + ex);
            return BadRequest(ex.Message);
        }

        return BadRequest("Invalid user type or user profile.");
    }
}