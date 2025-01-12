using DAL.Classes;
using DBL.Models;
//using DBL.NewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public interface IAppraiserCompany
    {
        Task<AppraiserCompany> UpdateAppraiserCompanyAsync(int UserId, ClsAppraiserCompany AppraiserCompany);
        Task<bool> AssignProperty(ClsAssignProperty assignProperty);
        AppraiserCompany GetAppraiserCompany(long UserId);
        AppraiserCompany GetAppraisersCompany(long UserId);
        Task<List<AssignProperty>> GetAllassignProperty( long companyid);
    }
}
