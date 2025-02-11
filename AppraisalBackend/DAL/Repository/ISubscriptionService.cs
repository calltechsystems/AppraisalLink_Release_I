using DBL.Models;

namespace DAL.Repository
{
    public interface ISubscriptionService
    {
        Task<List<Subscription>> GetAllSubscriptions();
        Task<Subscription> GetSubscriptionById(int id);
    }
}
