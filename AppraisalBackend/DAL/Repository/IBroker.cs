using DAL.Classes;
using DBL.Models;
//using DBL.NewModels;
//using DBL.Models;

namespace DAL.Rpository;

public interface IBroker
{
    Task<Broker> UpdateBrokerAsync(int BrokerID, ClsBrokerUpdateDto Brokers);
    bool VerifyPasswordHash(string Oldpassword);
    bool UpdateNewPassword(ClsChangePassword model, byte[] storedHash, byte[] storedSalt);
    Broker GeyByBrokerId(int brokerId);
    List<Broker> AllBroker();
    Broker GetBrokerByUserId(int Userid);
    bool IsActive(long id, bool IsActive);
}