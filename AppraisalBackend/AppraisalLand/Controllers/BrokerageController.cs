using AppraisalLand.Helper;
using DAL.Classes;
using AppraisalLand.Common.Enums;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppraisalLand.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.Brokerage")]
    [ApiController]
    public class BrokerageController : ControllerBase
    {
        private readonly AppraisallandsContext _context;
        private readonly IBrokerage _brokerage;
        private NotificationHelper _smtpEmailService;
        private IEmailSmsNotification _emailSmsNotification;
        Log log = new Log();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerage"></param>
        /// <param name="context"></param>
        public BrokerageController(IBrokerage brokerage, AppraisallandsContext context, NotificationHelper smtpEmailService, IEmailSmsNotification emailSmsNotification)
        {
            _brokerage = brokerage;
            _context = context;
            _smtpEmailService = smtpEmailService;
            _emailSmsNotification = emailSmsNotification;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerageId"></param>
        /// <param name="updateRequest"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("updateMortgageBrokerageProfile")]
        public async Task<IActionResult> updateMortgageBrokerageProfile(int brokerageId, [FromBody] ClsBrokerage updateRequest)
        {
            log.WriteLog($"ApprisalLandAppError: BrokerageController->updateMortgageBrokerageProfile Method: Started");
            try
            {
                var updatedBroker = await _brokerage.UpdateBrokerAsync(brokerageId, updateRequest);

                if (updatedBroker == null)
                {
                    return NotFound($"Brokerage not found with ID {brokerageId} or update failed");
                }

                var getSMS = updateRequest.GetSms;
                var getEmail = updateRequest.GetEmail;

                var user = _context.UserInformations.Where(x => x.UserId == brokerageId).FirstOrDefault();

                if (user != null)
                {
                    user.GetEmail = getEmail;
                    user.GetSms = getSMS;
                    _context.UserInformations.Update(user);
                    _context.SaveChanges();
                }

                var brokerDetail = _context.UserInformations.Where(x => x.UserId == brokerageId).FirstOrDefault();
                List<string> emailIds = new List<string>();
                emailIds.Add(user.Email);
                var notificationDetail = await _emailSmsNotification.getEmailSmsBody((int)MessageCode.ProfileUpdate);
                if (notificationDetail != null)
                {
                    Task.Run(async () => await _smtpEmailService.SendEmailToUser(emailIds, "Common", "0", notificationDetail.EmailContent, notificationDetail.TriggerPoint));
                }
                
                log.WriteLog($"ApprisalLandAppError: BrokerageController->updateMortgageBrokerageProfile Method: End");
                return Ok(new { Message = $"Brokerage with ID {brokerageId} updated successfully", Broker = updatedBroker, IsEmail = brokerDetail.GetEmail, IsSms = brokerDetail.GetSms });
            }
            catch (Exception ex)
            {
                log.WriteLog($"ApprisalLandAppError: BrokerageController->updateMortgageBrokerageProfile Method: {ex.Message}");
                return StatusCode(500, new
                {
                    Error = "Server Error",
                    Message = "An error occurred during the update process. Please check the following fields for uniqueness and try again:",
                    Fields = new List<string>
                    {
                     "PhoneNumber",
                     "Mortgage_Brokerage_Lic_No",
                     "Mortgage_Broker_Lic_No",
                     "Assistant_Phone_Number"
                    }
                });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerageId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> getBrokerByBrokerage(int brokerageId)
        {
            log.WriteLog($"ApprisalLandAppError: BrokerageController->getBrokerByBrokerage Method: Started");
            try
            {
                var brokerage = _brokerage.GetBrokerageById(brokerageId);
                if (brokerage != null)
                {
                    var query = from b in _context.Brokerages
                                join p in _context.Brokers on b.Id equals p.BrokerageId
                                join u in _context.UserInformations on p.UserId equals u.UserId
                                where b.Id == brokerageId
                                select new
                                {
                                    Broker = p,
                                    UserInformation = u.Email,
                                };

                    var brokerageWithBroker = query.ToList();
                    log.WriteLog($"ApprisalLandAppError: BrokerageController->getBrokerByBrokerage Method: End");
                    return Ok(new { Brokerage = brokerage, Brokers = brokerageWithBroker });
                }

                return NotFound($"No brokerage found with the ID: {brokerageId}");
            }
            catch (Exception ex)
            {
                log.WriteLog($"ApprisalLandAppError: BrokerageController->getBrokerByBrokerage Method: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerageId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("getPropertiesByBrokerage")]
        public IActionResult getPropertiesByBrokerage(int brokerageId)
        {
            log.WriteLog($"ApprisalLandAppError: BrokerageController->getPropertiesByBrokerage Method: Started");
            try
            {
                var brokers = _brokerage.GetBrokerByBrokerage(brokerageId);
                var itemsWithUserInfoAndProperties = brokers
                                                    .Join(_context.UserInformations,
                                                          broker => broker.UserId,
                                                          userInfo => userInfo.UserId,
                                                          (broker, userInfo) => new
                                                          {
                                                              Broker = broker,
                                                              UserInfo = userInfo.Email
                                                          })
                                                    .Select(combined => new
                                                    {
                                                        Broker = combined.Broker,
                                                        UserInfo = combined.UserInfo,
                                                        Properties = _context.Properties
                                                            .Where(property => property.UserId == combined.Broker.UserId)
                                                            .ToList()
                                                    })
                                                    .ToList();

                log.WriteLog($"ApprisalLandAppError: BrokerageController->getPropertiesByBrokerage Method: End");

                if (itemsWithUserInfoAndProperties != null)
                {
                    return Ok(itemsWithUserInfoAndProperties);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                log.WriteLog($"ApprisalLandAppError: BrokerageController->getPropertiesByBrokerage Method: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerIsActive"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("updateBrokerIsActive")]
        public IActionResult updateBrokerIsActive(BrokerIsActiveCls brokerIsActive)
        {
            log.WriteLog($"ApprisalLandAppError: BrokerageController->updateBrokerIsActive Method: Started");
            try
            {
                var userDetail = _context.Brokers.Where(x => x.BrokerageId == brokerIsActive.BrokerageId && x.Id == brokerIsActive.BrokerId).FirstOrDefault();
                if (userDetail != null)
                {
                    userDetail.IsActive = brokerIsActive.value;
                    userDetail.ModifiedDateTime = DateTime.UtcNow;
                    _context.Update(userDetail);
                    _context.SaveChanges();
                    log.WriteLog($"ApprisalLandAppError: BrokerageController->updateBrokerIsActive Method: End");
                    return Ok(new { Status = "Success" });
                }
                else
                {
                    return NotFound(new { Status = "Error", Message = "No valid user found." });
                }
            }
            catch (Exception ex)
            {
                log.WriteLog($"ApprisalLandAppError: BrokerageController->updateBrokerIsActive Method: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        //[Authorize]
        //[HttpGet("GetBrokerage/BrokerageId")]
        //public IActionResult GetBrokerageById(int BrokerageId)
        //{
        //    try
        //    {
        //        var Brokerage = _brokerage.GetBrokerageById(BrokerageId);
        //        if (Brokerage != null)
        //        {
        //            return Ok(Brokerage);
        //        }
        //        else
        //        {
        //            return NotFound($"Brokerage not found with ID {BrokerageId}");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        log.writeLog("GetBrokerById Function " + ex);
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}