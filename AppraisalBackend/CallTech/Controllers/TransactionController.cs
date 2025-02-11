using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.Transaction")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        private readonly AppraisallandsContext _AppraisallandContext;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="transactionService"></param>
        /// <param name="AppraisallandContext"></param>
        public TransactionController(ITransactionService transactionService, AppraisallandsContext AppraisallandContext)
        {
            _transactionService = transactionService;
            _AppraisallandContext = AppraisallandContext;
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
            var transactions = _transactionService.GetTransactionsByUserId(userId);
            var property = _AppraisallandContext.Properties.Where(x => x.UserId == userId).ToList();
            return Ok(new { transactions.Result, NoUsedProperties = property.Count() });
        }
    }
}