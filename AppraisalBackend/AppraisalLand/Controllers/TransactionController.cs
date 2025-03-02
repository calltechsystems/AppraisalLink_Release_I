using DAL.Classes;
using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppraisalLand.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.Transaction")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        private readonly AppraisallandsContext _appraisallandContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="transactionService"></param>
        /// <param name="appraisallandContext"></param>
        public TransactionController(ITransactionService transactionService, AppraisallandsContext appraisallandContext)
        {
            _transactionService = transactionService;
            _appraisallandContext = appraisallandContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("GetTransactionsByUserId")]
        public IActionResult GetTransactionsByUserId(int userId)
        {
            List<PaymentHistory> transactions = new List<PaymentHistory>();

            var paymentHistory = _transactionService.GetTransactionsByUserId(userId);

            foreach (var transaction in paymentHistory)
            {
                PaymentHistory objpaymentHistory = new PaymentHistory  // New instance for each loop
                {
                    UserId = userId,
                    Paymentid = transaction.PaymentId,
                    PlanAmount = transaction.PlanAmount,
                    PlanName = transaction.PlanName,
                    IsActive = transaction.IsActive,
                    StartDate = transaction.StartDate,
                    EndDate = transaction.EndDate
                };
                if (transaction.PlanName == "Top Up")
                {
                    objpaymentHistory.PlanType = "N.A.";
                }

                transactions.Add(objpaymentHistory);
            }

            var properties = _appraisallandContext.Properties.Where(x => x.UserId == userId).ToList();
            return Ok(new { transactions, NoUsedProperties = properties.Count() });
        }


        // [Authorize]
        //[HttpGet("GetTransactionsByUserId")]
        //public IActionResult GetTransactionsByUserId(int userId)
        //{
        //   List<PaymentHistory> transactions = new List<PaymentHistory>();
        //   PaymentHistory objpaymentHistory = new PaymentHistory();

        //    var paymentHistory = _transactionService.GetTransactionsByUserId(userId);

        //    foreach (var transaction in paymentHistory)
        //    {
        //       objpaymentHistory.UserId= transaction.UserId;
        //        objpaymentHistory.Paymentid = transaction.Paymentid;
        //       objpaymentHistory.PlanAmount =transaction.PlanAmount;
        //        objpaymentHistory.PlanName = transaction.PlanName;
        //        objpaymentHistory.IsActive = transaction.IsActive;
        //        objpaymentHistory.StartDate = transaction.StartDate;
        //       objpaymentHistory.EndDate    = transaction.EndDate;
        //        transactions.Add(objpaymentHistory);
        //    }
        //    var property= _AppraisallandContext.Properties.Where(x=>x.UserId==userId).ToList();  
        //    return Ok(new { transactions, NoUsedProperties= property.Count()});
        //}
    }
}