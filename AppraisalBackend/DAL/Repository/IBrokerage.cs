using DAL.Classes;
using DBL.Models;
//using DBL.NewModels;

namespace DAL.Repository;

public interface IBrokerage
{
    Task<Brokerage> UpdateBrokerAsync(int BrokerID, ClsBrokerage Brokers);

    Brokerage GetBrokerageById(int BrokerageID);
    Brokerage GetBrokerageByUserId(int UserId);

    List<Broker> GetBrokerByBrokerage(int BrokerageID);


    //bool VerifyPasswordHash(string Oldpassword);
    //bool UpdateNewPassword(ClsBrokerage model, byte[] storedHash, byte[] storedSalt);
}