using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
    public interface IPropertyService
    {
        Task<Property> GetPropertyByPropertyIDAsync(long propertyId);
        List<Property> GetPropertyByUserIdAsync(long userId);
        Property GetPropertyByOrderID(long orderId);
        List<Property> GetAllPropertyAsync();
        List<Property> getAllAppraiserAgentAssignedProperty(int appraiserId);
        Task<Property> UpdatePropertyAsync(long propertyId, ClsProperty property);
        Task<bool> DeletePropertyAsync(long propertyId);
        Task<bool> archivePropertyByBroker(ClsArchive1 archive);
        Task<bool> archievePropertyByApprasier(ClsArchive1 archive);
        //  Task<bool> UnArchiveProperty(long propertyId);
        bool IsOnHoldStatus(ClsOrderStatus orderStatus);
        bool IsOnCancelStatus(long propertyId, bool value);
        bool ArchiveProperty(long propertyId, long userId);
        bool DeleteArchiveProperty(long propertyId, long userId);

        //Task<bool> UpdatePropertyIsArchiveProperty(int usertype,long propertyId,bool value);
    }
}
