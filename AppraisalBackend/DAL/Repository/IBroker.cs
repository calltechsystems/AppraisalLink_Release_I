using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
    public interface IBroker
    {
        Task<Broker> UpdateBrokerAsync(int brokerId, ClsBrokerUpdateDto brokers);
        bool VerifyPasswordHash(string oldPassword);
        bool UpdateNewPassword(ClsChangePassword model, byte[] storedHash, byte[] storedSalt);
        Broker GetByBrokerId(int brokerId);
        List<Broker> AllBroker();
        Broker GetBrokerByUserId(int userId);
        bool IsActive(long id, bool isActive);
    }
}
