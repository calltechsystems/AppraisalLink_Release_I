using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using DBL.Backend;
using DBL.Models;
////using DBL.NewModels;
using Microsoft.Extensions.Options;
using PayPal.Api;
using DAL.Classes;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    public class ServicesMiddleware : ServicesMiddlewareHelpers, IServicesMiddleware
    {
        Logs Logs = new Logs();
        private readonly ApplicationSettings _applicationSettings;
        private readonly AppraisallandsContext _AppraisallandContext;

        public ServicesMiddleware(ApplicationSettings appSettings)
        {
            _applicationSettings = appSettings;
            _AppraisallandContext = new AppraisallandsContext();
        }
        public ServiceResponse<string> PaymentUrl(string planName, long UserId)
        {
            var serviceResponse = new ServiceResponse<string>();
            try
            {
                var user_type = _AppraisallandContext.UserInformations.Where(x => x.UserId == UserId).Select(x => x.UserType).FirstOrDefault();
                var product = _AppraisallandContext.Plans.Where(x => x.PlanName.ToLower() == planName.ToLower() && x.UserType == user_type).FirstOrDefault();
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
                cartAmount = product.PlanValidity;

                var payer = new Payer() { payment_method = "paypal" };
                var redirUrls = new RedirectUrls()
                {
                    cancel_url = payment.SiteURL + "?cancel=true",
                    return_url = $"{payment.SiteURL}?UserId={UserId}&PlanId={product.Id}"
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
                serviceResponse.Message = $"Error while making payment, please retry.";
                serviceResponse.Error = error;
                serviceResponse.Success = false;
            }
            return serviceResponse;
        }

        public bool IsValid(long id)
        {
            var Isvalid = _AppraisallandContext.UserInformations.Where(x => x.UserId == id).FirstOrDefault();
            if (Isvalid != null)
            {
                return true;
            }
            return false;
        }

        public bool sendSubcriptionMail(string email, string planName)
        {

            try
            {
                string pswd = "odkzjyvtiwmtdjtq";
                MailMessage appraiserMail = new MailMessage();
                appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                appraiserMail.Subject = "Subscription Successful";
                appraiserMail.To.Add(new MailAddress(email));

                string appraiserMessage = $"Dear User,\n\n";
                appraiserMessage += $"Congratulations! Your subscription has been successfully activated with the following plan:\n";
                appraiserMessage += $"[Plan Name:{planName}]\n\n";
                appraiserMessage += $"Thank you for choosing our services. If you have any queries, feel free to reach out.\n\n";
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

        public bool sendCncelSubcriptionMail(string email)
        {
            try
            {
                string pswd = "odkzjyvtiwmtdjtq";
                MailMessage appraiserMail = new MailMessage();
                appraiserMail.From = new MailAddress("pradhumn7078@gmail.com");
                appraiserMail.Subject = "Subscription Cancellation Confirmation";
                appraiserMail.To.Add(new MailAddress(email));
                string appraiserMessage = $"Dear User,\n\n";
                appraiserMessage += $"We regret to inform you that your subscription has been cancelled.\n";
                appraiserMessage += $"Thank you for being a part of our community. If you have any queries, feel free to reach out.\n\n";
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

        public bool postSubscriptionsDetails(PaymentPyload subscription)
        {
            try
            {
                PaypalTransactionLog paypaltransactionLog = new PaypalTransactionLog();
                var PlanDetails = _AppraisallandContext.Plans.Where(x => x.Id == subscription.PlanId).FirstOrDefault();

                TimeZoneInfo easternTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
                DateTime createTimeEst = TimeZoneInfo.ConvertTimeFromUtc(subscription.CreateTime, easternTimeZone);

                DateTime endDateEst = createTimeEst.AddDays(30);

                var topUpProperty = _AppraisallandContext.Topups
                  .FirstOrDefault(x => x.Id == subscription.TopUpId);

                if (subscription == null)
                {
                    return false;
                }

                paypaltransactionLog.Userid = subscription.UserId;
                paypaltransactionLog.Paymentid = subscription.PaymentId;
                paypaltransactionLog.Planid = Convert.ToString(subscription.PlanId);
                paypaltransactionLog.Totalpropertiesofplan = topUpProperty.NoOfProperties;
                paypaltransactionLog.Paymenttype = "One Time";
                paypaltransactionLog.Stratdate = createTimeEst;
                paypaltransactionLog.Enddate = endDateEst;
                paypaltransactionLog.Paymentrequestsent = subscription.PaymentRequestSent;
                paypaltransactionLog.Paymentresponsereceived = subscription.PaymentResponseReceived;
                paypaltransactionLog.Status = subscription.Status;
                paypaltransactionLog.Currencycode = subscription.CurrencyCode;
                _AppraisallandContext.PaypalTransactionLogs.Add(paypaltransactionLog);
                _AppraisallandContext.SaveChanges();
                //paypaltransactionLog.Currencycode = subscription.CurrencyCode;
                //paypaltransactionLog.Brandname = recurringPayPalSubscription.ApplicationContext.BrandName;
                //paypaltransactionLog.Useraction = recurringPayPalSubscription.ApplicationContext.UserAction;
                //paypaltransactionLog.Returnurl = recurringPayPalSubscription.ApplicationContext.ReturnUrl;
                //paypaltransactionLog.Cancelurl = recurringPayPalSubscription.ApplicationContext.CancelUrl;
                //paypaltransactionLog.Locale = recurringPayPalSubscription.ApplicationContext.Locale;
                //paypaltransactionLog.PaymentSource = recurringPayPalSubscription.PaymentSource.Source;
                //paypaltransactionLog.SubscriberProfileName = recurringPayPalSubscription.Subscriber.ProfileName;
                //paypaltransactionLog.SubscriberEmailId = recurringPayPalSubscription.Subscriber.EmailId;
                //paypaltransactionLog.SubscriberPhoneId = recurringPayPalSubscription.Subscriber.PhoneId;

                //if (subscription.Status.ToUpper()== "COMPLETED")
                //{
                    Subscription subscription1 = new Subscription();
                    subscription1.StartDate = createTimeEst;
                    subscription1.EndDate = endDateEst;
                    subscription1.PlanId = subscription.PlanId;
                    subscription1.UserId = subscription.UserId;
                    subscription1.TopUpId = subscription.TopUpId;
                    subscription1.Status = subscription.Status;
                    subscription1.PaymentId= subscription.PaymentId;
                    subscription1.CurrencyCode = subscription.CurrencyCode;
                    _AppraisallandContext.Subscriptions.Add(subscription1);
                    _AppraisallandContext.SaveChanges();


                var payTransactionLogsDetails = _AppraisallandContext.TransactionLogs.FirstOrDefault(x => x.UserId == subscription.UserId && x.IsActive==true);

              

                if (topUpProperty == null)
                {
                    Logs.writeLog("Error: TopUpPropertyCount is null.");
                    return false;
                }
                else
                {
                    Logs.writeLog("TopUpPropertyCount: " + topUpProperty.NoOfProperties);

                    if (payTransactionLogsDetails != null)
                    {
                        payTransactionLogsDetails.TotalProperties =
                            (short)(payTransactionLogsDetails.TotalProperties + (topUpProperty.NoOfProperties ?? 0));

                        _AppraisallandContext.TransactionLogs.Update(payTransactionLogsDetails);
                        _AppraisallandContext.SaveChanges();

                        Logs.writeLog("SaveChanges executed successfully.");
                        Logs.writeLog("Updated TotalProperties: " + payTransactionLogsDetails.TotalProperties);
                    }
                    else
                    {
                        Logs.writeLog("Warning: No active transaction log found for the user.");
                    }
                }

                //var PayTransactionLogsDetails= _AppraisallandContext.TransactionLogs.Where(x => x.UserId == subscription.UserId && x.IsActive==true).FirstOrDefault();
                // var TopUpPropertyCount= _AppraisallandContext.Topups.Where(x=>x.Id== subscription.TopUpId).FirstOrDefault();
                // Logs.writeLog(" TopUpPropertyCount------------------" + TopUpPropertyCount.NoOfProperties);
                // if (PayTransactionLogsDetails!=null)
                // {
                //     PayTransactionLogsDetails.TotalProperties = (short)(PayTransactionLogsDetails.TotalProperties + TopUpPropertyCount.NoOfProperties);
                //     _AppraisallandContext.TransactionLogs.Update(PayTransactionLogsDetails);
                //     _AppraisallandContext.SaveChanges();
                //     Logs.writeLog(" TopUpPropertyCount------------------" + "SaveChanges");
                //     Logs.writeLog("  PayTransactionLogsDetails.TotalProperties------------------" + PayTransactionLogsDetails.TotalProperties);
                // }
                //    return true;
                //}
                //else
                //{
                //    return false;
                //}
                return true; 
            }
            catch (Exception ex)
            {
                Logs.writeLog(" postSubscriptionsDetails Catch------------------" + ex.Message);
                return false;
            }
        }

        public async Task<bool> postRecurringSubscriptionsDetails(RecurringPayPalSubscription recurringPayPalSubscription)
        {
            try
            {

           
            Logs.writeLog("postRecurringSubscriptionsDetails start");
            bool transaction_LogIsActive= true;
          var subDetails= await  _AppraisallandContext.Subscriptions.Where(x => x.UserId == recurringPayPalSubscription.UserId && x.EndDate >= DateTime.Now).FirstOrDefaultAsync();
          var ActivePlanDetails= await  _AppraisallandContext.TransactionLogs.Where(x => x.UserId == recurringPayPalSubscription.UserId && x.IsActive==true).FirstOrDefaultAsync();
            Logs.writeLog("if (subDetails!=null)");
            if (subDetails!=null)
            {
                transaction_LogIsActive = false;
            }
            if (ActivePlanDetails != null)
            {
                recurringPayPalSubscription.StartTime = ActivePlanDetails.EndDate?.AddDays(1) ?? DateTime.UtcNow.AddDays(1);
            }
            TimeZoneInfo easternTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            DateTime createTimeEst = TimeZoneInfo.ConvertTimeFromUtc(recurringPayPalSubscription.StartTime, easternTimeZone);

            DateTime endDateEst = createTimeEst.AddDays(30);
            Logs.writeLog("DateTime------------------");
            PaypalTransactionLog transactionLog = new PaypalTransactionLog();
            Subscription subscription=new Subscription();
                Logs.writeLog("PlanId------------------"+ recurringPayPalSubscription.newPlanId);
                var PlanDetails =await _AppraisallandContext.Plans.Where(x => x.Id == recurringPayPalSubscription.newPlanId).FirstOrDefaultAsync();
            if (PlanDetails != null)
            {
                Logs.writeLog("PlanDetails------------------"+ PlanDetails.PlanName);
                transactionLog.Userid = recurringPayPalSubscription.UserId;
                transactionLog.Paymentid = recurringPayPalSubscription.PaymentId;
                transactionLog.Planid =Convert.ToString(recurringPayPalSubscription.newPlanId);
                transactionLog.Totalpropertiesofplan = PlanDetails.NoOfProperties;
                transactionLog.Paymenttype = recurringPayPalSubscription.Paymenttype;
                transactionLog.Stratdate = createTimeEst;
                transactionLog.Enddate = endDateEst;
                transactionLog.Paymentrequestsent = recurringPayPalSubscription.PaymentRequestSent;
                transactionLog.Paymentresponsereceived = recurringPayPalSubscription.PaymentRequestReceived;
                transactionLog.Status = recurringPayPalSubscription.PaymentStatus;
                transactionLog.Currencycode = recurringPayPalSubscription.Currencycode;
                transactionLog.Brandname = recurringPayPalSubscription.ApplicationContext.BrandName;
                transactionLog.Useraction = recurringPayPalSubscription.ApplicationContext.UserAction;
                transactionLog.Returnurl = recurringPayPalSubscription.ApplicationContext.ReturnUrl;
                transactionLog.Cancelurl = recurringPayPalSubscription.ApplicationContext.CancelUrl;
                transactionLog.Locale = recurringPayPalSubscription.ApplicationContext.Locale;
                transactionLog.PaymentSource = recurringPayPalSubscription.PaymentSource.Source;
                transactionLog.SubscriberProfileName = recurringPayPalSubscription.Subscriber.ProfileName;
                transactionLog.SubscriberEmailId = recurringPayPalSubscription.Subscriber.EmailId;
                transactionLog.SubscriberPhoneId = recurringPayPalSubscription.Subscriber.PhoneId;
                transactionLog.SubscriptionId = recurringPayPalSubscription.paypalSubscriptionId;

                _AppraisallandContext.PaypalTransactionLogs.Add(transactionLog);
                _AppraisallandContext.SaveChanges();



                if (recurringPayPalSubscription.PaymentStatus.ToUpper() == "COMPLETED")
                {
                 Subscription subscription1 = new Subscription();
                subscription1.StartDate = createTimeEst;
                subscription1.EndDate = endDateEst;
                subscription1.PlanId =(short)recurringPayPalSubscription.newPlanId;
                subscription1.UserId = recurringPayPalSubscription.UserId;
                subscription1.Status = recurringPayPalSubscription.PaymentStatus;
                subscription1.PaymentId = recurringPayPalSubscription.PaymentId;
                subscription1.CurrencyCode = recurringPayPalSubscription.Currencycode;
                _AppraisallandContext.Subscriptions.Add(subscription1);
                _AppraisallandContext.SaveChanges();

                DBL.Models.TransactionLog transaction_Log = new DBL.Models.TransactionLog();
                transaction_Log.TransactionDetail = PlanDetails.PlanName;
                transaction_Log.UserId = recurringPayPalSubscription.UserId;
                transaction_Log.Paymentid = recurringPayPalSubscription.PaymentId;
                transaction_Log.CreatedTime = createTimeEst;
                transaction_Log.PlanAmount = PlanDetails.MonthlyAmount;
                transaction_Log.PlanName = PlanDetails.PlanName;
                transaction_Log.IsActive = transaction_LogIsActive;
                transaction_Log.StartDate = createTimeEst;
                transaction_Log.EndDate = endDateEst;
                transaction_Log.UsedProperties = 0;
                transaction_Log.PaypalSubscriptionStatus = "Active";
                transaction_Log.TotalProperties =PlanDetails.NoOfProperties;
                _AppraisallandContext.TransactionLogs.Add(transaction_Log);
                _AppraisallandContext.SaveChanges();
                }
                return true;
            }
            }
            catch (Exception ex)
            {
                Logs.writeLog("Catch------------------" + ex.Message);
            }

            return false;
        }

        public async Task<bool> cancelRecurringSubscription(CancelSubscriptionDetails recurringPayPalSubscription)
        {
            try
            {
                TimeZoneInfo easternTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
                DateTime createTimeEst = TimeZoneInfo.ConvertTimeFromUtc(recurringPayPalSubscription.CancellationDateTime, easternTimeZone);

                DateTime endDateEst = createTimeEst.AddDays(30);

                PaypalTransactionLog transactionLog = new PaypalTransactionLog();
                Logs.writeLog("PlanDetails------------------");
                transactionLog.Userid = recurringPayPalSubscription.UserId;
                transactionLog.Paymentid = recurringPayPalSubscription.PaymentId;
                transactionLog.Planid = Convert.ToString(recurringPayPalSubscription.PlanId);
                transactionLog.Totalpropertiesofplan = 0;
                transactionLog.Paymenttype = recurringPayPalSubscription.PaymentType;
                transactionLog.Stratdate = createTimeEst;
                transactionLog.Enddate = endDateEst;
                transactionLog.Paymentrequestsent = recurringPayPalSubscription.PaymentRequestSent;
                transactionLog.Paymentresponsereceived = recurringPayPalSubscription.PaymentRequestReceived;
                transactionLog.Status = recurringPayPalSubscription.PaymentStatus;
                transactionLog.Currencycode = recurringPayPalSubscription.CurrencyCode;
                transactionLog.Brandname = recurringPayPalSubscription.ApplicationContext.BrandName;
                transactionLog.Useraction = recurringPayPalSubscription.ApplicationContext.UserAction;
                transactionLog.Returnurl = recurringPayPalSubscription.ApplicationContext.ReturnUrl;
                transactionLog.Cancelurl = recurringPayPalSubscription.ApplicationContext.CancelUrl;
                transactionLog.Locale = recurringPayPalSubscription.ApplicationContext.Locale;
                transactionLog.PaymentSource = recurringPayPalSubscription.PaymentSource.Source;
                transactionLog.SubscriberProfileName = recurringPayPalSubscription.Subscriber.ProfileName;
                transactionLog.SubscriberEmailId = recurringPayPalSubscription.Subscriber.EmailId;
                transactionLog.SubscriberPhoneId = recurringPayPalSubscription.Subscriber.PhoneId;
                transactionLog.SubscriptionId = recurringPayPalSubscription.PaypalSubscriptionId;

                _AppraisallandContext.PaypalTransactionLogs.Add(transactionLog);
                _AppraisallandContext.SaveChanges();

                var transactionDetails=_AppraisallandContext.TransactionLogs.Where(x=>x.UserId== recurringPayPalSubscription.UserId && x.Paymentid== recurringPayPalSubscription.PaymentId).FirstOrDefault();
                transactionDetails.PaypalSubscriptionStatus="Cancel";
                _AppraisallandContext.TransactionLogs.Update(transactionDetails);
                _AppraisallandContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
