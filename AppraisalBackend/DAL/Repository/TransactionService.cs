using DBL.Models;
using System.Net;
using System.Net.Mail;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class TransactionService : ITransactionService
    {
        private readonly AppraisallandsContext _context;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public TransactionService(AppraisallandsContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<TransactionLog> GetTransactionsByUserId(int userId)
        {
            // Send();
            bool isActive = false;
            List<TransactionLog> transactionLogs = new List<TransactionLog>();

            // Fetch transactions & subscriptions synchronously
            var transactions = _context.TransactionLogs
                                       .Where(x => x.UserId == userId)
                                       .ToList();

            var subscriptions = _context.Subscriptions
                                        .Where(x => x.UserId == userId)
                                        .ToList();

            if (subscriptions.Any()) // Ensure there are subscriptions
            {
                foreach (var subscription in subscriptions)
                {
                    var planName = "";
                    DateTime dateTime = DateTime.Now;
                    double planAmount = 0;
                    if (subscription.TopUpId != null)
                    {
                        var plan = _context.Plans.Where(x => subscription.PlanId == x.Id).FirstOrDefault();
                        var topUpDetail = _context.Topups.Where(x => x.Id == subscription.TopUpId).FirstOrDefault();
                        planName = topUpDetail.TopupName;
                        planAmount = ((double)topUpDetail.TopUpAmount);
                        dateTime = subscription.EndDate;
                    }
                    else
                    {
                        var planDetail = _context.Plans
                                .Where(x => subscription.PlanId == x.Id).FirstOrDefault();
                        planName = planDetail.PlanName;
                        planAmount = (double)planDetail.MonthlyAmount;
                        dateTime = subscription.EndDate;
                    }

                    var transactionLogDetail = _context.TransactionLogs.Where(x => x.IsActive == true && x.UserId == userId).FirstOrDefault();
                    if (transactionLogDetail.PaymentId == subscription.PaymentId)
                    {
                        isActive = true;
                    }
                    else
                    {
                        isActive = false;
                    }
                    transactionLogs.Add(new TransactionLog
                    {
                        PaymentId = subscription.PaymentId,
                        PlanName = planName,
                        PlanAmount = planAmount,
                        StartDate = subscription.StartDate,
                        EndDate = dateTime,
                        IsActive = isActive
                    });
                }
            }
            return transactionLogs;
        }

        /// <summary>
        /// 
        /// </summary>
        public void Send()
        {
            try
            {
                // Create the MailMessage object
                MailMessage appraiserMail = new MailMessage();
                appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                appraiserMail.Subject = "Your Expert Opinion Needed: New Property Listing on Appraisal Land";
                appraiserMail.To.Add(new MailAddress("Pradhumn73022@gmail.com"));
                appraiserMail.IsBodyHtml = true;
                string pswd = "odkzjyvtiwmtdjtq"; // Password for the sender's email
                // HTML email body content
                string emailBody = @"
                        <!DOCTYPE html>
                 <html lang='en'>
                   <head>
                     <meta charset='UTF-8' />
                     <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                     <title>Email Content</title>
                     <style>
                       body {
                         font-family: Arial, sans-serif;
                         margin: 20px;
                         background: #f4f4f9;
                       }
                       .container {
                         max-width: 900px;
                         margin: auto;
                         background: #fff;
                         border: 2px solid #2e008b;
                         padding: 20px;
                         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                       }
                       header {
                         text-align: center;
                         padding-bottom: 10px;
                       }
                       .right-corner {
                         display: flex;
                         justify-content: end;
                         align-items: center;
                         margin-bottom: 20px;
                       }
                       .right-corner img {
                         margin-right: 5px;
                       }
                       .button-container {
                         display: flex;
                         justify-content: center;
                         align-items: center;
                         height: 10vh;
                         margin-bottom: 50px;
                       }
                       .styled-button {
                         background-color: #97d700;
                         color: #2e008b;
                         border: 1px solid #2e008b;
                         padding: 10px 40px;
                         font-size: 16px;
                         font-weight: bold;
                         border-radius: 5px;
                         cursor: pointer;
                         transition: background-color 0.3s ease;
                       }
                       .styled-button:hover {
                         background-color: rgb(243, 245, 243);
                         border: 2px solid #2e008b;
                         color: #2e008b;
                       }
                       .details,
                       .items {
                         margin: 20px 0;
                       }
                       footer {
                         text-align: start;
                         font-size: 0.9em;
                         font-weight: bold;
                       }
                       .footer-section.contact-inline ul {
                         list-style: none;
                         padding: 0;
                         margin: 0;
                       }
                       .footer-section.contact-inline li {
                         display: flex;
                         align-items: center;
                         margin-bottom: 10px;
                       }
                       .footer-section.contact-inline img {
                         margin-right: 10px;
                       }
                     </style>
                   </head>
                   <body>
                     <div class='container'>
                       <header>
                         <div class='right-corner'>
                           <img width='60' height='60' src='https://appraisal-eta.vercel.app/_next/image?url=%2Fassets%2Fimages%2FAppraisal_Land_Logo.png&w=48&q=75' alt='Appraisal Land Logo' />
                           <span style='color: #2e008b; font-weight: bold;'>Appraisal</span>
                           <span style='color: #97d700; font-weight: bold;'>Land</span>
                         </div>
                       </header>
                        <section class=""details"">
                         <h4>Dear XYZ</h4>
                         <p>
                           Thank you for choosing
                           <span style=""margin-top: 25px; color: #2e008b; font-weight: bold"">
                             Appraisal
                           </span>
                           <span style=""margin-top: 25px; color: #97d700; font-weight: bold"">
                             Land </span
                           >.
                         </p>
                         <p>
                           A <strong>new property</strong> has been added to Appraisal Land, We’d
                           value your expert opinion. Property <strong>Id - 1212</strong> .
                         </p>
                         <div style=""text-align: center; margin-top: 40px"">
                           <p>Please take a moment to view the listing using this link.</p>
                         </div>
                       </section>
                       <footer>
                         <div class='social-media-icons'>
                           <!-- Online links to social media icons -->
                           <a class=""fa fa-facebook mx-2"" href='https://facebook.com'><img width='30' src='https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' alt='Facebook' /></a>
                           <a  href='https://instagram.com'><img width='30' src='https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' alt='Instagram' /></a>
                           <a class=""fa fa-facebook mx-2"" href='https://youtube.com'><img width='30' src='https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png' alt='YouTube' /></a>
                         </div>
                         <div class='footer-section contact-inline'>
                            <ul>
                              <li>
                                <img width='15' src='https://upload.wikimedia.org/wikipedia/commons/0/0d/EMail_Icone_%281%29.png' alt='Email' />
                                <a href='mailto:info@appraisalland.ca'>info@appraisalland.ca</a>
                              </li>
                              <li>
                                <img width='15' src='https://upload.wikimedia.org/wikipedia/commons/2/21/Deepin_Icon_Theme_%E2%80%93_deepin-phone-assistant_%28edited%29.svg' alt='Phone' />
                                <a href='tel:+13020001111'>+1302-000-1111</a>
                              </li>
                            </ul>
                             <li>
                               <img width='15' src='https://upload.wikimedia.org/wikipedia/commons/e/eb/Address_-_icon.png' alt='Location' />
                               123 Main Street, Brampton, LX23Y2, Ontario.
                             </li>
                             <li>
                               <img width='15' src='https://appraisal-eta.vercel.app/_next/image?url=%2Fassets%2Fimages%2FAppraisal_Land_Logo.png&w=48&q=75' alt='Website' />
                               <a href='https://appraisal-eta.vercel.app'>appraisalland.ca</a>
                             </li>
                           </ul>
                         </div>
                       </footer>
                       <div style='font-size: 12px; text-align: center;'>
                         <p>
                           Please note that this email address is not monitored. For any inquiries, kindly direct your emails to
                           <a href='mailto:info@appraisalland.ca'>info@appraisalland.ca</a>.
                         </p>
                       </div>
                     </div>
                   </body>
                 </html>";

                // Set the email body
                appraiserMail.Body = emailBody;
                // Create NetworkCredential object for authentication
                NetworkCredential credential = new NetworkCredential("pradhumn7078@gmail.com", pswd);
                // Create the SMTP client and configure it
                SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587, // Using the standard port for Gmail SMTP
                    Credentials = credential, // Provide credentials
                    EnableSsl = true // Enable SSL for secure connection
                };
                // Send the email
                smtp.Send(appraiserMail);
                Console.WriteLine("Email sent successfully!");
            }
            catch (Exception ex)
            {
                // Handle any errors that occur during the email sending process
                Console.WriteLine("Error sending email: " + ex.Message);
            }
        }

        //public async Task<List<TransactionLog>> GetTransactionsByUserId(int userId)
        //{
        //    bool Is_Active=false;
        //    List<TransactionLog> transactionLogs=new List<TransactionLog> ();
        //    var transaction=_context.TransactionLogs.Where(x=>x.UserId==userId).ToList();

        //    var subcription=_context.Subscriptions.Where(x=>x.UserId==userId).ToList();
        //   if (subcription != null)
        //    {
        //        foreach (var sub in subcription)
        //        {
        //            if (transaction.Paymentid==sub.PaymentId)
        //            {
        //                Is_Active = true;
        //            }
        //            var Plan=_context.Plans.Where(x=>x.Id==sub.PlanId).FirstOrDefault();
        //            TransactionLog ObjtransactionLogs = new TransactionLog();
        //            ObjtransactionLogs.Paymentid = sub.PaymentId;
        //            ObjtransactionLogs.PlanName= Plan.PlanName;
        //            ObjtransactionLogs.PlanAmount= Plan.MonthlyAmount;
        //            ObjtransactionLogs.StartDate= sub.StartDate;
        //            ObjtransactionLogs.EndDate= sub.EndDate;
        //            ObjtransactionLogs.IsActive= Is_Active;
        //            transactionLogs.Add(ObjtransactionLogs);
        //        }
        //        return transactionLogs;
        //    }
        //    return null;
        //}
    }
}
