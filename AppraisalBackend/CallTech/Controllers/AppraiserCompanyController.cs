using DAL.Classes;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.ComponentModel.Design;

namespace CallTech.Controllers
{
    [Route("api/com.appraisalland.AppraiserCompany")]
    [ApiController]
    public class AppraiserCompanyController : ControllerBase
    {
        private readonly IAppraiserCompany _appraiserCompany;
        private readonly AppraisallandsContext _AppraisallandContext;
        Log log = new Log();
        public AppraiserCompanyController(IAppraiserCompany appraiserCompany, AppraisallandsContext AppraisallandContext)
        {
            _appraiserCompany = appraiserCompany;
            _AppraisallandContext = AppraisallandContext;
        }
        [Authorize]
        [HttpPut("updateAppraisalCompanyProfile")]
        public async Task<IActionResult> updateAppraisalCompanyProfile(int AppraiserCompanyID, [FromBody] ClsAppraiserCompany updateRequest)
        {
            log.writeLog("UpdateAppraiserCompany Function started");
            try
            {
                var updatedAppraiserCompany = await _appraiserCompany.UpdateAppraiserCompanyAsync(AppraiserCompanyID, updateRequest);

                if (updatedAppraiserCompany == null)
                {
                    return NotFound($"AppraiserCompany not found with ID {AppraiserCompanyID} or update failed");
                }
                var get_SMS = updateRequest.GetSms;
                var get_Email = updateRequest.GetEmail;

                var user=_AppraisallandContext.UserInformations.Where(x=>x.UserId== AppraiserCompanyID).FirstOrDefault();
                if (user!=null)
                {
                    user.GetEmail = get_Email;
                    user.GetSms= get_SMS;
                    _AppraisallandContext.UserInformations.Update(user);
                    _AppraisallandContext.SaveChanges();
                }
                var Appraiser_Details = _AppraisallandContext.UserInformations.Where(x => x.UserId == AppraiserCompanyID).FirstOrDefault();
                return Ok(new { Message = $"AppraiserCompany with ID {AppraiserCompanyID} updated successfully", AppraiserCompany = updatedAppraiserCompany, IsEmail = Appraiser_Details.GetEmail, IsSms = Appraiser_Details.GetSms });
            }
            catch (Exception ex)
            {

                log.writeLog("UpdateBroker" + ex);
                return StatusCode(500);
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


        [Route("assignPropopertyByAppCompany")]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> assignPropopertyByAppCompany(ClsAssignProperty clsAssignProperty)
        {
            log.writeLog("AssignProprties Function started");
            try
            {
                
                bool AssignProperty = await _appraiserCompany.AssignProperty(clsAssignProperty);
                if (AssignProperty)
                {
                    return Ok("Property assigned successfully.");
                }
                else
                {
                    return BadRequest($"it's not Individual Appraiser{clsAssignProperty.Appraiserid} id OR Failed to assign property.");
                }
            }
            catch (Exception ex)
            {
                log.writeLog("AssignProperties: " + ex);
                return StatusCode(500, "An error occurred while assigning property.");
            }
        }

        [Authorize]
        [HttpPut("updateAppraiserIsActive")]
        public IActionResult updateIsActive(AppraiserIsActiveCls appraiserIsActiveCls)
        {
            log.writeLog("updateIsActive Function started");
            try
            {
                var userDetails = _AppraisallandContext.Appraisers.Where(x => x.CompanyId == appraiserIsActiveCls.CompanyId && x.Id == appraiserIsActiveCls.AppraiserId).FirstOrDefault();
                if (userDetails != null)
                {
                    userDetails.IsActive = appraiserIsActiveCls.Value;
                    _AppraisallandContext.Update(userDetails);
                    _AppraisallandContext.SaveChanges();
                    return Ok(new { Status = "Success" });
                }
                else
                {
                    return NotFound(new { Status = "Error", Message = "No valid user found." });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }

        [Authorize]
        [HttpGet("getAssignedPropertiesbyAppraiserCompany")]
        public IActionResult getAssignedPropertiesbyAppraiseCompany(int companyid)
        {
            log.writeLog("getAssignedpropertiesbyappraisercompany Function started");
            try
            {
                var assignmentsList = _AppraisallandContext.AssignProperties
                                     .Where(a => a.Companyid == companyid)
                                     .ToList();

                foreach (var assignment in assignmentsList)
                {
                    var propertyDetails = _AppraisallandContext.Properties
                        .FirstOrDefault(p => p.PropertyId == assignment.Propertyid);


                    assignment.Property = propertyDetails;
                }

                return Ok(assignmentsList);
                
            }
            catch (Exception ex)
            {
                log.writeLog($"getAssignedPropertiesByAppraiserCompany: {ex.Message}");
                return StatusCode(500, "An error occurred while getting properties.");
            }
        }
    }
}
