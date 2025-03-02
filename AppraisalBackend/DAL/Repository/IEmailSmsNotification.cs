using DBL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public interface IEmailSmsNotification
    {
        Task<EmailSmsNotificationsI> getEmailSmsBody(int msgCode);
        Task<EmailSmsNotificationsIi> getSubEmailSmsBody(int submsgCode);
    }
}
