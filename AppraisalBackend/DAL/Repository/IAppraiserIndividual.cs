using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
    public interface IAppraiserIndividual
    {
        Task<Appraiser> UpdateAppraiserIndividualAsync(int UserId, ClsAppraiserIndividual AppraiserIndividual);
        Task<Appraiser> GetAppraiser(long AppraiserId);
        List<Appraiser> GetAppraiserByUserId(long UserId);
        Task<List<Appraiser>> GetAllApps();
        Task<List<Brokerage>> GetAllBrokerage();
        Task<List<AppraiserCompany>> GetAllAppraiserCompany();
        List<Appraiser> getAppraiser(long appraiserid);
        bool IsActive(long id, bool IsActive);
        Task<Plan> UpdatePlan(int planid, int numberOfProperty, double amount);
        Task<List<List<Property>>> GetAllProperties();
        Task<List<List<Property>>> GetAllbrokerageProperies();
    }
}