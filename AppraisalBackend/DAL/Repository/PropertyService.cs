using DAL.Classes;
using DAL.Rpository;
using DBL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAL.Repository;

public class PropertyService : IPropertyService
{
    private readonly AppraisalLandsContext _context;

    public PropertyService(AppraisalLandsContext context, IConfiguration configuration)
    {
        _context = context;
    }

    public async Task<bool> DeletePropertyAsync(long propertyId)
    {
        var property = await _context.Properties.Where(x => x.PropertyId == propertyId).FirstOrDefaultAsync();
        if (property != null)
        {
            _context.Properties.Remove(property);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }

    public List<Property> GetAllPropertyAsync()
    {
        var result = from p in _context.Properties
                     where !_context.ArchivedAppraisers.Select(a => a.Orderid).Contains(p.OrderId)
                     select p;
        return result.ToList();
    }


    public List<Property> GetPropertyByUserIdAsync(long UserID)
    {
        var properties = new List<Property>();
        var property = _context.Properties.Where(x => x.UserId == UserID).ToList();
        if (property != null)
        {
            foreach (var item in property)
                if (item.IsArchive == false)
                    properties.Add(item);
            return properties;
        }

        return null;
    }

    public async Task<Property> UpdatePropertyAsync(long PropertyID, ClsProperty pro)
    {
        var property = _context.Properties.Where(x => x.OrderId == PropertyID).FirstOrDefault();
        if (property != null)
        {
            property.StreetName = pro.StreetName;
            property.StreetNumber = pro.StreetNumber;
            property.City = pro.City;
            property.Province = pro.Province;
            property.ZipCode = pro.ZipCode;
            property.Area = pro.Area;
            property.Community = pro.Community;
            property.TypeOfBuilding = pro.TypeOfBuilding;
            property.ApplicantFirstName = pro.ApplicantFirstName;
            property.ApplicantLastName = pro.ApplicantLastName;
            property.ApplicantPhoneNumber = pro.ApplicantPhoneNumber;
            property.ApplicantEmailAddress = pro.ApplicantEmailAddress;
            property.ModifiedDatetime = DateTime.Now;
            property.BidLowerRange = property.BidLowerRange;
            property.BidUpperRange = property.BidUpperRange;
            property.Urgency = pro.Urgency;
            property.PropertyStatus = pro.PropertyStatus;
            // property.UserId = pro.UserId;
            property.QuoteRequiredDate = pro.QuoteRequiredDate;
            property.Remark = pro.Remark;
            property.IsArchive = property.IsArchive;
            property.EstimatedValue = pro.EstimatedValue;
            property.Purpose = pro.Purpose;
            property.TypeOfAppraisal = pro.TypeOfAppraisal;
            property.LenderInformation = pro.LenderInformation;
            property.ApplicantAddress = pro.ApplicantAddress;
            property.Attachment = pro.Attachment;
            property.Sqft = pro.Sqft;
            property.Image = pro.Image;

            _context.Properties.Update(property);
            _context.SaveChanges();
            return property;
        }

        return null;
    }

    public async Task<Property> GetPropertyByPropertyIDAsync(long PropertyID)
    {
        var pro = await _context.Properties.FirstOrDefaultAsync(p => p.PropertyId == PropertyID);
        if (pro != null) return pro;
        return null;
    }

    public Property GetPropertyByOrderID(long OrderId)
    {
        var propertyDetails = _context.Properties.Where(x => x.OrderId == OrderId).FirstOrDefault();
        if (propertyDetails != null) return propertyDetails;
        return null;
    }


    public bool IsOnHoldStatus(ClsOrderStatus clsOrderStatus)
    {
        var Property = _context.Properties.Where(x => x.OrderId == clsOrderStatus.OrderId).FirstOrDefault();
        if (clsOrderStatus.status == "HOLD" || clsOrderStatus.status == "hold")
        {
            Property.Isonhold = clsOrderStatus.value;
            _context.Properties.Update(Property);
            _context.SaveChanges();
            return true;
        }

        if (clsOrderStatus.status == "CANCEL" || clsOrderStatus.status == "cancel")
        {
            Property.Isoncancel = clsOrderStatus.value;
            _context.Properties.Update(Property);
            _context.SaveChanges();
            return true;
        }

        return false;
    }


    public bool IsOnCancelStatus(long propertyId, bool value)
    {
        var Property = _context.Properties.Where(x => x.PropertyId == propertyId).FirstOrDefault();
        if (Property != null)
        {
            Property.Isoncancel = value;
            _context.Properties.Update(Property);
            _context.SaveChanges();
            return true;
        }

        return false;
    }

    public bool ArchiveProperty(long propertyId, long userId)
    {
        var Property = _context.Properties.Where(x => x.PropertyId == propertyId).FirstOrDefault();
        if (Property != null)
        {
            var archivedAppraiser = new ArchivedAppraiser();
            archivedAppraiser.Orderid = Property.PropertyId;
            archivedAppraiser.Userid = userId;
            _context.ArchivedAppraisers.Add(archivedAppraiser);
            _context.SaveChanges();
            return true;
        }

        return false;
    }

    public bool DeleteArchiveProperty(long propertyId, long userId)
    {
        var ArchiveProperty = _context.ArchivedAppraisers.Where(x => x.Orderid == propertyId && x.Userid == userId)
            .FirstOrDefault();
        if (ArchiveProperty != null)
        {
            _context.ArchivedAppraisers.Remove(ArchiveProperty);
            _context.SaveChanges();
            return true;
        }

        return false;
    }

    public async Task<bool> archivePropertyByBroker(Clsarchive1 clsarchive)
    {
        if (clsarchive.status)
        {
            var details = _context.ArchivedProperties
                .Where(x => x.OrderId == clsarchive.orderId && x.UserId == clsarchive.userId).FirstOrDefault();
            if (details == null)
            {
                var archivedProperty = new ArchivedProperty();
                archivedProperty.OrderId = clsarchive.orderId;
                archivedProperty.UserId = clsarchive.userId;
                _context.ArchivedProperties.Add(archivedProperty);
                _context.SaveChanges();
                return true;
            }

            return false;
        }

        {
            var archivedProperty = new ArchivedProperty();
            var ArchivedProperty = _context.ArchivedProperties.Where(x => x.OrderId == clsarchive.orderId)
                .FirstOrDefault();
            if (ArchivedProperty != null)
            {
                _context.ArchivedProperties.Remove(ArchivedProperty);
                _context.SaveChanges();
                return true;
            }
        }
        return false;
    }

    public async Task<bool> archievePropertyByApprasier(Clsarchive1 clsarchive)
    {
        if (clsarchive.status)
        {
            var archivedAppraiser = new ArchivedAppraiser();
            archivedAppraiser.Orderid = clsarchive.orderId;
            archivedAppraiser.Userid = clsarchive.userId;
            _context.ArchivedAppraisers.Add(archivedAppraiser);
            _context.SaveChanges();
            return true;
        }
        else
        {
            var archivedAppraiser = new ArchivedAppraiser();
            var ArchivedAppraiser = _context.ArchivedAppraisers.Where(x => x.Orderid == clsarchive.orderId)
                .FirstOrDefault();
            if (ArchivedAppraiser != null)
            {
                _context.ArchivedAppraisers.Remove(ArchivedAppraiser);
                _context.SaveChanges();
                return true;
            }
        }

        return false;
    }
}