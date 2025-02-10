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
    public class SubscriptionService : ISubscriptionService
    {
        public Task<List<Subscription>> GetAllSubscriptions()
        {
            throw new NotImplementedException();
        }

        public Task<Subscription> GetSubscriptionById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
