using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppraisalLand.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        Log log = new Log();
        private readonly IBroker _broker;
        private readonly IBrokerage _brokerage;
        private readonly IAppraiserCompany _appraiserCompany;
        private readonly IAppraiserIndividual _appraiserIndividual;
        private readonly AppraisallandsContext _context;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="broker"></param>
        /// <param name="brokerage"></param>
        /// <param name="appraiserIndividual"></param>
        /// <param name="appraiserCompany"></param>
        public UserController(AppraisallandsContext context, IBroker broker, IBrokerage brokerage, IAppraiserIndividual appraiserIndividual, IAppraiserCompany appraiserCompany)
        {
            _context = context;
            _broker = broker;
            _brokerage = brokerage;
            _appraiserIndividual = appraiserIndividual;
            _appraiserCompany = appraiserCompany;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("UserProfile")]
        public async Task<IActionResult> getUserDetails(int userId)
        {
            log.WriteLog("getUserDetails Function starting");
            try
            {
                var userDetail = _context.UserInformations.Where(x => x.UserId == userId).FirstOrDefault();
                if (userDetail != null)
                {
                    var UserType = userDetail.UserType;

                    switch (UserType)
                    {
                        case 1:
                            var broker = _broker.GetBrokerByUserId(userId);
                            if (broker != null)
                            {
                                return Ok(broker);
                            }
                            break;
                        case 2:
                            var brokerage = _brokerage.GetBrokerageByUserId(userId);
                            if (brokerage != null)
                            {
                                return Ok(brokerage);
                            }
                            break;
                        case 3:

                            var appraiser = _appraiserIndividual.GetAppraiserByUserId(userId);
                            if (appraiser != null)
                            {
                                return Ok(new { appraiser });
                            }
                            break;
                        case 4:
                            var appraiserCompany = _appraiserCompany.GetAppraisersCompany(userId);
                            if (appraiserCompany != null)
                            {
                                return Ok(new { appraiserCompany });
                            }
                            break;
                        case 5:
                            var subAppraiserByCompany = _appraiserIndividual.GetAppraiserByUserId(userId);
                            if (subAppraiserByCompany != null)
                            {
                                return Ok(new { subAppraiserByCompany });
                            }
                            break;
                        case 6:
                            var subBrokerByBrokerageCompany = _broker.GetBrokerByUserId(userId);
                            if (subBrokerByBrokerageCompany != null)
                            {
                                return Ok(new { subBrokerByBrokerageCompany });
                            }
                            break;
                        default:

                            break;
                    }
                }
                else
                {
                    return NotFound($"User not found with UserID {userId}");
                }
            }
            catch (Exception ex)
            {
                log.WriteLog("GetBrokerById Function " + ex);
                return BadRequest(ex.Message);
            }
            return BadRequest("Invalid user type or user profile.");
        }
    }
}