using DBL.Backend;
using DBL.Models;
using PayPal.Api;
using System.Net;
using System.Net.Mail;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class ServicesMiddlewareTopUp : ServicesMiddlewareHelpers, IServicesMiddlewareTopUp
    {
        private readonly ApplicationSettings _applicationSettings;
        private readonly AppraisallandsContext _AppraisallandContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appSettings"></param>
        public ServicesMiddlewareTopUp(ApplicationSettings appSettings)
        {
            _applicationSettings = appSettings;
            _AppraisallandContext = new AppraisallandsContext();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool IsValid(long id)
        {
            var Isvalid = _AppraisallandContext.UserInformations.Where(x => x.UserId == id).FirstOrDefault();
            if (Isvalid != null)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="paymentId"></param>
        /// <param name="token"></param>
        /// <param name="payerId"></param>
        /// <returns></returns>
        public ServiceResponse<Payment> MakePayment(string paymentId, string token, string payerId)
        {
            var serviceResponse = new ServiceResponse<Payment>();
            try
            {
                var apiContext = GetAPIContext(_applicationSettings.ClientId, _applicationSettings.ClientSecret);

                var paymentExecution = new PaymentExecution() { payer_id = payerId };
                var payment = new Payment() { id = paymentId };
                var executedPayment = new Payment();
                executedPayment = payment.Execute(apiContext, paymentExecution);

                if (executedPayment != null && executedPayment.state.ToLower().Equals("approved"))
                {
                    serviceResponse.Message = $"Payment {executedPayment.id} approved.";
                    serviceResponse.Success = true;
                    serviceResponse.Response = executedPayment;
                }
                else
                {
                    serviceResponse.Message = $"Payment {executedPayment.state}.";
                    serviceResponse.Success = false;
                    serviceResponse.Response = executedPayment;
                }
            }
            catch (Exception error)
            {
                serviceResponse.Message = $"Error while making payment, please retry.";
                serviceResponse.Error = error;
                serviceResponse.Success = false;
            }
            return serviceResponse;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public ServiceResponse<string> PaymentUrl(long userId)
        {
            var serviceResponse = new ServiceResponse<string>();
            try
            {
                var userDetail = _AppraisallandContext.UserInformations.Where(x => x.UserId == userId).FirstOrDefault();
                var topupDetail = _AppraisallandContext.Topups.Where(X => X.UserType == userDetail.UserType).FirstOrDefault();
                double cartAmount = 0;
                var itemList = new ItemList();
                var items = new List<Item>();

                var apiContext = GetAPIContext(_applicationSettings.ClientId, _applicationSettings.ClientSecret);

                var payment = new PaypalTopUpPayment();
                payment.SiteURL = topupDetail.ReturnUrl;
                payment.InvoiceNumber = $"{Guid.NewGuid()}";
                payment.Currency = topupDetail.CurrencyCode;
                //payment.Tax = $"{product.Tax}";
                // payment.ShippingFee = $"{product.ShippingFee}";
                payment.OrderDescription = $"{topupDetail.TopupDescription}";
                payment.Currency = topupDetail.CurrencyCode;
                payment.ProductList.Add(topupDetail);


                itemList.items = items;
                cartAmount = (double)topupDetail.TopUpAmount;

                var payer = new Payer() { payment_method = "paypal" };
                var redirUrls = new RedirectUrls()
                {
                    cancel_url = payment.SiteURL + "?cancel=true",
                    return_url = $"{payment.SiteURL}?UserId={userId}&TopUp={topupDetail.Id}"
                };

                var details = new Details()
                {
                    subtotal = cartAmount.ToString()
                };

                var paypalAmount = new Amount() { currency = payment.Currency, total = cartAmount.ToString(), details = details };

                var transactionList = new List<Transaction>();
                Transaction transaction = new Transaction();
                transaction.description = payment.OrderDescription;
                transaction.invoice_number = payment.InvoiceNumber;
                transaction.amount = paypalAmount;
                transactionList.Add(transaction);

                var processedPayment = new Payment()
                {
                    intent = "sale",
                    payer = payer,
                    transactions = transactionList,
                    redirect_urls = redirUrls
                };

                var createdPayment = processedPayment.Create(apiContext);
                var links = createdPayment.links.GetEnumerator();
                while (links.MoveNext())
                {
                    var link = links.Current;
                    if (link.rel.ToLower().Trim().Equals("approval_url"))
                    {
                        serviceResponse.Message = "Success";
                        serviceResponse.Success = true;
                        serviceResponse.Response = link.href;
                    }
                }
            }
            catch (Exception error)
            {
                serviceResponse.Message = $"Error while generating payment url, please retry.";
                serviceResponse.Error = error;
                serviceResponse.Success = false;
            }
            return serviceResponse;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <param name="topUpName"></param>
        /// <returns></returns>
        public bool sendMailBuyTopUpPlan(string email, string topUpName)
        {
            try
            {
                string pswd = "odkzjyvtiwmtdjtq";
                MailMessage appraiserMail = new MailMessage();
                appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                appraiserMail.Subject = "Top-Up Plan Purchased Successfully Top of Form";
                appraiserMail.To.Add(new MailAddress(email));

                string appraiserMessage = $"Dear User,\n\n";
                appraiserMessage += $"Congratulations! Your top-up plan has been purchased successfully with the following plan:\n";
                appraiserMessage += $"[TopUp Name:{topUpName}]\n\n";
                appraiserMessage += $"Thank you for choosing our services. If you have any queries, feel free to reach out.\n\n";
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