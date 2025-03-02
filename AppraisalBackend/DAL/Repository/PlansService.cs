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
        /// <param name="planId"></param>
        /// <returns></returns>
        public async Task<Plan> GetPlanById(int planId)
        {
            var plan = _context.Plans.Where(x => x.Id == planId).FirstOrDefault();
            if (plan != null)
            {
                return plan;
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="planId"></param>
        /// <param name="plan"></param>
        /// <returns></returns>
        public async Task<PlanClass> UpdatePlan(int planId, PlanClass plan)
        {
            try
            {
                var planDetail = _context.Plans.Where(x => x.Id == planId).FirstOrDefault();
                if (planDetail != null)
                {
                    planDetail.PlanName = plan.PlanName;
                    planDetail.PlanValidity = plan.Amount;
                    planDetail.NoOfProperties = plan.NoOfProperties;
                    planDetail.Description = plan.Description;
                    planDetail.ReturnUrl = "http://calltech-prod.us-east-1.elasticbeanstalk.com/api/payments/payment"; ///need change 
                    planDetail.CurrencyCode = plan.Currencycode;
                    planDetail.MonthlyAmount = plan.MonthlyAmount;
                    planDetail.YearlyAmount = plan.YearlyAmount;
                    planDetail.Discount = plan.Discount;
                    _context.Plans.Update(planDetail);
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
