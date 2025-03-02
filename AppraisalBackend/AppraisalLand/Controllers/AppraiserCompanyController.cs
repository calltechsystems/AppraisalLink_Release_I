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
    [Route("api/com.appraisalland.AppraiserCompany")]
    [ApiController]
    public class AppraiserCompanyController : ControllerBase
    {
        private readonly IAppraiserCompany _appraiserCompany;
        private readonly AppraisallandsContext _appraisallandContext;
        private NotificationHelper _smtpEmailService;
        private IEmailSmsNotification _emailSmsNotification;

        Log log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraiserCompany"></param>
        /// <param name="appraisallandContext"></param>
        /// <param name="smtpEmailService"></param>
        /// <param name="emailSmsNotification"></param>
        public AppraiserCompanyController(IAppraiserCompany appraiserCompany, AppraisallandsContext appraisallandContext, NotificationHelper smtpEmailService, IEmailSmsNotification emailSmsNotification)
        {
            _appraiserCompany = appraiserCompany;
            _appraisallandContext = appraisallandContext;
            _smtpEmailService = smtpEmailService;
            _emailSmsNotification = emailSmsNotification;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraiserCompanyId"></param>
        /// <param name="updateRequest"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("updateAppraisalCompanyProfile")]
        public async Task<IActionResult> updateAppraisalCompanyProfile(int appraiserCompanyId, [FromBody] ClsAppraiserCompany updateRequest)
        {
            log.WriteLog($"ApprisalLandAppError: AppraiserController->updateAppraisalCompanyProfile Method: Function Started");
            try
            {
                var updatedAppraiserCompany = await _appraiserCompany.UpdateAppraiserCompanyAsync(appraiserCompanyId, updateRequest);

                if (updatedAppraiserCompany == null)
                {
                    log.WriteLog($"ApprisalLandAppError: AppraiserController->updateAppraisalCompanyProfile Method: Function End");
                    return NotFound($"AppraiserCompany not found with ID {appraiserCompanyId} or update failed");
                }
                var getSMS = updateRequest.GetSms;
                var getEmail = updateRequest.GetEmail;

                var user = _appraisallandContext.UserInformations.Where(x => x.UserId == appraiserCompanyId).FirstOrDefault();
                if (user != null)
                {
                    user.GetEmail = getEmail;
                    user.GetSms = getSMS;
                    _appraisallandContext.UserInformations.Update(user);
                    _appraisallandContext.SaveChanges();
                }

                var appraiserDetails = _appraisallandContext.UserInformations.Where(x => x.UserId == appraiserCompanyId).FirstOrDefault();

                log.WriteLog($"ApprisalLandAppError: AppraiserController->updateAppraisalCompanyProfile Method: Function End");
                List<string> emailIds = new List<string>();
                emailIds.Add(user.Email);
                var notificationDetail = await _emailSmsNotification.getEmailSmsBody((int)MessageCode.ProfileUpdate);
                if (notificationDetail != null)
                {
                    Task.Run(async () => await _smtpEmailService.SendEmailToUser(emailIds, "Common", "0", notificationDetail.EmailContent, notificationDetail.TriggerPoint));
                }
                return Ok(new { Message = $"AppraiserCompany with ID {appraiserCompanyId} updated successfully", AppraiserCompany = updatedAppraiserCompany, IsEmail = appraiserDetails.GetEmail, IsSms = appraiserDetails.GetSms });
            }
            catch (Exception ex)
            {
                log.WriteLog($"ApprisalLandAppError: AppraiserController->updateAppraisalCompanyProfile Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while Update Apraisal Company" });            
             }        
       }
        //[Authorize]
        //[HttpGet("GetAppraiserCompany")]
        //public IActionResult GetAppraiserCompany(long Userid)
        //{
        //    try
        //    {

        //        List<CommanClass> appraisers = new List<CommanClass>();
        //        var appraiserCompany = _appraiserCompany.GetAppraiserCompany(Userid);
        //        if (appraiserCompany != null)
        //        {
        //            var AppraiserCompany = _AppraisallandContext.AppraiserCompanies.Where(x => x.AppraiserCompanyId == appraiserCompany.AppraiserCompanyId).FirstOrDefault();
        //            //var User_Id = AppraiserCompany.UserId;
        //            //var appraiserCompany_Id = appraiserCompany.AppraiserCompanyId;

        //            var Appraisers = _AppraisallandContext.Appraisers.Where(x => x.CompanyId == appraiserCompany.AppraiserCompanyId).ToList();
        //            foreach (var item in Appraisers)
        //            {
        //                var user_id = item.UserId;
        //                var result = (from Appraiser in _AppraisallandContext.Appraisers
        //                              join userInfo in _AppraisallandContext.UserInformations on Appraiser.UserId equals userInfo.UserId
        //                              where Appraiser.UserId == user_id
        //                              select new CommanClass
        //                              {
        //                                  Id = Appraiser.Id,
        //                                  UserId = Appraiser.UserId,
        //                                  FirstName = Appraiser.FirstName,
        //                                  MiddleName = Appraiser.MiddleName,
        //                                  LastName = Appraiser.LastName,
        //                                  CompanyName = Appraiser.CompanyName,
        //                                  StreetNumber = Appraiser.StreetNumber,
        //                                  StreetName = Appraiser.StreetName,
        //                                  ApartmentNo = Appraiser.ApartmentNo,
        //                                  City = Appraiser.City,
        //                                  Province = Appraiser.Province,
        //                                  PostalCode = Appraiser.PostalCode,
        //                                  Area = Appraiser.Area,
        //                                  PhoneNumber = Appraiser.PhoneNumber,
        //                                  CommissionRate = Appraiser.CommissionRate,
        //                                  MaxNumberOfAssignedOrders = Appraiser.MaxNumberOfAssignedOrders,
        //                                  Designation = Appraiser.Designation,
        //                                  ProfileImage = Appraiser.ProfileImage,
        //                                  CompanyId = Appraiser.CompanyId,
        //                                  IsActive = Appraiser.IsActive,
        //                                  Email = userInfo.Email,
        //                                  Password = userInfo.Password

        //                              }).FirstOrDefault();
        //                if (result != null)
        //                {
        //                    appraisers.Add(result);
        //                }
        //            }
        //            return Ok(new { AppraiserCompany = appraiserCompany, TotaleAppraisers = Appraisers.Count(), Appraisers = appraisers });
        //        }
        //        return NotFound($"AppraiserCompany with ID {Userid} Not Found");
        //    }
        //    catch (Exception ex)
        //    {
        //        log.writeLog("GetAppraiserCompany" + ex);
        //        return StatusCode(500);
        //    }
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="assignProperty"></param>
        /// <returns></returns>
        [Route("assignPropopertyByAppCompany")]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> assignPropopertyByAppCompany(ClsAssignProperty assignProperty)
        {
            log.WriteLog($"ApprisalLandAppError: AppraiserController->assignPropopertyByAppCompany Method: Started");
            try
            {
                bool isAssignProperty = await _appraiserCompany.AssignProperty(assignProperty);
                if (isAssignProperty)
                {
                    log.WriteLog($"ApprisalLandAppError: AppraiserController->assignPropopertyByAppCompany Method: End");
                    return Ok("Property assigned successfully.");
                }
                else
                {
                    log.WriteLog($"ApprisalLandAppError: AppraiserController->assignPropopertyByAppCompany Method: End");
                    return BadRequest(new { Message = "The property has already been reassigned." });
                }
            }
            catch (Exception ex)
            {
                log.WriteLog($"ApprisalLandAppError: AppraiserController->assignPropopertyByAppCompany Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while assinging property" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraiserIsActive"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("updateAppraiserIsActive")]
        public IActionResult updateIsActive(AppraiserIsActiveCls appraiserIsActive)
        {
            log.WriteLog($"ApprisalLandAppError: AppraiserController->updateIsActive Method: Started");
            try
            {
                var userDetail = _appraisallandContext.Appraisers.Where(x => x.CompanyId == appraiserIsActive.CompanyId && x.Id == appraiserIsActive.AppraiserId).FirstOrDefault();
                if (userDetail != null)
                {
                    userDetail.IsActive = appraiserIsActive.Value;
                    _appraisallandContext.Update(userDetail);
                    _appraisallandContext.SaveChanges();
                    log.WriteLog($"ApprisalLandAppError: AppraiserController->updateIsActive Method: End");
                    return Ok(new { Status = "Success" });
                }
                else
                {
                    log.WriteLog($"ApprisalLandAppError: AppraiserController->updateIsActive Method: End");
                    return NotFound(new { Status = "Error", Message = "No valid user found." });
                }
            }
            catch (Exception ex)
            {
                log.WriteLog($"ApprisalLandAppError: AppraiserController->assignPropopertyByAppCompany Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while updating Appraiser" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getAssignedPropertiesbyAppraiserCompany")]
        public IActionResult getAssignedPropertiesbyAppraiseCompany(int companyId)
        {
            log.WriteLog($"ApprisalLandAppError: AppraiserController->getAssignedPropertiesbyAppraiseCompany Method: Start");
            try
            {
                var assignmentsList = _appraisallandContext.AssignProperties
                                     .Where(a => a.CompanyId == companyId && a.IsSelfAssigned == true)
                                     .ToList();

                foreach (var assignment in assignmentsList)
                {
                    var propertyDetail = _appraisallandContext.Properties
                        .FirstOrDefault(p => p.PropertyId == assignment.PropertyId);

                    assignment.Property = propertyDetail;
                }

                log.WriteLog($"ApprisalLandAppError: AppraiserController->getAssignedPropertiesbyAppraiseCompany Method: End");
                return Ok(assignmentsList);
            }
            catch (Exception ex)
            {
                log.WriteLog($"ApprisalLandAppError: AppraiserController->getAssignedPropertiesbyAppraiseCompany Method: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while get Assigned properties" });
            }
        }
    }
}
