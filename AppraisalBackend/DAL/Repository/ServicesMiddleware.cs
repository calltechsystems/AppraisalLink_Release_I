using DBL.Backend;
using DBL.Models;
using PayPal.Api;
using System.Net;
using System.Net.Mail;
////using DBL.NewModels;

namespace DAL.Repository;

public class ServicesMiddleware : ServicesMiddlewareHelpers, IServicesMiddleware
{
    private readonly ApplicationSettings _applicationSettings;
    private readonly AppraisalLandsContext _AppraisallandContext;

    public ServicesMiddleware(ApplicationSettings appSettings)
    {
        _applicationSettings = appSettings;
        _AppraisallandContext = new AppraisalLandsContext();
    }

    public ServiceResponse<string> PaymentUrl(string planName, long UserId)
    {
        var serviceResponse = new ServiceResponse<string>();
        try
        {
            var user_type = _AppraisallandContext.UserInformations.Where(x => x.UserId == UserId)
                .Select(x => x.UserType).FirstOrDefault();
            var product = _AppraisallandContext.Plans
                .Where(x => x.PlanName.ToLower() == planName.ToLower() && x.UserType == user_type).FirstOrDefault();
            double cartAmount = 0;
            var itemList = new ItemList();
            var items = new List<Item>();

            var apiContext = GetAPIContext(_applicationSettings.ClientId, _applicationSettings.ClientSecret);

            var payment = new PaypalPayment();
            payment.SiteURL = product.Returnurl;
            payment.InvoiceNumber = $"{Guid.NewGuid()}";
            payment.Currency = product.Currencycode;
            //payment.Tax = $"{product.Tax}";
            // payment.ShippingFee = $"{product.ShippingFee}";
            payment.OrderDescription = $"{product.Description}";
            payment.Currency = product.Currencycode;
            payment.ProductList.Add(product);


            itemList.items = items;
            cartAmount = product.Amount;

            var payer = new Payer { payment_method = "paypal" };
            var redirUrls = new RedirectUrls
            {
                cancel_url = payment.SiteURL + "?cancel=true",
                return_url = $"{payment.SiteURL}?UserId={UserId}&PlanId={product.Id}"
            };

            var details = new Details
            {
                subtotal = cartAmount.ToString()
            };

            var paypalAmount = new Amount
            { currency = payment.Currency, total = cartAmount.ToString(), details = details };

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

    public ServiceResponse<Payment> MakePayment(string paymentId, string token, string payerId)
    {
        var serviceResponse = new ServiceResponse<Payment>();
        try
        {
            var apiContext = GetAPIContext(_applicationSettings.ClientId, _applicationSettings.ClientSecret);

            var paymentExecution = new PaymentExecution { payer_id = payerId };
            var payment = new Payment { id = paymentId };
            var executedPayment = new Payment();
            executedPayment = payment.Execute(apiContext, paymentExecution);

            if (executedPayment != null && executedPayment.state.ToLower().Equals("approved"))
            {
                //    using (var dbContext = new YourDbContext()) 
                //    {
                //        var transactionLog = new TransactionLog
                //        {
                //            Broker_Id = 
                //            Transaction_detail =

                //};

                //        dbContext.TransactionLogs.Add(transactionLog);
                //        dbContext.SaveChanges();
                //    }

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

    public bool IsValid(long id)
    {
        var Isvalid = _AppraisallandContext.UserInformations.Where(x => x.UserId == id).FirstOrDefault();
        if (Isvalid != null) return true;
        return false;
    }

    public bool sendSubcriptionMail(string email, string planName)
    {
        try
        {
            var pswd = "odkzjyvtiwmtdjtq";
            var appraiserMail = new MailMessage();
            appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
            appraiserMail.Subject = "Subscription Successful";
            appraiserMail.To.Add(new MailAddress(email));

            var appraiserMessage = "Dear User,\n\n";
            appraiserMessage +=
                "Congratulations! Your subscription has been successfully activated with the following plan:\n";
            appraiserMessage += $"[Plan Name:{planName}]\n\n";
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

    public bool sendCncelSubcriptionMail(string email)
    {
        try
        {
            var pswd = "odkzjyvtiwmtdjtq";
            var appraiserMail = new MailMessage();
            appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
            appraiserMail.Subject = "Subscription Cancellation Confirmation";
            appraiserMail.To.Add(new MailAddress(email));
            var appraiserMessage = "Dear User,\n\n";
            appraiserMessage += "We regret to inform you that your subscription has been cancelled.\n";
            appraiserMessage +=
                "Thank you for being a part of our community. If you have any queries, feel free to reach out.\n\n";
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