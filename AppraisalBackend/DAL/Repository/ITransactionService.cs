using DBL.Models;

namespace DAL.Repository
{
    public interface ITransactionService
    {
        Task<List<TransactionLog>> GetTransactionsByUserId(int userId);
    }
}
