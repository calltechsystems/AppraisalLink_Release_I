using DAL.Classes;
using DBL.Models;

namespace DAL.Repository
{
    public interface IAppraiserCompany
    {
        Task<AppraiserCompany>? UpdateAppraiserCompanyAsync(int userId, ClsAppraiserCompany appraiserCompany);
        Task<bool> AssignProperty(ClsAssignProperty assignProperty);
        AppraiserCompany? GetAppraiserCompany(long UserId);
        AppraiserCompany? GetAppraisersCompany(long UserId);
        Task<List<AssignProperty>>? GetAllassignProperty(long companyid);
    }
}