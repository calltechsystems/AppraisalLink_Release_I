using DAL.Classes;
using DBL.Models;
//using DBL.NewModels;
//using DBL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Rpository
{
    public class BrokerService : IBroker
    {
        private readonly AppraisallandsContext _context;
        public BrokerService(AppraisallandsContext context)
        {

            _context = context;

        }

        public  List<Broker> AllBroker()
        {
            var Brokers=_context.Brokers.ToList();
            if (Brokers!=null)
            {
                return Brokers;
            }
            return null;
        }

        public Broker GeyByBrokerId(int brokerId)
        {
           return _context.Brokers.Where(x => x.Id == brokerId).FirstOrDefault();
           
        }
        public Broker GetBrokerByUserId(int Userid)
        {
            return _context.Brokers.Where(x => x.UserId == Userid).FirstOrDefault();

        }

        public bool IsActive(long id, bool IsActive)
        {
          var Broker=  _context.Brokers.Where(x => x.Id == id).FirstOrDefault();
            if (Broker!=null)
            {
                Broker.IsActive = IsActive; 
                _context.Brokers.Update(Broker);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public async Task<Broker> UpdateBrokerAsync(int BrokerID, ClsBrokerUpdateDto Brokers)
        {
            var broker = _context.Brokers.Where(x => x.UserId == BrokerID).FirstOrDefault();
            var User_Details=_context.UserInformations.Where(x=>x.UserId==BrokerID).FirstOrDefault();   
            if (broker != null)
            {
                broker.FirstName = Brokers.FirstName;
                broker.MiddleName = Brokers.MiddleName;
                broker.LastName = Brokers.LastName;
                broker.CompanyName = Brokers.CompanyName;
                broker.LicenseNo = Brokers.LicenseNo;
                broker.BrokerageName = Brokers.BrokerageName;
                broker.StreetNumber = Brokers.StreetNumber;
                broker.StreetName = Brokers.StreetName;
                broker.ApartmentNo = Brokers.ApartmentNo;
                broker.City = Brokers.City;
                broker.IsActive = true;
                broker.Isactive1 = true;
                broker.Province = Brokers.Province;
                broker.PostalCode = Brokers.PostalCode;
                broker.Area = Brokers.Area;
                broker.PhoneNumber = Brokers.PhoneNumber;
                broker.MortageBrokerageLicNo = Brokers.MortageBrokerageLicNo;
                broker.MortageBrokerLicNo = Brokers.MortageBrokerLicNo;
                broker.AssistantFirstName = Brokers.AssistantFirstName;
                broker.AssistantPhoneNumber = Brokers.AssistantPhoneNumber;
                broker.AssistantEmailAddress = Brokers.AssistantEmailAddress;
                broker.ProfileImage = Brokers.ProfileImage;
                broker.ModifiedDateTime=DateTime.UtcNow;
                //broker.DateEstablished = DateTime.Now.Date;
                broker.IsActive = true;
                broker.Isactive1 =true;
                broker.FaxNumber = Brokers.FaxNumber;
                broker.Description = Brokers.Description;
                broker.Cellnumber = Brokers.CellNumber;
                broker.EmailId= Brokers.EmailId;
                broker.AssistantTwoPhoneNumber= Brokers.AssistantTwoPhoneNumber;
                broker.AssistantTwoEmailAddress= Brokers.AssistantTwoEmailAddress;
                broker.AssistantLastName= Brokers.AssistantLastName;
                broker.AssistantTwoFirstName=Brokers.AssistantTwoFirstName;
                broker.AssistantTwoLastName=Brokers.AssistantTwoLastName;
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

        public bool UpdateNewPassword(ClsChangePassword model, byte[] storedHash, byte[] storedSalt)
        {
            var User=_context.UserInformations.Where(x=>x.Email==model.Email).FirstOrDefault();
            if (User!=null)
            {
                User.Password = model.NewPassword;
                User.PasswordSalt = storedHash;
                User.PasswordSalt = storedSalt;
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool VerifyPasswordHash(string Oldpassword)
        {
            var user=_context.UserInformations.Where(x=>x.Password==Oldpassword).FirstOrDefault();
            if (user!=null)
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
