using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
    public interface IAppraiserIndividual
    {
        Task<Appraiser> UpdateAppraiserIndividualAsync(int userId, ClsAppraiserIndividual appraiserIndividual);
        Task<Appraiser> GetAppraiser(long appraiserId);
        List<Appraiser> GetAppraiserByUserId(long userId);
        Task<List<Appraiser>> GetAllApps();
        Task<List<Brokerage>> GetAllBrokerage();
        Task<List<AppraiserCompany>> GetAllAppraiserCompany();
        List<Appraiser> getAppraiser(long appraiserId);
        bool IsActive(long id, bool isActive);
        Task<Plan> UpdatePlan(int planId, int numberOfProperty, double amount);
        Task<List<List<Property>>> GetAllProperties();
        Task<List<List<Property>>> GetAllbrokerageProperies();
    }
}