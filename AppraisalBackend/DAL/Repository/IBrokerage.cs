using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
    public interface IBrokerage
    {
        Task<Brokerage> UpdateBrokerAsync(int brokerId, ClsBrokerage brokers);

        Brokerage GetBrokerageById(int brokerageId);
        Brokerage GetBrokerageByUserId(int userId);

        List<Broker> GetBrokerByBrokerage(int brokerageId);


        //bool VerifyPasswordHash(string Oldpassword);
        //bool UpdateNewPassword(ClsBrokerage model, byte[] storedHash, byte[] storedSalt);
    }
}
