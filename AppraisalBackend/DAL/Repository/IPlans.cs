using DAL.Classes;
using DBL.Models;
////using DBL.NewModels;
//using DBL.Models;

namespace DAL.Rpository;

public interface IPlans
{
    Task<List<Plan>> GetAllPlans();
    Task<Plan> GetPlanById(int id);
    Task<PlanClass> UpdatePlan(int PlanID, PlanClass plan);
}