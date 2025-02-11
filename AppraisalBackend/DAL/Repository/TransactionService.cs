using DBL.Models;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class TransactionService : ITransactionService
    {
        private readonly AppraisallandsContext _context;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public TransactionService(AppraisallandsContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<List<TransactionLog>> GetTransactionsByUserId(int userId)
        {
            bool Is_Active = false;
            List<TransactionLog> transactionLogs = new List<TransactionLog>();
            var transaction = _context.TransactionLogs.Where(x => x.UserId == userId && x.IsActive == true).FirstOrDefault();

            var subcription = _context.Subscriptions.Where(x => x.UserId == userId).ToList();
            if (subcription != null)
            {
                foreach (var sub in subcription)
                {
                    if (transaction.Paymentid == sub.PaymentId)
                    {
                        Is_Active = true;
                    }
                    var Plan = _context.Plans.Where(x => x.Id == sub.PlanId).FirstOrDefault();
                    TransactionLog ObjtransactionLogs = new TransactionLog();
                    ObjtransactionLogs.Paymentid = sub.PaymentId;
                    ObjtransactionLogs.PlanName = Plan.PlanName;
                    ObjtransactionLogs.PlanAmount = Plan.MonthlyAmount;
                    ObjtransactionLogs.StartDate = sub.StartDate;
                    ObjtransactionLogs.EndDate = sub.EndDate;
                    ObjtransactionLogs.IsActive = Is_Active;
                    transactionLogs.Add(ObjtransactionLogs);
                }
                return transactionLogs;
            }
            return null;
        }
    }
}
