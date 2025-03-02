using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
    public interface IPlans
    {
        Task<List<Plan>> GetAllPlans();
        Task<Plan> GetPlanById(int id);
        Task<PlanClass> UpdatePlan(int planId, PlanClass plan);
    }
}
