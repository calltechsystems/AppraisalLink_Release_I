using DBL.Models;
using Microsoft.EntityFrameworkCore;

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

        public List<TransactionLog> GetTransactionsByUserId(int userId)
        {
            bool isActive = false;
            List<TransactionLog> transactionLogs = new List<TransactionLog>();

            // Fetch transactions & subscriptions synchronously
            var transactions = _context.TransactionLogs
                                       .Where(x => x.UserId == userId)
                                       .ToList();

            var subscriptions = _context.Subscriptions
                                        .Where(x => x.UserId == userId)
                                        .ToList();

            if (subscriptions.Any()) // Ensure there are subscriptions
            {
                foreach (var sub in subscriptions)
                {
                    var PlanName = "";
                    DateTime dateTime = DateTime.Now;
                    double PlanAmount = 0;
                    if (sub.TopUpId != null)
                    {
                        var plan = _context.Plans.Where(x => sub.PlanId == x.Id).FirstOrDefault();
                        var TopUpDetails = _context.Topups.Where(x => x.Id == sub.TopUpId).FirstOrDefault();
                        PlanName = TopUpDetails.Topupname;
                        PlanAmount= Math.Round((double)TopUpDetails.TopUpAmount, 2);
                        dateTime = sub.EndDate;
                    }
                    else
                    {
                        var plan = _context.Plans
                                .Where(x => sub.PlanId == x.Id).FirstOrDefault();
                        PlanName = plan.PlanName;
                        PlanAmount = (double)plan.MonthlyAmount;
                        dateTime= sub.EndDate;

                    }
                      
                    var Trans=_context.TransactionLogs.Where(x=>x.IsActive==true && x.UserId== userId).FirstOrDefault();
                    if (Trans.Paymentid== sub.PaymentId)
                    {
                        isActive = true;
                    }
                    else
                    {
                        isActive = false;
                    }
                     transactionLogs.Add(new TransactionLog
                        {
                            Paymentid = sub.PaymentId,
                            PlanName = PlanName,
                            PlanAmount = PlanAmount,
                            StartDate = sub.StartDate,
                            EndDate = dateTime,
                            IsActive = isActive
                        });
                    
                }
            }

            return transactionLogs;
        }



        //public async Task<List<TransactionLog>> GetTransactionsByUserId(int userId)
        //{
        //    bool Is_Active=false;
        //    List<TransactionLog> transactionLogs=new List<TransactionLog> ();
        //    var transaction=_context.TransactionLogs.Where(x=>x.UserId==userId).ToList();

        //    var subcription=_context.Subscriptions.Where(x=>x.UserId==userId).ToList();
        //   if (subcription != null)
        //    {
        //        foreach (var sub in subcription)
        //        {
        //            if (transaction.Paymentid==sub.PaymentId)
        //            {
        //                Is_Active = true;
        //            }
        //            var Plan=_context.Plans.Where(x=>x.Id==sub.PlanId).FirstOrDefault();
        //            TransactionLog ObjtransactionLogs = new TransactionLog();
        //            ObjtransactionLogs.Paymentid = sub.PaymentId;
        //            ObjtransactionLogs.PlanName= Plan.PlanName;
        //            ObjtransactionLogs.PlanAmount= Plan.MonthlyAmount;
        //            ObjtransactionLogs.StartDate= sub.StartDate;
        //            ObjtransactionLogs.EndDate= sub.EndDate;
        //            ObjtransactionLogs.IsActive= Is_Active;
        //            transactionLogs.Add(ObjtransactionLogs);
        //        }
        //        return transactionLogs;
        //    }
        //    return null;
        //}
    }
}
