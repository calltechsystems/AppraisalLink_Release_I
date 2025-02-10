//using DBL.NewModels;
//using DBL.Models;
using DBL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Rpository
{
    public interface ISubscriptionService
    {
        Task<List<Subscription>> GetAllSubscriptions();
        Task<Subscription> GetSubscriptionById(int id);
    }
}
