using DAL.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppraisalLand.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.Admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdmin admin;
        private readonly IBroker _BrokerService;
        private readonly IAppraiserIndividual _appraiserIndividual;
        Log Log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="BrokerService"></param>
        /// <param name="appraiserIndividual"></param>
        /// <param name="admin"></param>
        public AdminController(IBroker BrokerService, IAppraiserIndividual appraiserIndividual, IAdmin admin)
        {
            _BrokerService = BrokerService;
            _appraiserIndividual = appraiserIndividual;
            this.admin = admin;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
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
                {
                    return Ok(Brokers);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {

                Log.WriteLog($"ApprisalLandAppError: AdminController->GetAllBroker Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while Get Brokers" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("Apraiser/All")]
        public ActionResult GetAllApraiser()
        {
            Log.WriteLog($"ApprisalLandAppError: AdminController->GetAllApraiser Method: Function Started");
            try
            {
                var Apraisers = _appraiserIndividual.GetAllApps();
                if (Apraisers != null)
                {
                    return Ok(Apraisers);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog($"ApprisalLandAppError: AdminController->GetAllApraiser Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while Get Apraisers" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("Brokerage/All")]
        public ActionResult getAllBrokerage()
        {
            Log.WriteLog($"ApprisalLandAppError: AdminController->getAllBrokerage Method: Started");
            try
            {
                var Brokerages = _appraiserIndividual.GetAllBrokerage();
                if (Brokerages != null)
                {
                    Log.WriteLog($"ApprisalLandAppError: AdminController->getAllBrokerage Method: END");
                    return Ok(Brokerages);
                }
                else
                {
                    Log.WriteLog($"ApprisalLandAppError: AdminController->getAllBrokerage Method: END");
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog($"ApprisalLandAppError: AdminController->getAllBrokerage Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while Get Brokerages" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("appraiserCompany/All")]
        public ActionResult getAllappraiserCompany()
        {
            Log.WriteLog($"ApprisalLandAppError: AdminController->getAllappraiserCompany Method: Start");
            try
            {
                var AppraiserCompany = _appraiserIndividual.GetAllAppraiserCompany();
                if (AppraiserCompany != null)
                {
                    Log.WriteLog($"ApprisalLandAppError: AdminController->getAllappraiserCompany Method: End");
                    return Ok(AppraiserCompany);
                }
                else
                {
                    Log.WriteLog($"ApprisalLandAppError: AdminController->getAllappraiserCompany Method: End");
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog($"ApprisalLandAppError: AdminController->getAllappraiserCompany Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while Get AppraiserCompany" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="planID"></param>
        /// <param name="numberOfProperty"></param>
        /// <param name="amount"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut]
        [Route("updatePlan")]
        public ActionResult updatePlan(int planID, int numberOfProperty, double amount)
        {
            Log.WriteLog($"ApprisalLandAppError: AdminController->updatePlan Method: Start");
            try
            {
                if (numberOfProperty != 0 || amount != 0)
                {
                    var plan = _appraiserIndividual.UpdatePlan(planID, numberOfProperty, amount);
                    if (plan.Result != null)
                    {
                        Log.WriteLog($"ApprisalLandAppError: AdminController->updatePlan Method: End");
                        return Ok("Plan Update successfully");
                    }
                    else
                    {
                        Log.WriteLog($"ApprisalLandAppError: AdminController->updatePlan Method: End");
                        return NotFound();
                    }
                }
                else
                {
                    Log.WriteLog($"ApprisalLandAppError: AdminController->updatePlan Method: End");
                    return BadRequest("Both numberOfProperty and amount cannot be 0.");
                }
            }
            catch (Exception ex)
            {
                Log.WriteLog($"ApprisalLandAppError: AdminController->updatePlan Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while update Plan" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [Route("getAllBrokerpropeties")]
        [HttpGet]
        public ActionResult getAllBrokerpropeties()
        {
            try
            {
                var properties = _appraiserIndividual.GetAllProperties();
                return Ok(properties);
            }
            catch (Exception ex)
            {
                Log.WriteLog($"ApprisalLandAppError: AdminController->getAllBrokerpropeties Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while get All Broker propeties" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("getAllbrokerageProperies")]
        public ActionResult getAllbrokerageProperies()
        {
            try
            {
                var properties = _appraiserIndividual.GetAllbrokerageProperies();
                return Ok(properties);
            }
            catch (Exception ex)
            {
                Log.WriteLog($"ApprisalLandAppError: AdminController->getAllbrokerageProperies Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while get All Brokerage propeties" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("getAllAppraiserCompany")]
        public ActionResult getAllAppraiserCompany()
        {
            try
            {
                var appraiser_Company = _appraiserIndividual.GetAllAppraiserCompany();
                return Ok(appraiser_Company);
            }
            catch (Exception ex)
            {
                Log.WriteLog($"ApprisalLandAppError: AdminController->getAllAppraiserCompany Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while get All Appraiser Company" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("archiveUser")]
        public ActionResult archiveUser(int userId)
        {
            try
            {
                var user = admin.PostArchiveUser(userId);
                if (user != null)
                {
                    return Ok("User archived successfully.");
                }

                return NotFound("User not found according to this user ID.");
            }
            catch (Exception ex)
            {
                Log.WriteLog($"ApprisalLandAppError: AdminController->archiveUser Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while archive User" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("archiveProperty")]
        public ActionResult archiveProperty(int orderId)
        {
            try
            {
                var user = admin.PostArchiveProperty(orderId);
                if (user != null)
                {
                    return Ok("Property archived successfully.");
                }

                return NotFound("Property not found according to this user ID.");
            }
            catch (Exception ex)
            {
                Log.WriteLog($"ApprisalLandAppError: AdminController->archiveProperty Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while archive Property" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("getArchiveProperty")]
        public ActionResult getArchiveProperty()
        {
            try
            {
                var properties = admin.GetAllArchivedProperty();
                return Ok(properties);
            }
            catch (Exception ex)
            {
                Log.WriteLog($"ApprisalLandAppError: AdminController->GetAllArchivedProperty Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while Get All archive Property" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("getArchiveUser")]
        public ActionResult getArchiveUser()
        {
            try
            {
                var Users = admin.GetAllArchiveUser();
                return Ok(Users);
            }
            catch (Exception ex)
            {
                Log.WriteLog($"ApprisalLandAppError: AdminController->getArchiveUser Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while Get Archive User" });
            }
        }
    }
}