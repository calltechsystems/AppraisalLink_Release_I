using DAL.Classes;
using DBL.Models;
//using DBL.NewModels;
//using DBL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Rpository
{
    public interface IPropertyService
    {
        Task<Property> GetPropertyByPropertyIDAsync(long PropertyID);
        List<Property> GetPropertyByUserIdAsync(long UserID);
        Property GetPropertyByOrderID(long OrderId);
        List<Property> GetAllPropertyAsync();
        List<Property> getAllAppraiserAgentAssignedProperty(int appraiserId);
        Task<Property> UpdatePropertyAsync(long PropertyID, ClsProperty pro);
        Task<bool> DeletePropertyAsync(long PropertyID);
        Task<bool> archivePropertyByBroker(Clsarchive1 clsarchive);
        Task<bool> archievePropertyByApprasier(Clsarchive1 clsarchive);
      //  Task<bool> UnArchiveProperty(long propertyId);
        bool IsOnHoldStatus(ClsOrderStatus clsOrderStatus);
        bool IsOnCancelStatus(long propertyId,bool value);
        bool ArchiveProperty(long propertyId, long userId);
        bool DeleteArchiveProperty(long propertyId, long userId);

        //Task<bool> UpdatePropertyIsArchiveProperty(int usertype,long propertyId,bool value);
    }
}
