using DAL.Classes;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.AppraiserIndividual")]
    [ApiController]
    public class AppraiserIndividualController : ControllerBase
    {
        private readonly IRegistrationService _registrationService;
        private readonly IAppraiserIndividual _appraiserIndividual;
        private readonly AppraisallandsContext _context;
        Log log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="AppraiserIndividual"></param>
        /// <param name="registrationService"></param>
        /// <param name="context"></param>
        public AppraiserIndividualController(IAppraiserIndividual AppraiserIndividual, IRegistrationService registrationService, AppraisallandsContext context)
        {
            _appraiserIndividual = AppraiserIndividual;
            _registrationService = registrationService;
            _context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="AppraiserId"></param>
        /// <param name="updateRequest"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("updateAppraiserProfile")]
        public async Task<IActionResult> updateAppraiserProfile(int AppraiserId, [FromBody] ClsAppraiserIndividual updateRequest)
        {
            log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->updateAppraiserProfile Method: Started");
            try
            {
                var updatedAppraiserIndividual = await _appraiserIndividual.UpdateAppraiserIndividualAsync(AppraiserId, updateRequest);

                if (updatedAppraiserIndividual == null)
                {
                    log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->updateAppraiserProfile Method: End");
                    return NotFound($"Appraiser not found with ID {AppraiserId} or update failed");
                }
                var get_SMS = updateRequest.GetSms;
                var get_Email = updateRequest.GetEmail;

                var user = _context.UserInformations.Where(x => x.UserId == AppraiserId).FirstOrDefault();
                if (user != null)
                {
                    user.GetEmail = get_Email;
                    user.GetSms = get_SMS;
                    _context.UserInformations.Update(user);
                    _context.SaveChanges();
                }

                var Appraiser_Details = _context.UserInformations.Where(x => x.UserId == AppraiserId).FirstOrDefault();
                log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->updateAppraiserProfile Method: End");
                return Ok(new { Message = $"Appraiser with ID {AppraiserId} updated successfully", Appraiser = updatedAppraiserIndividual, IsEmail = Appraiser_Details.GetEmail, IsSms = Appraiser_Details.GetSms });
            }
            catch (Exception ex)
            {
                log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->updateAppraiserProfile Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while Update Apraiser Profile" });
            }
        }

        //[Authorize]
        //[HttpGet("Appraiser/AppraiserId")]
        //public  IActionResult GetByOrderId(long AppraiserId)
        //{
        //    try
        //    {
        //        var Appraiser =  _appraiserIndividual.GetAppraiser(AppraiserId);
        //        if (Appraiser == null)
        //        {
        //            return NotFound($"AppraiserId with AppraiserId {AppraiserId} not found");
        //        }
        //        return Ok(new { Appraiser });
        //    }
        //    catch (Exception EX)
        //    {
        //        log.writeLog("An error occurred ,found Appraiser By AppraiserId ." + EX);
        //        return StatusCode(500, new { Message = "An error occurred while processing your request" });

        //    }
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraiserId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getPropertiesById")]
        public IActionResult getPropertiesById(long appraiserId)
        {
            log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->getPropertiesById Method: Start");
            try
            {
                List<Property> properties = new List<Property>();

                var AssignProperties = _context.AssignProperties.Where(x => x.Appraiserid == appraiserId && x.IsSelfAssigned == true).ToList();
                var groupedAssignments = AssignProperties.GroupBy(a => a.Appraiserid);

                var propertyIds = AssignProperties.Select(a => a.Propertyid).Distinct().ToList();

                foreach (var propiD in propertyIds)
                {
                    var property = _context.Properties.Where(x => x.PropertyId == propiD).FirstOrDefault();
                    properties.Add(property);
                }

                log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->getPropertiesById Method: End");
                return Ok(new { AppraiserId = appraiserId, properties = properties });
            }
            catch (Exception ex)
            {
                log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->getPropertiesById Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while getting property" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Userid"></param>
        /// <param name="IsActive"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("updateApprasierStatus")]
        public IActionResult updateApprasierStatus(long Userid, bool IsActive)
        {
            log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->updateApprasierStatus Method: Start");
            try
            {
                var Appraiser = _appraiserIndividual.IsActive(Userid, IsActive);
                if (Appraiser)
                {
                    log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->updateApprasierStatus Method: End");
                    return Ok(new { Message = "Appraiser status updated successfully" });
                }
                else
                {
                    log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->updateApprasierStatus Method: End");
                    return BadRequest(new { Message = "Appraiser not found or unable to update status" });
                }
            }
            catch (Exception ex)
            {
                log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->updateApprasierStatus Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while update Apprasier Status" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getAssignedAppraiserbyAppraiserCompany")]
        public IActionResult getAssignedAppraiserbyAppraiserCompanyId(long companyId)
        {
            log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->getAssignedAppraiserbyAppraiserCompanyId Method: Start");
            try
            {
                var apptaisers = _appraiserIndividual.getAppraiser(companyId);
                if (apptaisers != null)
                {
                    var itemsWithUserInfo = apptaisers
                                           .Join(_context.UserInformations,
                                            item => item.UserId,
                                            userInfo => userInfo.UserId,
                                            (item, userInfo) => new
                                            {
                                                Item = item,
                                                UserInfo = userInfo.Email
                                            })
                                              .ToList();

                    log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->getAssignedAppraiserbyAppraiserCompanyId Method: End");
                    return Ok(itemsWithUserInfo);
                }
                else
                {
                    log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->getAssignedAppraiserbyAppraiserCompanyId Method: End");
                    return NotFound($"No Appraiser Company Found with Id{companyId}");
                }
            }
            catch (Exception ex)
            {
                log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->getAssignedAppraiserbyAppraiserCompanyId Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while getting properties" });
            }
        }
    }
}