using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public interface IForgotPasswordService
    {
        Task<bool> SendResetTokenAsync(string email);
        Task<bool> VerifyResetTokenAsync(string email, string token, string NewPassword);
    }
}
