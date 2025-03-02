using AppraisalLand.Helper;
using DAL.Classes;
using DAL.Common.Enums;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppraisalLand.Controllers
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
        private NotificationHelper _smtpEmailService;
        private IEmailSmsNotification _emailSmsNotification;
        private readonly AppraisallandsContext _context;
        Log log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraiserIndividual"></param>
        /// <param name="registrationService"></param>
        /// <param name="context"></param>
        public AppraiserIndividualController(IAppraiserIndividual appraiserIndividual, IRegistrationService registrationService, AppraisallandsContext context, IEmailSmsNotification emailSmsNotification, NotificationHelper smtpEmailService)
        {
            _appraiserIndividual = appraiserIndividual;
            _registrationService = registrationService;
            _context = context;
            _emailSmsNotification= emailSmsNotification;
            _smtpEmailService= smtpEmailService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraiserId"></param>
        /// <param name="updateRequest"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("updateAppraiserProfile")]
        public async Task<IActionResult> updateAppraiserProfile(int appraiserId, [FromBody] ClsAppraiserIndividual updateRequest)
        {
            log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->updateAppraiserProfile Method: Started");
            try
            {
                var updatedAppraiserIndividual = await _appraiserIndividual.UpdateAppraiserIndividualAsync(appraiserId, updateRequest);

                if (updatedAppraiserIndividual == null)
                {
                    log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->updateAppraiserProfile Method: End");
                    return NotFound($"Appraiser not found with ID {appraiserId} or update failed");
                }
                var getSMS = updateRequest.GetSms;
                var getEmail = updateRequest.GetEmail;

                var userDetail = _context.UserInformations.Where(x => x.UserId == appraiserId).FirstOrDefault();
                if (userDetail != null)
                {
                    userDetail.GetEmail = getEmail;
                    userDetail.GetSms = getSMS;
                    _context.UserInformations.Update(userDetail);
                    _context.SaveChanges();
                }
                var appraiserDetail = _context.UserInformations.Where(x => x.UserId == appraiserId).FirstOrDefault();
                List<string> emailIds = new List<string>();
                emailIds.Add(userDetail.Email);
                var notificationDetails = await _emailSmsNotification.getEmailSmsBody((int)MessageCode.ProfileUpdate);
                if (notificationDetails != null)
                {
                    Task.Run(async () => await _smtpEmailService.SendEmailToUser(emailIds, "Common", "0", notificationDetails.EmailContent, notificationDetails.TriggerPoint));
                }
                return Ok(new { Message = $"Appraiser with ID {appraiserId} updated successfully", Appraiser = updatedAppraiserIndividual, IsEmail = appraiserDetail.GetEmail, IsSms = appraiserDetail.GetSms });
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

                var assignProperties = _context.AssignProperties.Where(x => x.AppraiserId == appraiserId && x.IsSelfAssigned == true).ToList();
                var groupedAssignments = assignProperties.GroupBy(a => a.AppraiserId);

                var propertyIds = assignProperties.Select(a => a.PropertyId).Distinct().ToList();

                foreach (var propertyId in propertyIds)
                {
                    var propertyDetail = _context.Properties.Where(x => x.PropertyId == propertyId).FirstOrDefault();
                    if (propertyDetail != null)
                    {
                        properties.Add(propertyDetail);
                    }
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
        /// <param name="userId"></param>
        /// <param name="isActive"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("updateApprasierStatus")]
        public IActionResult updateApprasierStatus(long userId, bool isActive)
        {
            log.WriteLog($"ApprisalLandAppError: AppraiserIndividualController->updateApprasierStatus Method: Start");
            try
            {
                var appraiser = _appraiserIndividual.IsActive(userId, isActive);
                if (appraiser)
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
                var appraisers = _appraiserIndividual.getAppraiser(companyId);
                if (appraisers != null)
                {
                    var itemsWithUserInfo = appraisers
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