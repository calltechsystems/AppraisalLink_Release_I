using DAL.Classes;
using DBL.Models;
using System.Net;
using System.Net.Mail;

namespace DAL.Repository;

public class ContactUsRepository : IContactUsRepository
{
    private readonly AppraisalLandsContext _appraisalLandContext;

    public ContactUsRepository(AppraisalLandsContext appraisalLandContext)
    {
        _appraisalLandContext = appraisalLandContext;
    }

    public async Task CreateContactUsAsync(ContactUsDto contactUsReq)
    {
        var contactUs = new ContactUs
        {
            FirstName = contactUsReq.FirstName,
            LastName = contactUsReq.LastName,
            EmailAddress = contactUsReq.EmailAddress,
            UserLoggedIn = contactUsReq.UserLoggedIn,
            PhoneNumber = contactUsReq.PhoneNumber,
            Company = contactUsReq.Company,
            State = contactUsReq.State,
            Subject = contactUsReq.Subject,
            Description = contactUsReq.Description
        };
        await _appraisalLandContext.ContactUs.AddAsync(contactUs);
        await _appraisalLandContext.SaveChangesAsync();
        SendMailContactUs(contactUsReq.EmailAddress);
    }

    private static void SendMailContactUs(string email)
    {
        try
        {
            const string password = "odkzjyvtiwmtdjtq";
            var appraiserMail = new MailMessage();
            appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
            appraiserMail.Subject = "Thank You for Contacting Us";
            appraiserMail.To.Add(new MailAddress(email));

            var appraiserMessage = "Dear User,\n\n";
            appraiserMessage +=
                "Thank you for reaching out to us. Your message has been received, and we will get back to you as soon as possible.\n";
            appraiserMessage += "We appreciate your patience and look forward to assisting you.\n\n";
            appraiserMessage += "Best regards,\n";
            appraiserMessage += "Support Team\n";
            appraiserMessage += "Appraisal Land\n";


            appraiserMail.Body = appraiserMessage;

            var info = new NetworkCredential("pradhumn7078@gmail.com", password);
            var smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = info,
                EnableSsl = true
            };

            smtp.Send(appraiserMail);
        }
        catch (Exception)
        {
            // ignored
        }
    }
}