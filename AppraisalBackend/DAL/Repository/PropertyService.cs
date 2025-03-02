using DAL.Classes;
using DBL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class PropertyService : IPropertyService
    {
        private readonly AppraisallandsContext _context;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="configuration"></param>
        public PropertyService(AppraisallandsContext context, IConfiguration configuration)
        {
            _context = context;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyId"></param>
        /// <returns></returns>
        public async Task<bool> DeletePropertyAsync(long propertyId)
        {
            var propertyDetail = await _context.Properties.Where(x => x.PropertyId == propertyId).FirstOrDefaultAsync();
            if (propertyDetail != null)
            {

                _context.Properties.Remove(propertyDetail);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Property> GetAllPropertyAsync()
        {

            var result = from p in _context.Properties
                         where !_context.ArchivedAppraisers.Select(a => a.OrderId).Contains(p.OrderId)
                         select p;
            return result.ToList();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<Property> GetPropertyByUserIdAsync(long userId)
        {
            List<Property> properties = new List<Property>();
            var property = _context.Properties.Where(x => x.UserId == userId).ToList();
            if (property != null)
            {
                foreach (var item in property)
                {
                    if (item.IsArchive == false)
                    {
                        properties.Add(item);
                    }
                }
                return properties;
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyId"></param>
        /// <param name="property"></param>
        /// <returns></returns>
        public async Task<Property> UpdatePropertyAsync(long propertyId, ClsProperty property)
        {
            var propertyDetail = _context.Properties.Where(x => x.OrderId == propertyId).FirstOrDefault();
            if (propertyDetail != null)
            {
                propertyDetail.StreetName = property.StreetName;
                propertyDetail.StreetNumber = property.StreetNumber;
                propertyDetail.City = property.City;
                propertyDetail.Province = property.Province;
                propertyDetail.ZipCode = property.ZipCode;
                propertyDetail.Area = property.Area;
                propertyDetail.Community = property.Community;
                propertyDetail.TypeOfBuilding = property.TypeOfBuilding;
                propertyDetail.ApplicantFirstName = property.ApplicantFirstName;
                propertyDetail.ApplicantLastName = property.ApplicantLastName;
                propertyDetail.ApplicantPhoneNumber = property.ApplicantPhoneNumber;
                propertyDetail.ApplicantEmailAddress = property.ApplicantEmailAddress;
                propertyDetail.ModifiedDatetime = DateTime.Now;
                propertyDetail.BidLowerRange = propertyDetail.BidLowerRange;
                propertyDetail.BidUpperRange = propertyDetail.BidUpperRange;
                propertyDetail.Urgency = property.Urgency;
                propertyDetail.PropertyStatus = property.PropertyStatus;
                // property.UserId = pro.UserId;
                propertyDetail.QuoteRequiredDate = property.QuoteRequiredDate;
                propertyDetail.Remark = property.Remark;
                propertyDetail.IsArchive = propertyDetail.IsArchive;
                propertyDetail.EstimatedValue = property.EstimatedValue;
                propertyDetail.Purpose = property.Purpose;
                propertyDetail.TypeOfAppraisal = property.TypeOfAppraisal;
                propertyDetail.LenderInformation = property.LenderInformation;
                propertyDetail.ApplicantAddress = property.ApplicantAddress;
                propertyDetail.Attachment = property.Attachment;
                propertyDetail.Sqft = property.Sqft;
                propertyDetail.Image = property.Image;

                _context.Properties.Update(propertyDetail);
                _context.SaveChanges();
                return propertyDetail;
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyId"></param>
        /// <returns></returns>
        public async Task<Property> GetPropertyByPropertyIDAsync(long propertyId)
        {
            var propertyDetail = await _context.Properties.FirstOrDefaultAsync(p => p.PropertyId == propertyId);

            if (propertyDetail != null)
            {
                return propertyDetail;
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        public Property GetPropertyByOrderID(long orderId)
        {
            var propertyDetail = _context.Properties.Where(x => x.OrderId == orderId).FirstOrDefault();

            if (propertyDetail != null)
            {
                return propertyDetail;
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="orderStatus"></param>
        /// <returns></returns>
        public bool IsOnHoldStatus(ClsOrderStatus orderStatus)
        {
            var propertyDetail = _context.Properties.Where(x => x.OrderId == orderStatus.OrderId).FirstOrDefault();

            if (orderStatus.Status == "HOLD" || orderStatus.Status == "hold")
            {
                propertyDetail.IsOnHold = orderStatus.value;
                _context.Properties.Update(propertyDetail);
                _context.SaveChanges();
                return true;
            }
            else if (orderStatus.Status == "CANCEL" || orderStatus.Status == "cancel")
            {
                propertyDetail.IsOnCancel = orderStatus.value;
                _context.Properties.Update(propertyDetail);
                _context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyId"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public bool IsOnCancelStatus(long propertyId, bool value)
        {
            var propertyDetail = _context.Properties.Where(x => x.PropertyId == propertyId).FirstOrDefault();

            if (propertyDetail != null)
            {
                propertyDetail.IsOnCancel = value;
                _context.Properties.Update(propertyDetail);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public bool ArchiveProperty(long propertyId, long userId)
        {
            var propertyDetail = _context.Properties.Where(x => x.PropertyId == propertyId).FirstOrDefault();

            if (propertyDetail != null)
            {
                ArchivedAppraiser archivedAppraiser = new ArchivedAppraiser();
                archivedAppraiser.OrderId = propertyDetail.PropertyId;
                archivedAppraiser.UserId = userId;
                _context.ArchivedAppraisers.Add(archivedAppraiser);
                _context.SaveChanges();
                return true;
            }

            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public bool DeleteArchiveProperty(long propertyId, long userId)
        {
            var archiveProperty = _context.ArchivedAppraisers.Where(x => x.OrderId == propertyId && x.UserId == userId).FirstOrDefault();
            if (archiveProperty != null)
            {
                _context.ArchivedAppraisers.Remove(archiveProperty);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="archiveProperty"></param>
        /// <returns></returns>
        public async Task<bool> archivePropertyByBroker(ClsArchive1 archiveProperty)
        {
            if (archiveProperty.Status)
            {
                var archivedPropertyDetail = _context.ArchivedProperties.Where(x => x.OrderId == archiveProperty.OrderId && x.UserId == archiveProperty.UserId).FirstOrDefault();
                if (archivedPropertyDetail == null)
                {
                    ArchivedProperty newArchivedProperty = new ArchivedProperty();
                    newArchivedProperty.OrderId = archiveProperty.OrderId;
                    newArchivedProperty.UserId = archiveProperty.UserId;
                    _context.ArchivedProperties.Add(newArchivedProperty);
                    _context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                var archivedPropertyDetail = _context.ArchivedProperties.Where(x => x.OrderId == archiveProperty.OrderId).FirstOrDefault();
                if (archivedPropertyDetail != null)
                {
                    _context.ArchivedProperties.Remove(archivedPropertyDetail);
                    _context.SaveChanges();
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="archiveProperty"></param>
        /// <returns></returns>
        public async Task<bool> archievePropertyByApprasier(ClsArchive1 archiveProperty)
        {
            if (archiveProperty.Status)
            {
                ArchivedAppraiser archivedAppraiser = new ArchivedAppraiser();
                archivedAppraiser.OrderId = archiveProperty.OrderId;
                archivedAppraiser.UserId = archiveProperty.UserId;
                _context.ArchivedAppraisers.Add(archivedAppraiser);
                _context.SaveChanges();
                return true;
            }
            else
            {
                var archivedAppraiser = _context.ArchivedAppraisers.Where(x => x.OrderId == archiveProperty.OrderId).FirstOrDefault();
                if (archivedAppraiser != null)
                {
                    _context.ArchivedAppraisers.Remove(archivedAppraiser);
                    _context.SaveChanges();
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraiserId"></param>
        /// <returns></returns>
        public List<Property> getAllAppraiserAgentAssignedProperty(int appraiserId)
        {
            var appraiserList = _context.AssignProperties.Where(x => x.AppraiserId == appraiserId && x.IsSelfAssigned == true).ToList();
            if (appraiserList != null)
            {
                List<int> propertyIds = new List<int>();
                foreach (var item in appraiserList)
                {
                    var propertyId = item.PropertyId;
                    propertyIds.Add(propertyId);
                }
                List<Property> allProperty = new List<Property>();
                List<Property> allProperties = new List<Property>();

                foreach (var propertyId in propertyIds)
                {
                    var propertyDetail = _context.Properties.Where(x => x.PropertyId == propertyId).FirstOrDefault();
                    if (propertyDetail != null)
                    {
                        allProperty.Add(propertyDetail);
                    }
                }

                List<DBL.Models.Bid> bid = new List<DBL.Models.Bid>();
                foreach (var property in allProperty)
                {
                    var bidDetail = _context.Bids.Where(x => x.OrderId == property.OrderId).FirstOrDefault();
                    if (bidDetail != null)
                    {
                        if (bidDetail.Status == 1 && bidDetail.OrderStatus == 3)
                        {
                            bid.Add(bidDetail);
                        }
                    }
                }

                foreach (var item in bid)
                {
                    var propertyDetail = _context.Properties.Where(x => x.PropertyId == item.OrderId).FirstOrDefault();
                    if (propertyDetail != null)
                    {
                        allProperties.Add(propertyDetail);
                    }
                }
                return allProperties;
            }
            else
            {
                return null;
            }
        }



        //public async Task<bool> UpdatePropertyIsArchiveProperty(int usertype, long propertyId, bool value)
        //{
        //    try
        //    {
        //        var Property = context.Properties.Where(x => x.PropertyId == propertyId).FirstOrDefault();
        //        if(Property != null)
        //        {
        //            if (usertype == 1) {
        //                if (value)
        //                {
        //                    Property.IsArchive = true;
        //                    context.Properties.Update(Property);
        //                    context.SaveChanges();
        //                    return true;
        //                }
        //                else
        //                {
        //                    Property.IsArchive = false;
        //                    context.Properties.Update(Property);
        //                    context.SaveChanges();
        //                    return true;
        //                }
        //            }
        //            else if(usertype == 2)
        //            {
        //                if (value)
        //                {
        //                    Property.IsArchiveAppraiser = true;
        //                    context.Properties.Update(Property);
        //                    context.SaveChanges();
        //                    return true;
        //                }
        //                else
        //                {
        //                    Property.IsArchiveAppraiser = false;
        //                    context.Properties.Update(Property);
        //                    context.SaveChanges();
        //                    return true;
        //                }
        //            }
        //            else { return false; }


        //        }
        //        else
        //        {
        //            return true;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return false;
        //    }

        //}

        //public async Task<Property> UpdatePropertyAsync(int PropertyID, ClsProperty pro)
        //{
        //    var Property = await context.Properties.Where(x => x.PropertyId == PropertyID).FirstOrDefaultAsync();
        //    if (Property != null)
        //    {
        //        Property.BrokerId=pro.BrokerId;
        //        Property.Address = pro.Address;
        //        Property.City = pro.City;
        //        Property.State = pro.State;
        //        Property.ZipCode = pro.ZipCode;
        //        Property.PropertyType = pro.PropertyType;
        //        Property.SizeSqFt = pro.SizeSqFt;
        //        Property.PropertyOwner = pro.PropertyOwner;
        //        Property.FirstNameOwner = pro.FirstNameOwner;
        //        Property.LastName = pro.LastName;
        //        Property.PropertyOwnerPhoneNumber = pro.PropertyOwnerPhoneNumber;
        //        Property.DateTime = pro.DateTime;
        //        Property.QuoteLimit = pro.QuoteLimit;
        //        Property.Urgency = pro.Urgency;
        //        context.Properties.Update(Property);
        //        await context.SaveChangesAsync();
        //        return Property;
        //    }
        //    return null;
        //}
    }
}