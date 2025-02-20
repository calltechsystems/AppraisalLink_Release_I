using System.Net;
using System.Net.Mail;

namespace AppraisalLand.Helper
{
    public class HelperService
    {
        private IConfiguration _configuration;
        public HelperService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendEmailToUser(List<string> email, string usertype, string OrderId)
        {
            var test = "";

            if (usertype == "Appraiser")
            {
                test = $@"<p>
                        Property <strong>Id - {OrderId}</strong>.
                        A <strong>new property</strong> has been added to Appraisal Land. We’d value your expert opinion.
                        </p>";
            }
            else if (usertype == "QuotesBroker")
            {
                test = $@"<p>
                        Property <strong>Id - {OrderId}</strong>.
                        <strong>new Quotes In your Property</strong>.
                        </p>";
            }
            else if (usertype == "BrokerProperty")
            {
                test = $@"<p>
                        Property <strong>Id - {OrderId}</strong>.
                        <strong>You are accept Quotes Successfully.</strong>.
                        </p>";
            }
            else if (usertype == "QuotesAppraiser")
            {
                test = $@"<p>
                        Property <strong>Id - {OrderId}</strong>.
                        <strong>Your Quotes successfully </strong>
                        </p>";
            }
            else
            {
                test = $@"<p>
                       Property <strong>Id - {OrderId}</strong>.
                       A <strong>your property</strong> has been added to Appraisal Land. We’d value your expert opinion.
                       </p>";
            }



            foreach (var emailItem in email)
            {
                var pswd = _configuration["EmailSettings:SmtpPassword"];
                var appraiserMail = new MailMessage
                {
                    From = new MailAddress(_configuration["EmailSettings:SmtpFrom"]),
                    Subject = "Your Expert Opinion Needed: New Property Listing on Appraisal Land",
                    IsBodyHtml = true
                };
                appraiserMail.To.Add(new MailAddress(emailItem));
                string emailBody = GetEmailBodyForBroker(test);
                appraiserMail.Body = emailBody;
                NetworkCredential info = new NetworkCredential(_configuration["EmailSettings:SmtpFrom"], pswd);
                SmtpClient smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = info,
                    EnableSsl = true
                };
                smtp.Send(appraiserMail);

            }
        }

        private string GetEmailBodyForBroker(string dynamicSection)
        {
            return $@"
              <!DOCTYPE html>
              <html lang='en'>
                <head>
                  <meta charset='UTF-8' />
                  <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                  <title>Email Content</title>
                  <style>
                    body {{
                      font-family: Arial, sans-serif;
                      margin: 20px;
                      background: #f4f4f9;
                    }}
                    .container {{
                      max-width: 900px;
                      margin: auto;
                      background: #fff;
                      border: 2px solid #2e008b;
                      padding: 20px;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }}
                    header {{
                      text-align: center;
                      padding-bottom: 10px;
                    }}
                    .right-corner {{
                      display: flex;
                      justify-content: end;
                      align-items: center;
                      margin-bottom: 20px;
                    }}
                    .right-corner img {{
                      margin-right: 5px;
                    }}
                    .button-container {{
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 10vh;
                      margin-bottom: 50px;
                    }}
                    .styled-button {{
                      background-color: #97d700;
                      color: #2e008b;
                      border: 1px solid #2e008b;
                      padding: 10px 40px;
                      font-size: 16px;
                      font-weight: bold;
                      border-radius: 5px;
                      cursor: pointer;
                      transition: background-color 0.3s ease;
                    }}
                    .styled-button:hover {{
                      background-color: rgb(243, 245, 243);
                      border: 2px solid #2e008b;
                      color: #2e008b;
                    }}
                    .details,
                    .items {{
                      margin: 20px 0;
                    }}
                    footer {{
                      text-align: start;
                      font-size: 0.9em;
                      font-weight: bold;
                    }}
                    .footer-section.contact-inline ul {{
                      list-style: none;
                      padding: 0;
                      margin: 0;
                    }}
                    .footer-section.contact-inline li {{
                      display: flex;
                      align-items: center;
                      margin-bottom: 10px;
                    }}
                    .footer-section.contact-inline img {{
                      margin-right: 10px;
                    }}
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
                      <h4>Dear User</h4>
                      <p>
                        Thank you for choosing
                        <span style=""margin-top: 25px; color: #2e008b; font-weight: bold"">
                          Appraisal
                        </span>
                        <span style=""margin-top: 25px; color: #97d700; font-weight: bold"">
                          Land
                        </span>.
                      </p>
                      
                      <div style=""text-align: center; margin-top: 40px"">
                        <!-- Inject dynamic content here -->
                        {dynamicSection}
                      </div>
                    </section>
                    <footer>
                      
                      <div class='footer-section contact-inline'>
                        <ul>
                          <li>
                            <img width='15' src='https://upload.wikimedia.org/wikipedia/commons/0/0d/EMail_Icone_%281%29.png' alt='Email' />
                            <a href='mailto:info@appraisalland.ca'>info@appraisalland.ca</a>
                          </li>
                          <li>
                            <img width='15' src='https://upload.wikimedia.org/wikipedia/commons/6/6c/Phone_icon.png' alt='Phone' />
                            <a href='tel:+13020001111'>+1302-000-1111</a>
                          </li>
                        </ul>
                        <ul>
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
                    <div class='social-media-icons'>
                        <a class=""fa fa-facebook mx-2"" href='https://facebook.com'>
                          <img width='30' src='https://upload.wikimedia.org/wikipedia/commons/1/16/Facebook-icon-1.png' alt='Facebook' />
                        </a>
                        <a href='https://instagram.com'>
                          <img width='30' src='https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' alt='Instagram' />
                        </a>
                        <a class=""fa fa-facebook mx-2"" href='https://youtube.com'>
                          <img width='30' src='https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png' alt='YouTube' />
                        </a>
                      </div>
                    <div style='font-size: 12px; text-align: center;'>
                      <p>
                        Please note that this email address is not monitored. For any inquiries, kindly direct your emails to
                        <a href='mailto:info@appraisalland.ca'>info@appraisalland.ca</a>.
                      </p>
                    </div>
                    
                  </div>
                </body>
              </html>";
        }
    }
}
