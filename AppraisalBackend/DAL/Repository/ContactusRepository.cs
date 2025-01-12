using DAL.Classes;
using DBL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class ContactusRepository : IContactusRepository
    {
        private readonly AppraisallandsContext _AppraisallandContext;

        public ContactusRepository(AppraisallandsContext AppraisallandContext)
        {
            _AppraisallandContext = AppraisallandContext;
        }
        public async Task CreateContactusAsync(ClsContactUs contactu)
        {
            Contactu contactus =new Contactu();
            contactus.FirstName = contactu.FirstName;
            contactus.LastName = contactu.LastName;
            contactus.EmailAddress = contactu.EmailAddress;
            contactus.UserLoggedIn = contactu.UserLoggedIn;
            contactus.PhoneNumber = contactu.PhoneNumber;
            contactus.Company = contactu.Company;
            contactus.State = contactu.State;
            contactus.Subject = contactu.Subject;
            contactus.Description = contactu.Description;
            await _AppraisallandContext.Contactus.AddAsync(contactus);
            await _AppraisallandContext.SaveChangesAsync();
            sendMailContactUs(contactu.EmailAddress);

        }
        public bool sendMailContactUs(string email)
        {
            try
            {
                string pswd = "odkzjyvtiwmtdjtq";
                MailMessage appraiserMail = new MailMessage();
                appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                appraiserMail.Subject = "Thank You for Contacting Us";
                appraiserMail.To.Add(new MailAddress(email));

                string appraiserMessage = $"Dear User,\n\n";
                appraiserMessage += $"Thank you for reaching out to us. Your message has been received, and we will get back to you as soon as possible.\n";
                appraiserMessage += $"We appreciate your patience and look forward to assisting you.\n\n";
                appraiserMessage += $"Best regards,\n";
                appraiserMessage += $"Support Team\n";
                appraiserMessage += $"Appraisal Land\n";



                appraiserMail.Body = appraiserMessage;

                NetworkCredential info = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = info,
                    EnableSsl = true
                };

                smtp.Send(appraiserMail);
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }
    }
}
