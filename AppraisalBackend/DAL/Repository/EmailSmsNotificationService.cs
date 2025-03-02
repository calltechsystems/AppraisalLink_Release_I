using DBL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class EmailSmsNotificationService : IEmailSmsNotification
    {
        private readonly AppraisallandsContext _context;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public EmailSmsNotificationService(AppraisallandsContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="msgCode"></param>
        /// <returns></returns>
        public async Task<EmailSmsNotificationsI?> getEmailSmsBody(int msgCode)
        {
            try
            {
                var _notificationDetails = await _context.EmailSmsNotificationsIs.Where(x => x.MsgCode == msgCode).FirstOrDefaultAsync();
                if (_notificationDetails != null)
                {
                    return _notificationDetails;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="submsgCode"></param>
        /// <returns></returns>
        public async Task<EmailSmsNotificationsIi> getSubEmailSmsBody(int submsgCode)
        {
            try
            {
                var _notificationDetails = await _context.EmailSmsNotificationsIis.Where(x => x.SubMsgCode == submsgCode).FirstOrDefaultAsync();
                if (_notificationDetails != null)
                {
                    return _notificationDetails;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
