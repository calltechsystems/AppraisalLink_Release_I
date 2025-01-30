using System.Net;
using System.Net.Mail;
using DBL.Backend;
using DBL.Models;
using PayPal.Api;

namespace DAL.Repository;

public class ServicesMiddlewareTopUp : ServicesMiddlewareHelpers, IServicesMiddlewareTopUp
{
    private readonly ApplicationSettings _applicationSettings;
    private readonly AppraisallandsContext _AppraisallandContext;

    public ServicesMiddlewareTopUp(ApplicationSettings appSettings)
    {
        _applicationSettings = appSettings;
        _AppraisallandContext = new AppraisallandsContext();
    }

    public bool IsValid(long id)
    {
        var Isvalid = _AppraisallandContext.UserInformations.Where(x => x.UserId == id).FirstOrDefault();
        if (Isvalid != null) return true;
        return false;
    }

    public ServiceResponse<Payment> MakePayment(string paymentId, string token, string payerId)
    {
        var serviceResponse = new ServiceResponse<Payment>();
        try
        {
            var apiContext = GetAPIContext(_applicationSettings.ClientId, _applicationSettings.ClientSecret);

            var paymentExecution = new PaymentExecution {payer_id = payerId};
            var payment = new Payment {id = paymentId};
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
            serviceResponse.Message = "Error while making payment, please retry.";
            serviceResponse.Error = error;
            serviceResponse.Success = false;
        }

        return serviceResponse;
    }

    public ServiceResponse<string> PaymentUrl(long UserId)
    {
        var serviceResponse = new ServiceResponse<string>();
        try
        {
            var userDetails = _AppraisallandContext.UserInformations.Where(x => x.UserId == UserId).FirstOrDefault();
            var product = _AppraisallandContext.Topups.Where(X => X.UserType == userDetails.UserType).FirstOrDefault();
            double cartAmount = 0;
            var itemList = new ItemList();
            var items = new List<Item>();

            var apiContext = GetAPIContext(_applicationSettings.ClientId, _applicationSettings.ClientSecret);

            var payment = new PaypalTopUpPayment();
            payment.SiteURL = product.ReturnUrl;
            payment.InvoiceNumber = $"{Guid.NewGuid()}";
            payment.Currency = product.Currencycode;
            //payment.Tax = $"{product.Tax}";
            // payment.ShippingFee = $"{product.ShippingFee}";
            payment.OrderDescription = $"{product.TopupDescription}";
            payment.Currency = product.Currencycode;
            payment.ProductList.Add(product);


            itemList.items = items;
            cartAmount = (double) product.TupUpAmount;

            var payer = new Payer {payment_method = "paypal"};
            var redirUrls = new RedirectUrls
            {
                cancel_url = payment.SiteURL + "?cancel=true",
                return_url = $"{payment.SiteURL}?UserId={UserId}&TopUp={product.Id}"
            };

            var details = new Details
            {
                subtotal = cartAmount.ToString()
            };

            var paypalAmount = new Amount
                {currency = payment.Currency, total = cartAmount.ToString(), details = details};

            var transactionList = new List<Transaction>();
            var transaction = new Transaction();
            transaction.description = payment.OrderDescription;
            transaction.invoice_number = payment.InvoiceNumber;
            transaction.amount = paypalAmount;
            transactionList.Add(transaction);

            var processedPayment = new Payment
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
            serviceResponse.Message = "Error while generating payment url, please retry.";
            serviceResponse.Error = error;
            serviceResponse.Success = false;
        }

        return serviceResponse;
    }

    public bool sendMailBuyTopUpPlan(string email, string TopUpname)
    {
        try
        {
            var pswd = "odkzjyvtiwmtdjtq";
            var appraiserMail = new MailMessage();
            appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
            appraiserMail.Subject = "Top-Up Plan Purchased Successfully Top of Form";
            appraiserMail.To.Add(new MailAddress(email));

            var appraiserMessage = "Dear User,\n\n";
            appraiserMessage +=
                "Congratulations! Your top-up plan has been purchased successfully with the following plan:\n";
            appraiserMessage += $"[TopUp Name:{TopUpname}]\n\n";
            appraiserMessage +=
                "Thank you for choosing our services. If you have any queries, feel free to reach out.\n\n";
            appraiserMessage += "Best regards,\n";
            appraiserMessage += "Support Team\n";
            appraiserMessage += "Appraisal Land\n";


            appraiserMail.Body = appraiserMessage;

            var info = new NetworkCredential("pradhumn7078@gmail.com", pswd);
            var smtp = new SmtpClient("smtp.gmail.com")
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