using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class BrokerageService : IBrokerage
    {
        private readonly AppraisallandsContext _context;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appraisallandContext"></param>
        public BrokerageService(AppraisallandsContext appraisallandContext)
        {
            _context = appraisallandContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerageId"></param>
        /// <returns></returns>
        public Brokerage GetBrokerageById(int brokerageId)
        {
            return _context.Brokerages.Where(x => x.Id == brokerageId).FirstOrDefault();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public Brokerage GetBrokerageByUserId(int userId)
        {
            return _context.Brokerages.Where(x => x.UserId == userId).FirstOrDefault();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerageId"></param>
        /// <returns></returns>
        public List<Broker> GetBrokerByBrokerage(int brokerageId)
        {
            var brokers = _context.Brokers.Where(x => x.BrokerageId == brokerageId).ToList();
            if (brokers.Count != 0)
            {
                return brokers;
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerId"></param>
        /// <param name="brokerageRequest"></param>
        /// <returns></returns>
        public async Task<Brokerage> UpdateBrokerAsync(int brokerId, ClsBrokerage brokerageRequest)
        {
            var brokerage = _context.Brokerages.Where(x => x.UserId == brokerId).FirstOrDefault();
            var userDetails = _context.UserInformations.Where(x => x.UserId == brokerId).FirstOrDefault();
            if (brokerage != null)
            {
                brokerage.FirstName = brokerageRequest.FirstName;
                brokerage.MiddleName = brokerageRequest.MiddleName;
                brokerage.LastName = brokerageRequest.LastName;
                brokerage.CompanyName = brokerageRequest.CompanyName;
                brokerage.LicenseNo = brokerageRequest.LicenseNo;
                brokerage.BrokerageName = brokerageRequest.BrokerageName;
                brokerage.StreetNumber = brokerageRequest.StreetNumber;
                brokerage.StreetName = brokerageRequest.StreetName;
                brokerage.ApartmentNo = brokerageRequest.ApartmentNo;
                brokerage.City = brokerageRequest.City;
                brokerage.Province = brokerageRequest.Province;
                brokerage.PostalCode = brokerageRequest.PostalCode;
                brokerage.Area = brokerageRequest.Area;
                brokerage.PhoneNumber = brokerageRequest.PhoneNumber;
                brokerage.MortageBrokerageLicNo = brokerageRequest.MortageBrokerageLicNo;
                brokerage.MortageBrokerLicNo = brokerageRequest.MortageBrokerLicNo;
                brokerage.AssistantFirstName = brokerageRequest.AssistantFirstName;
                brokerage.AssistantPhoneNumber = brokerageRequest.AssistantPhoneNumber;
                brokerage.AssistantEmailAddress = brokerageRequest.AssistantEmailAddress;
                brokerage.ProfileImage = brokerageRequest.ProfileImage;
                brokerage.IsActive = brokerageRequest.IsActive;
                brokerage.FaxNumber = brokerageRequest.FaxNumber;
                brokerage.Description = brokerageRequest.Description;
                brokerage.Cellnumber = brokerageRequest.CellNumber;
                brokerage.EmailId = brokerageRequest.EmailId;
                brokerage.AssistantTwoPhoneNumber = brokerageRequest.AssistantTwoPhoneNumber;
                brokerage.AssistantTwoEmailAddress = brokerageRequest.AssistantTwoEmailAddress;
                brokerage.AssistantLastName = brokerageRequest.AssistantLastName;
                brokerage.AssistantTwoFirstName = brokerageRequest.AssistantTwoFirstName;
                brokerage.AssistantTwoLastName = brokerageRequest.AssistantTwoLastName;
                brokerage.ModifiedDateTime = DateTime.UtcNow;
                _context.Brokerages.Update(brokerage);
                _context.SaveChanges();
                //user_Details.GetSms = Brokeragerequest.GetSms;
                //user_Details.GetEmail= Brokeragerequest.GetEmail;
                //_context.UserInformations.Update(user_Details);
                //_context.SaveChanges(); 

                return brokerage;
            }
            return null;
        }
    }
}
