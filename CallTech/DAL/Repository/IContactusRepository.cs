using DAL.Classes;
using DBL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public interface IContactusRepository
    {
        Task CreateContactusAsync(ClsContactUs contactu);
    }
}
