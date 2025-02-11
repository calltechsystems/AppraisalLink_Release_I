using DAL.Classes;
using DBL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class PlansService : IPlans
    {
        private readonly AppraisallandsContext _context;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public PlansService(AppraisallandsContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public async Task<List<Plan>> GetAllPlans()
        {
            try
            {
                return await _context.Plans.OrderBy(x => x.Id).ToListAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Plan> GetPlanById(int id)
        {
            var Plan = _context.Plans.Where(x => x.Id == id).FirstOrDefault();
            if (Plan != null)
            {
                return Plan;
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="PlanID"></param>
        /// <param name="plan"></param>
        /// <returns></returns>
        public async Task<PlanClass> UpdatePlan(int PlanID, PlanClass plan)
        {
            try
            {
                var Plan = _context.Plans.Where(x => x.Id == PlanID).FirstOrDefault();
                if (Plan != null)
                {
                    Plan.PlanName = plan.PlanName;
                    Plan.PlanValidity = plan.Amount;
                    Plan.NoOfProperties = plan.NoOfProperties;
                    Plan.Description = plan.Description;
                    Plan.Returnurl = "http://calltech-prod.us-east-1.elasticbeanstalk.com/api/payments/payment"; ///need change 
                    Plan.Currencycode = plan.Currencycode;
                    Plan.MonthlyAmount = plan.MonthlyAmount;
                    Plan.YearlyAmount = plan.YearlyAmount;
                    Plan.Discount = plan.Discount;
                    _context.Plans.Update(Plan);
                    _context.SaveChanges();
                    return plan;
                }
            }
            catch (Exception ex)
            {

                return null;
            }

            return null;
        }

        //public async Task<Plan> GetPlanById(int id)
        //{
        //    try
        //    {
        //        return await _context.Plans.FirstOrDefaultAsync(x => x.PlanId == id);
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }

        //}
    }
}
