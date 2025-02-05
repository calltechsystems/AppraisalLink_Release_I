using DAL.Classes;

namespace DAL.Repository;

public interface IContactUsRepository
{
    Task CreateContactUsAsync(ContactUsDto contactUs);
}