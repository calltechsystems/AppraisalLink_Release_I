using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class BrokerService : IBroker
    {
        private readonly AppraisallandsContext _context;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public BrokerService(AppraisallandsContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Broker> AllBroker()
        {
            var brokers = _context.Brokers.ToList();
            if (brokers != null)
            {
                return brokers;
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerId"></param>
        /// <returns></returns>
        public Broker GetByBrokerId(int brokerId)
        {
            return _context.Brokers.Where(x => x.Id == brokerId).FirstOrDefault();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public Broker GetBrokerByUserId(int userId)
        {
            return _context.Brokers.Where(x => x.UserId == userId).FirstOrDefault();

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerId"></param>
        /// <param name="isActive"></param>
        /// <returns></returns>
        public bool IsActive(long brokerId, bool isActive)
        {
            var broker = _context.Brokers.Where(x => x.Id == brokerId).FirstOrDefault();
            if (broker != null)
            {
                broker.IsActive = isActive;
                _context.Brokers.Update(broker);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="brokerId"></param>
        /// <param name="brokers"></param>
        /// <returns></returns>
        public async Task<Broker> UpdateBrokerAsync(int brokerId, ClsBrokerUpdateDto brokers)
        {
            var broker = _context.Brokers.Where(x => x.UserId == brokerId).FirstOrDefault();
            var userDetails = _context.UserInformations.Where(x => x.UserId == brokerId).FirstOrDefault();
            if (broker != null)
            {
                broker.FirstName = brokers.FirstName;
                broker.MiddleName = brokers.MiddleName;
                broker.LastName = brokers.LastName;
                broker.CompanyName = brokers.CompanyName;
                broker.LicenseNo = brokers.LicenseNo;
                broker.BrokerageName = brokers.BrokerageName;
                broker.StreetNumber = brokers.StreetNumber;
                broker.StreetName = brokers.StreetName;
                broker.ApartmentNo = brokers.ApartmentNo;
                broker.City = brokers.City;
                broker.IsActive = true;
                broker.IsActive1 = true;
                broker.Province = brokers.Province;
                broker.PostalCode = brokers.PostalCode;
                broker.Area = brokers.Area;
                broker.PhoneNumber = brokers.PhoneNumber;
                broker.MortageBrokerageLicNo = brokers.MortageBrokerageLicNo;
                broker.MortageBrokerLicNo = brokers.MortageBrokerLicNo;
                broker.AssistantFirstName = brokers.AssistantFirstName;
                broker.AssistantPhoneNumber = brokers.AssistantPhoneNumber;
                broker.AssistantEmailAddress = brokers.AssistantEmailAddress;
                broker.ProfileImage = brokers.ProfileImage;
                broker.ModifiedDateTime = DateTime.UtcNow;
                //broker.DateEstablished = DateTime.Now.Date;
                broker.IsActive = true;
                broker.IsActive1 = true;
                broker.FaxNumber = brokers.FaxNumber;
                broker.Description = brokers.Description;
                broker.CellNumber = brokers.CellNumber;
                broker.EmailId = brokers.EmailId;
                broker.AssistantTwoPhoneNumber = brokers.AssistantTwoPhoneNumber;
                broker.AssistantTwoEmailAddress = brokers.AssistantTwoEmailAddress;
                broker.AssistantLastName = brokers.AssistantLastName;
                broker.AssistantTwoFirstName = brokers.AssistantTwoFirstName;
                broker.AssistantTwoLastName = brokers.AssistantTwoLastName;
                _context.Brokers.Update(broker);
                _context.SaveChanges();
                //User_Details.GetEmail = Brokers.GetEmail;
                //User_Details.GetSms= Brokers.GetSms;
                //_context.UserInformations.Update(User_Details);
                //_context.SaveChanges();

                return broker;
            }

            return null;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <param name="storedHash"></param>
        /// <param name="storedSalt"></param>
        /// <returns></returns>
        public bool UpdateNewPassword(ClsChangePassword model, byte[] storedHash, byte[] storedSalt)
        {
            var user = _context.UserInformations.Where(x => x.Email == model.Email).FirstOrDefault();
            if (user != null)
            {
                user.Password = model.NewPassword;
                user.PasswordSalt = storedHash;
                user.PasswordSalt = storedSalt;
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="oldPassword"></param>
        /// <returns></returns>
        public bool VerifyPasswordHash(string oldPassword)
        {
            var user = _context.UserInformations.Where(x => x.Password == oldPassword).FirstOrDefault();
            if (user != null)
            {
                return true;
            }
            return false;
        }
        //public async Task<Broker> UpdateBrokerAsync(int BrokerID, ClsBrokerUpdateDto Brokers)
        //{
        //    var broker = await _context.Brokers.SingleOrDefaultAsync(x => x.BrokerId == BrokerID);

        //    if (broker == null)
        //    {
        //        return null;
        //    }

        //    broker.LicenseNo = Brokers.LicenseNo;
        //    broker.BrokerageName = Brokers.BrokerageName;
        //    broker.StreetName = Brokers.StreetName;
        //    broker.StreetNumber = Brokers.StreetNumber;
        //    broker.City = Brokers.City;
        //    broker.State = Brokers.State;
        //    broker.ZipCode = Brokers.ZipCode;
        //    broker.Area = Brokers.Area;
        //    broker.FirstName = Brokers.FirstName;
        //    broker.MiddleName = Brokers.MiddleName;
        //    broker.LastName = Brokers.LastName;
        //    broker.PhoneNumber = Brokers.PhoneNumber;
        //    // broker.EmailAddress = Brokers.EmailAddress;
        //    broker.MortageBrokerage = Brokers.MortageBrokerage;
        //    broker.MortageBrokerLicenseNo = Brokers.MortageBrokerLicenseNo;
        //    broker.MortageBroker = Brokers.MortageBroker;
        //    broker.AssistantFirstName = Brokers.AssistantFirstName;
        //    broker.AssistantPhoneNumber = Brokers.AssistantPhoneNumber;
        //    broker.AssistantEmail = Brokers.AssistantEmail;

        //    _context.Update(broker);

        //    await _context.SaveChangesAsync(); 

        //    return broker;
        //}
    }
}
