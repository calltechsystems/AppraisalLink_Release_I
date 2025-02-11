using DBL.Models;

namespace DAL.Repository
{
    public interface ITransactionService
    {
        List<TransactionLog> GetTransactionsByUserId(int userId);
    }
}
