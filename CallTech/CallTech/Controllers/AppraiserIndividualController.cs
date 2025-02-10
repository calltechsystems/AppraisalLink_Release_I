using DAL.Classes;
using DAL.Repository;
using DAL.Rpository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PayPal.Api;
using Serilog;

namespace CallTech.Controllers
{
    [Route("api/com.appraisalland.AppraiserIndividual")]
    [ApiController]
    public class AppraiserIndividualController : ControllerBase
    {
        private readonly IRegistrationService _registrationService;
        private readonly IAppraiserIndividual _appraiserIndividual;
        private readonly AppraisallandsContext _context;
        Log log = new Log();
        public AppraiserIndividualController(IAppraiserIndividual AppraiserIndividual, IRegistrationService registrationService, AppraisallandsContext context)
        {
            _appraiserIndividual = AppraiserIndividual;
            _registrationService = registrationService;
            _context = context;
        }
        
        [Authorize]
        [HttpPut("updateAppraiserProfile")]
        public async Task<IActionResult> updateAppraiserProfile(int AppraiserId, [FromBody] ClsAppraiserIndividual updateRequest)
        {
            log.writeLog("updateAppraiserProfile Function started");
            try
            {
                var updatedAppraiserIndividual = await _appraiserIndividual.UpdateAppraiserIndividualAsync(AppraiserId, updateRequest);

                if (updatedAppraiserIndividual == null)
                {
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
                return Ok(new { Message = $"Appraiser with ID {AppraiserId} updated successfully", Appraiser = updatedAppraiserIndividual, IsEmail = Appraiser_Details.GetEmail, IsSms = Appraiser_Details.GetSms });
            }
            catch (Exception ex)
            {

                log.writeLog("updateAppraiserProfile Function " + ex);
                return StatusCode(500);
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

        [Authorize]
        [HttpGet("getPropertiesById")]
        public IActionResult getPropertiesById(long appraiserId)
        {
            log.writeLog("getPropertiesById Function started");
            try
            {
                List<Property> properties = new List<Property>(); 

               var AssignProperties= _context.AssignProperties.Where(x=>x.Appraiserid == appraiserId && x.IsSelfAssigned==true).ToList();
                var groupedAssignments = AssignProperties.GroupBy(a => a.Appraiserid);

                var propertyIds = AssignProperties.Select(a => a.Propertyid).Distinct().ToList();

                foreach (var propiD in propertyIds)
                {
                    var property = _context.Properties.Where(x => x.PropertyId == propiD).FirstOrDefault();
                    properties.Add(property);
                }

                return Ok(new {AppraiserId= appraiserId , properties = properties });
               
            }
            catch (Exception EX)
            {
                log.writeLog("An error occurred ,found Appraiser By UserId ." + EX);
                return StatusCode(500, new { Message = "An error occurred while processing your request" });

            }
        }

        [Authorize]
        [HttpPut("updateApprasierStatus")]
        public IActionResult updateApprasierStatus(long Userid, bool IsActive)
        {
            log.writeLog("appraiserIsActive Function started");
            try
            {
                var Appraiser = _appraiserIndividual.IsActive(Userid, IsActive);
                if (Appraiser)
                {
                    return Ok(new { Message = "Appraiser status updated successfully"});
                }
                else
                {
                    return BadRequest(new { Message = "Appraiser not found or unable to update status" });
                }
            }
            catch (Exception ex)
            {
                log.writeLog("An error occurred in appraiserIsActive." + ex);
                return StatusCode(500, new { Message = "An error occurred while processing your request" });
            }
         
        }

        [Authorize]
        [HttpGet("getAssignedAppraiserbyAppraiserCompany")]
        public IActionResult getAssignedAppraiserbyAppraiserCompanyId(long companyId)
        {
            try
            {
                var apptaisers = _appraiserIndividual.getAppraiser(companyId);
                if (apptaisers!=null)
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

                    return Ok(itemsWithUserInfo);
                }
                else
                {
                    return NotFound($"No Appraiser Company Found with Id{companyId}");
                }
               
               
            }
            catch (Exception ex)
            {
                log.writeLog($"getAssignedAppraiserbyAppraiserCompanyId: {ex.Message}");
                return StatusCode(500, "An error occurred while getting properties.");
            }
           
        }
    }
}
