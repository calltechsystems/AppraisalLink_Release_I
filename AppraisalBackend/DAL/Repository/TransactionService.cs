using DBL.Models;
//using DBL.NewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class TransactionService : ITransactionService
    {
        private readonly AppraisallandsContext _context;

        public TransactionService(AppraisallandsContext context)
        {
            _context=context;
        }
        public async Task<List<TransactionLog>> GetTransactionsByUserId(int userId)
        {
            var transaction=_context.TransactionLogs.Where(x=>x.UserId==userId).ToList();
           if (transaction!=null)
            {
                return transaction;
            }
            return null;
        }
    }
}
