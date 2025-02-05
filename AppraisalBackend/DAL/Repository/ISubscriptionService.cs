//using DBL.NewModels;
//using DBL.Models;

using DBL.Models;

namespace DAL.Rpository;

public interface ISubscriptionService
{
    Task<List<Subscription>> GetAllSubscriptions();
    Task<Subscription> GetSubscriptionById(int id);
}