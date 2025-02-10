//using DBL.NewModels;
using DBL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public interface ITransactionService
    {
        List<TransactionLog> GetTransactionsByUserId(int userId);
    }
}
