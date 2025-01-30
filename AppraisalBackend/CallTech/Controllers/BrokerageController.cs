using DAL.Classes;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers;

[Route("api/com.appraisalland.Brokerage")]
[ApiController]
public class BrokerageController : ControllerBase
{
    private readonly IBrokerage _brokerage;
    private readonly AppraisallandsContext _context;
    private readonly Log log = new();

    public BrokerageController(IBrokerage brokerage, AppraisallandsContext context)
    {
        _brokerage = brokerage;
        _context = context;
    }

    [Authorize]
    [HttpPut("updateMortgageBrokerageProfile")]
    public async Task<IActionResult> updateMortgageBrokerageProfile(int BrokerageId,
        [FromBody] ClsBrokerage updateRequest)
    {
        log.WriteLog("updateMortgageBrokerageProfile Function started");
        try
        {
            var updatedBroker = await _brokerage.UpdateBrokerAsync(BrokerageId, updateRequest);

            if (updatedBroker == null) return NotFound($"Brokerage not found with ID {BrokerageId} or update failed");
            var get_SMS = updateRequest.GetSms;
            var get_Email = updateRequest.GetEmail;

            var user = _context.UserInformations.Where(x => x.UserId == BrokerageId).FirstOrDefault();
            if (user != null)
            {
                user.GetEmail = get_Email;
                user.GetSms = get_SMS;
                _context.UserInformations.Update(user);
                _context.SaveChanges();
            }

            var Broker_Details = _context.UserInformations.Where(x => x.UserId == BrokerageId).FirstOrDefault();
            return Ok(new
            {
                Message = $"Brokerage with ID {BrokerageId} updated successfully", Broker = updatedBroker,
                IsEmail = Broker_Details.GetEmail, IsSms = Broker_Details.GetSms
            });
        }
        catch (Exception ex)
        {
            log.WriteLog("An error occurred during updateMortgageBrokerageProfile" + ex);
            return StatusCode(500, new
            {
                Error = "Server Error",
                Message =
                    "An error occurred during the update process. Please check the following fields for uniqueness and try again:",
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

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> getBrokerByBrokerage(int brokerageId)
    {
        log.WriteLog("getBrokerByBrokerage Function started");
        try
        {
            var Brokerage = _brokerage.GetBrokerageById(brokerageId);
            if (Brokerage != null)
            {
                var query = from b in _context.Brokerages
                    join p in _context.Brokers on b.Id equals p.Brokerageid
                    join u in _context.UserInformations on p.UserId equals u.UserId
                    where b.Id == brokerageId
                    select new
                    {
                        Broker = p,
                        UserInformation = u.Email
                    };
                var BrokerageWithBroker = query.ToList();
                return Ok(new {Brokerage, Brokers = BrokerageWithBroker});
            }

            return NotFound($"No brokerage found with the ID: {brokerageId}");
        }
        catch (Exception ex)
        {
            log.WriteLog($"Error in getBrokerByBrokerage Function: {ex.Message}");
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    [Authorize]
    [HttpGet("getPropertiesByBrokerage")]
    public IActionResult getPropertiesByBrokerage(int brokerageId)
    {
        log.WriteLog("getPropertiesByBrokerage Function started");
        try
        {
            var Brokers = _brokerage.GetBrokerByBrokerage(brokerageId);
            var itemsWithUserInfoAndProperties = Brokers
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
                    combined.Broker,
                    combined.UserInfo,
                    Properties = _context.Properties
                        .Where(property => property.UserId == combined.Broker.UserId)
                        .ToList()
                })
                .ToList();


            if (itemsWithUserInfoAndProperties != null)
                return Ok(itemsWithUserInfoAndProperties);
            return NotFound();
        }
        catch (Exception ex)
        {
            log.WriteLog($"Error in getPropertiesByBrokerage Function: {ex.Message}");
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }


    [Authorize]
    [HttpPut("updateBrokerIsActive")]
    public IActionResult updateBrokerIsActive(brokerIsActiveCls brokerIsActiveCls)
    {
        log.WriteLog("updateIsActive Function started");
        try
        {
            var userDetails = _context.Brokers
                .Where(x => x.Brokerageid == brokerIsActiveCls.BrokerageId && x.Id == brokerIsActiveCls.BrokerId)
                .FirstOrDefault();
            if (userDetails != null)
            {
                userDetails.IsActive = brokerIsActiveCls.value;
                userDetails.ModifiedDateTime = DateTime.UtcNow;
                _context.Update(userDetails);
                _context.SaveChanges();
                return Ok(new {Status = "Success"});
            }

            return NotFound(new {Status = "Error", Message = "No valid user found."});
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
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