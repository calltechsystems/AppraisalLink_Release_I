using DBL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public interface IAdmin
    {
        Task PostArchiveUser(int UserId);
        Task<List<UserInformation>> GetAllArchiveUser();
        Task PostArchiveProperty(int orderId);
        Task<List<Property>> GetAllArchivedProperty();
    }
}
