using DBL.Models;

namespace DAL.Repository;

public interface IAdmin
{
    Task PostArchiveUser(int userId);
    Task<List<UserInformation>> GetAllArchiveUser();
    Task PostArchiveProperty(int orderId);
    Task<List<Property>> GetAllArchivedProperty();
}