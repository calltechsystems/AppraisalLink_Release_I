using DAL.Classes;
using DBL.Models;

namespace DAL.Repository;

public class BrokerageService : IBrokerage
{
    private readonly AppraisalLandsContext _context;

    public BrokerageService(AppraisalLandsContext AppraisallandContext)
    {
        _context = AppraisallandContext;
    }

    public Brokerage GetBrokerageById(int BrokerageID)
    {
        return _context.Brokerages.Where(x => x.Id == BrokerageID).FirstOrDefault();
    }

    public Brokerage GetBrokerageByUserId(int UserId)
    {
        return _context.Brokerages.Where(x => x.UserId == UserId).FirstOrDefault();
    }

    public List<Broker> GetBrokerByBrokerage(int BrokerageID)
    {
        var brokers = _context.Brokers.Where(x => x.Brokerageid == BrokerageID).ToList();
        if (brokers.Count != 0) return brokers;
        return null;
    }

    public async Task<Brokerage> UpdateBrokerAsync(int BrokerID, ClsBrokerage Brokeragerequest)
    {
        var Brokerage = _context.Brokerages.Where(x => x.UserId == BrokerID).FirstOrDefault();
        var user_Details = _context.UserInformations.Where(x => x.UserId == BrokerID).FirstOrDefault();
        if (Brokerage != null)
        {
            Brokerage.FirstName = Brokeragerequest.FirstName;
            Brokerage.MiddleName = Brokeragerequest.MiddleName;
            Brokerage.LastName = Brokeragerequest.LastName;
            Brokerage.CompanyName = Brokeragerequest.CompanyName;
            Brokerage.LicenseNo = Brokeragerequest.LicenseNo;
            Brokerage.BrokerageName = Brokeragerequest.BrokerageName;
            Brokerage.StreetNumber = Brokeragerequest.StreetNumber;
            Brokerage.StreetName = Brokeragerequest.StreetName;
            Brokerage.ApartmentNo = Brokeragerequest.ApartmentNo;
            Brokerage.City = Brokeragerequest.City;
            Brokerage.Province = Brokeragerequest.Province;
            Brokerage.PostalCode = Brokeragerequest.PostalCode;
            Brokerage.Area = Brokeragerequest.Area;
            Brokerage.PhoneNumber = Brokeragerequest.PhoneNumber;
            Brokerage.MortageBrokerageLicNo = Brokeragerequest.MortageBrokerageLicNo;
            Brokerage.MortageBrokerLicNo = Brokeragerequest.MortageBrokerLicNo;
            Brokerage.AssistantFirstName = Brokeragerequest.AssistantFirstName;
            Brokerage.AssistantPhoneNumber = Brokeragerequest.AssistantPhoneNumber;
            Brokerage.AssistantEmailAddress = Brokeragerequest.AssistantEmailAddress;
            Brokerage.ProfileImage = Brokeragerequest.ProfileImage;
            Brokerage.IsActive = Brokeragerequest.IsActive;
            Brokerage.FaxNumber = Brokeragerequest.FaxNumber;
            Brokerage.Description = Brokeragerequest.Description;
            Brokerage.Cellnumber = Brokeragerequest.CellNumber;
            Brokerage.EmailId = Brokeragerequest.EmailId;
            Brokerage.AssistantTwoPhoneNumber = Brokeragerequest.AssistantTwoPhoneNumber;
            Brokerage.AssistantTwoEmailAddress = Brokeragerequest.AssistantTwoEmailAddress;
            Brokerage.AssistantLastName = Brokeragerequest.AssistantLastName;
            Brokerage.AssistantTwoFirstName = Brokeragerequest.AssistantTwoFirstName;
            Brokerage.AssistantTwoLastName = Brokeragerequest.AssistantTwoLastName;
            Brokerage.ModifiedDateTime = DateTime.UtcNow;
            _context.Brokerages.Update(Brokerage);
            _context.SaveChanges();
            //user_Details.GetSms = Brokeragerequest.GetSms;
            //user_Details.GetEmail= Brokeragerequest.GetEmail;
            //_context.UserInformations.Update(user_Details);
            //_context.SaveChanges(); 

            return Brokerage;
        }

        return null;
    }
}