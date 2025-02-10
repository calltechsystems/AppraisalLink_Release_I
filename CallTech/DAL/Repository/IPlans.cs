using DAL.Classes;
using DBL.Models;
////using DBL.NewModels;
//using DBL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Rpository
{
    public interface IPlans
    {
       Task<List<Plan>> GetAllPlans();
       Task<Plan> GetPlanById(int id);
        Task<PlanClass> UpdatePlan(int PlanID,PlanClass plan);
    }
}
