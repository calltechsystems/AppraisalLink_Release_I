using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CallTech.Controllers;

[Route("api/com.appraisalland.Transaction")]
[ApiController]
public class TransactionController : ControllerBase
{
    private readonly AppraisallandsContext _AppraisallandContext;
    private readonly ITransactionService _transactionService;

    public TransactionController(ITransactionService transactionService, AppraisallandsContext AppraisallandContext)
    {
        _transactionService = transactionService;
        _AppraisallandContext = AppraisallandContext;
    }

    [Authorize]
    [HttpGet("GetTransactionsByUserId")]
    public IActionResult GetTransactionsByUserId(int userId)
    {
        var transactions = _transactionService.GetTransactionsByUserId(userId);
        var property = _AppraisallandContext.Properties.Where(x => x.UserId == userId).ToList();
        return Ok(new {transactions.Result, NoUsedProperties = property.Count()});
    }
}