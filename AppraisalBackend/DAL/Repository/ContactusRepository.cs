using DAL.Classes;
using DBL.Models;
using System.Net;
using System.Net.Mail;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class ContactusRepository : IContactusRepository
    {
        private readonly AppraisallandsContext _appraisallandContext;

        /// <summary>
        /// /
        /// </summary>
        /// <param name="appraisallandContext"></param>
        public ContactusRepository(AppraisallandsContext appraisallandContext)
        {
            _appraisallandContext = appraisallandContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="contactU"></param>
        /// <returns></returns>
        public async Task CreateContactusAsync(ClsContactUs contactU)
        {
            Contactu contactUs = new Contactu();
            contactUs.FirstName = contactU.FirstName;
            contactUs.LastName = contactU.LastName;
            contactUs.EmailAddress = contactU.EmailAddress;
            contactUs.UserLoggedIn = contactU.UserLoggedIn;
            contactUs.PhoneNumber = contactU.PhoneNumber;
            contactUs.Company = contactU.Company;
            contactUs.State = contactU.State;
            contactUs.Subject = contactU.Subject;
            contactUs.Description = contactU.Description;
            await _appraisallandContext.Contactus.AddAsync(contactUs);
            await _appraisallandContext.SaveChangesAsync();
            sendMailContactUs(contactU.EmailAddress);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
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

                NetworkCredential credential = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = credential,
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
