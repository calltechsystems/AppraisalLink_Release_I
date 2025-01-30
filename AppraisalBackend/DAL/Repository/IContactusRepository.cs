using DAL.Classes;

namespace DAL.Repository;

public interface IContactusRepository
{
    Task CreateContactusAsync(ClsContactUs contactu);
}