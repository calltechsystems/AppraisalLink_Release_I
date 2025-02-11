using DBL.Models;
using Microsoft.EntityFrameworkCore;

//using DBL.NewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class TransactionService : ITransactionService
    {
        private readonly AppraisallandsContext _context;

        public TransactionService(AppraisallandsContext context)
        {
            _context=context;
        }

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
                foreach (var sub in subscriptions)
                {
                    var PlanName = "";
                    DateTime dateTime = DateTime.Now;
                    double PlanAmount = 0;
                    if (sub.TopUpId != null)
                    {
                        var plan = _context.Plans.Where(x => sub.PlanId == x.Id).FirstOrDefault();
                        var TopUpDetails = _context.Topups.Where(x => x.Id == sub.TopUpId).FirstOrDefault();
                        PlanName = TopUpDetails.Topupname;
                        PlanAmount= ((double)TopUpDetails.TopUpAmount);
                        dateTime = sub.EndDate;
                    }
                    else
                    {
                        var plan = _context.Plans
                                .Where(x => sub.PlanId == x.Id).FirstOrDefault();
                        PlanName = plan.PlanName;
                        PlanAmount = (double)plan.MonthlyAmount;
                        dateTime= sub.EndDate;

                    }
                      
                    var Trans=_context.TransactionLogs.Where(x=>x.IsActive==true && x.UserId== userId).FirstOrDefault();
                    if (Trans.Paymentid== sub.PaymentId)
                    {
                        isActive = true;
                    }
                    else
                    {
                        isActive = false;
                    }
                     transactionLogs.Add(new TransactionLog
                        {
                            Paymentid = sub.PaymentId,
                            PlanName = PlanName,
                            PlanAmount = PlanAmount,
                            StartDate = sub.StartDate,
                            EndDate = dateTime,
                            IsActive = isActive
                        });
                    
                }
            }

            return transactionLogs;
        }

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
                                   <img width='60' height='60' src='https://appraisalfile.s3.amazonaws.com/image/Appraiser-land.jpeg?X-Amz-Expires=900&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYS2NR75VZTQQ5O4I%2F20250211%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250211T144834Z&X-Amz-SignedHeaders=host&X-Amz-Signature=58333d21d640a2bfe618e4d6bb06e42049c105730b05bbadafa6721e192de519' alt='Appraisal Land Logo' />
                                   <span style='color: #2e008b; font-weight: bold;'>Appraisal</span>
                                   <span style='color: #97d700; font-weight: bold;'>Land</span>
                                 </div>
                               </header>
                               <section>
                                <h1>
                                 Welcome my body 
                                </h1>
                                 <h1>
                                 This is test body 
                                </h1>
                                 <h1>
                                 This is test body
                                </h1>
                                 <h1>
                                This is test body
                                </h1>
                               </section>
                               <footer>
                                 <div class='social-media-icons'>
                                   <!-- Online links to social media icons -->
                                   <a href='https://facebook.com'><img width='30' src='https://appraisalfile.s3.amazonaws.com/image/icons8-facebook-48.png?X-Amz-Expires=900&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYS2NR75VZTQQ5O4I%2F20250211%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250211T150118Z&X-Amz-SignedHeaders=host&X-Amz-Signature=60aad3fd60051d33ce1b14de3920a9743c50600f35ae2b4eb40e6b43e3dfd8d4' alt='Facebook' /></a>
                                   <a href='https://instagram.com'><img width='30' src='https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' alt='Instagram' /></a>
                                   <a href='https://youtube.com'><img width='30' src='https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png' alt='YouTube' /></a>
                                 </div>
                                 <div class='footer-section contact-inline'>
                                    <ul>
                                      <li>
                                        <img width='15' src='https://appraisalfile.s3.amazonaws.com/image/email.png?X-Amz-Expires=900&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYS2NR75VZTQQ5O4I%2F20250211%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250211T145625Z&X-Amz-SignedHeaders=host&X-Amz-Signature=8510c47ed6fe5133173f51b6ae9d3d80a3d0528e380e08e598ffe7e68d68dc55' alt='Email' />
                                        <a href='mailto:info@appraisalland.ca'>info@appraisalland.ca</a>
                                      </li>
                                      <li>
                                        <img width='15' src='https://appraisalfile.s3.amazonaws.com/image/icons8-phone-50.png?X-Amz-Expires=900&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYS2NR75VZTQQ5O4I%2F20250211%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250211T145629Z&X-Amz-SignedHeaders=host&X-Amz-Signature=1e4e51a1145e1c2ea8c20cfad023da75432aae4323df345382de39307bd2b4d6' alt='Phone' />
                                        <a href='tel:+13020001111'>+1302-000-1111</a>
                                      </li>
                                    </ul>
                                     <li>
                                       <img width='15' src='https://appraisalfile.s3.amazonaws.com/image/map.png?X-Amz-Expires=900&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYS2NR75VZTQQ5O4I%2F20250211%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250211T150509Z&X-Amz-SignedHeaders=host&X-Amz-Signature=36ee07bff047ca0cb126da8890dad7919671d69f674a4e9ddae60e14effa74db' alt='Location' />
                                       123 Main Street, Brampton, LX23Y2, Ontario.
                                     </li>
                                     <li>
                                       <img width='15' src='https://appraisalfile.s3.amazonaws.com/image/Appraiser-land.jpeg?X-Amz-Expires=900&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYS2NR75VZTQQ5O4I%2F20250211%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250211T150417Z&X-Amz-SignedHeaders=host&X-Amz-Signature=77f6ac09b93b0be242546ddf7c25cbbb6123572c1c0099349cfd8df9dba3d647' alt='Website' />
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
                NetworkCredential info = new NetworkCredential("pradhumn7078@gmail.com", pswd);

                // Create the SMTP client and configure it
                SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587, // Using the standard port for Gmail SMTP
                    Credentials = info, // Provide credentials
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
