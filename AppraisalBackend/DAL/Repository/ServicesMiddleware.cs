using AppraisalLand.Common.Enums;
using DAL.Classes;
using DBL.Backend;
using DBL.Models;
using Microsoft.EntityFrameworkCore;
using PayPal.Api;
using System.Net;
using System.Net.Mail;

namespace DAL.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class ServicesMiddleware : ServicesMiddlewareHelpers, IServicesMiddleware
    {
        Logs Logs = new Logs();
        private readonly ApplicationSettings _applicationSettings;
        private readonly AppraisallandsContext _appraisallandContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appSettings"></param>
        public ServicesMiddleware(ApplicationSettings appSettings)
        {
            _applicationSettings = appSettings;
            _appraisallandContext = new AppraisallandsContext();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="planName"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public ServiceResponse<string> PaymentUrl(string planName, long userId)
        {
            var serviceResponse = new ServiceResponse<string>();
            try
            {
                var userType = _appraisallandContext.UserInformations.Where(x => x.UserId == userId).Select(x => x.UserType).FirstOrDefault();
                var planDetail = _appraisallandContext.Plans.Where(x => x.PlanName.ToLower() == planName.ToLower() && x.UserType == userType).FirstOrDefault();
                double cartAmount = 0;
                var itemList = new ItemList();
                var items = new List<Item>();

                var apiContext = GetAPIContext(_applicationSettings.ClientId, _applicationSettings.ClientSecret);

                var payment = new PaypalPayment();
                payment.SiteURL = planDetail.ReturnUrl;
                payment.InvoiceNumber = $"{Guid.NewGuid()}";
                payment.Currency = planDetail.CurrencyCode;
                //payment.Tax = $"{product.Tax}";
                // payment.ShippingFee = $"{product.ShippingFee}";
                payment.OrderDescription = $"{planDetail.Description}";
                payment.Currency = planDetail.CurrencyCode;
                payment.ProductList.Add(planDetail);


                itemList.items = items;
                cartAmount = planDetail.PlanValidity;

                var payer = new Payer() { payment_method = "paypal" };
                var redirUrls = new RedirectUrls()
                {
                    cancel_url = payment.SiteURL + "?cancel=true",
                    return_url = $"{payment.SiteURL}?UserId={userId}&PlanId={planDetail.Id}"
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool IsValid(long id)
        {
            var isValid = _appraisallandContext.UserInformations.Where(x => x.UserId == id).FirstOrDefault();
            if (isValid != null)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <param name="planName"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="subscription"></param>
        /// <returns></returns>
        public bool postSubscriptionsDetails(PaymentPayload subscription)
        {
            try
            {
                PaypalTransactionLog paypalTransactionLog = new PaypalTransactionLog();
                var planDetail = _appraisallandContext.Plans.Where(x => x.Id == subscription.PlanId).FirstOrDefault();

                TimeZoneInfo easternTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
                DateTime createTimeEst = TimeZoneInfo.ConvertTimeFromUtc(subscription.CreateTime, easternTimeZone);

                DateTime endDateEst = createTimeEst.AddDays(30);

                var topUpProperty = _appraisallandContext.Topups
                  .FirstOrDefault(x => x.Id == subscription.TopUpId);

                if (subscription == null)
                {
                    return false;
                }

                paypalTransactionLog.UserId = subscription.UserId;
                paypalTransactionLog.PaymentId = subscription.PaymentId;
                paypalTransactionLog.PlanId = Convert.ToString(subscription.PlanId);
                paypalTransactionLog.TotalPropertiesOfPlan = topUpProperty.NoOfProperties;
                paypalTransactionLog.PaymentType = "One Time";
                paypalTransactionLog.StratDate = createTimeEst;
                paypalTransactionLog.EndDate = endDateEst;
                paypalTransactionLog.PaymentRequestSent = subscription.PaymentRequestSent;
                paypalTransactionLog.PaymentResponseReceived = subscription.PaymentResponseReceived;
                paypalTransactionLog.Status = subscription.Status;
                paypalTransactionLog.CurrencyCode = subscription.CurrencyCode;
                _appraisallandContext.PaypalTransactionLogs.Add(paypalTransactionLog);
                _appraisallandContext.SaveChanges();
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

                var transtionDetail = _appraisallandContext.TransactionLogs.Where(x => x.UserId == subscription.UserId && x.IsActive == true).FirstOrDefault();

                if (transtionDetail != null && subscription.TopUpId != null)
                {
                    endDateEst = transtionDetail.EndDate ?? default(DateTime);
                }

                Subscription newSubscription = new Subscription();
                newSubscription.StartDate = createTimeEst;
                newSubscription.EndDate = endDateEst;
                newSubscription.PlanId = subscription.PlanId;
                newSubscription.UserId = subscription.UserId;
                newSubscription.TopUpId = subscription.TopUpId;
                newSubscription.Status = subscription.Status;
                newSubscription.PaymentId = subscription.PaymentId;
                newSubscription.CurrencyCode = subscription.CurrencyCode;
                _appraisallandContext.Subscriptions.Add(newSubscription);
                _appraisallandContext.SaveChanges();

                var payTransactionLogsDetail = _appraisallandContext.TransactionLogs.FirstOrDefault(x => x.UserId == subscription.UserId && x.IsActive == true);

                if (topUpProperty == null)
                {
                    Logs.WriteLog("Error: TopUpPropertyCount is null.");
                    return false;
                }
                else
                {
                    Logs.WriteLog("TopUpPropertyCount: " + topUpProperty.NoOfProperties);

                    if (payTransactionLogsDetail != null)
                    {
                        payTransactionLogsDetail.TotalProperties =
                            (short)(payTransactionLogsDetail.TotalProperties + (topUpProperty.NoOfProperties ?? 0));

                        _appraisallandContext.TransactionLogs.Update(payTransactionLogsDetail);
                        _appraisallandContext.SaveChanges();

                        Logs.WriteLog("SaveChanges executed successfully.");
                        Logs.WriteLog("Updated TotalProperties: " + payTransactionLogsDetail.TotalProperties);
                    }
                    else
                    {
                        Logs.WriteLog("Warning: No active transaction log found for the user.");
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
                Logs.WriteLog(" postSubscriptionsDetails Catch------------------" + ex.Message);
                return false;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="recurringPayPalSubscription"></param>
        /// <returns></returns>
        public async Task<bool> postRecurringSubscriptionsDetails(RecurringPayPalSubscription recurringPayPalSubscription)
        {
            try
            {
                Logs.WriteLog("postRecurringSubscriptionsDetails start");
                bool transactionLogIsActive = true;
                var subDetails = await _appraisallandContext.Subscriptions.Where(x => x.UserId == recurringPayPalSubscription.UserId && x.EndDate >= DateTime.Now).FirstOrDefaultAsync();
                var activePlanDetail = await _appraisallandContext.TransactionLogs.Where(x => x.UserId == recurringPayPalSubscription.UserId && x.IsActive == true).FirstOrDefaultAsync();
                Logs.WriteLog("if (subDetails!=null)");
                if (subDetails != null)
                {
                    transactionLogIsActive = false;
                }
                if (activePlanDetail != null)
                {
                    recurringPayPalSubscription.StartTime = activePlanDetail.EndDate?.AddDays(1) ?? DateTime.UtcNow.AddDays(1);
                }

                var planDetail = await _appraisallandContext.Plans.Where(x => x.Id == recurringPayPalSubscription.newPlanId).FirstOrDefaultAsync();
                TimeZoneInfo easternTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
                DateTime createTimeEst = TimeZoneInfo.ConvertTimeFromUtc(recurringPayPalSubscription.StartTime, easternTimeZone);

                DateTime endDateEst = createTimeEst.AddDays(planDetail.PlanValidity); /// day count from plan table 
                Logs.WriteLog("DateTime------------------");
                PaypalTransactionLog payPalTransactionLog = new PaypalTransactionLog();
                Subscription subscription = new Subscription();
                Logs.WriteLog("PlanId------------------" + recurringPayPalSubscription.newPlanId);
                if (planDetail != null)
                {
                    Logs.WriteLog("PlanDetails------------------" + planDetail.PlanName);
                    payPalTransactionLog.UserId = recurringPayPalSubscription.UserId;
                    payPalTransactionLog.PaymentId = recurringPayPalSubscription.PaymentId;
                    payPalTransactionLog.PlanId = Convert.ToString(recurringPayPalSubscription.newPlanId);
                    payPalTransactionLog.TotalPropertiesOfPlan = planDetail.NoOfProperties;
                    payPalTransactionLog.PaymentType = recurringPayPalSubscription.PaymentType;
                    payPalTransactionLog.StratDate = createTimeEst;
                    payPalTransactionLog.EndDate = endDateEst;
                    payPalTransactionLog.PaymentRequestSent = recurringPayPalSubscription.PaymentRequestSent;
                    payPalTransactionLog.PaymentResponseReceived = recurringPayPalSubscription.PaymentRequestReceived;
                    payPalTransactionLog.Status = recurringPayPalSubscription.PaymentStatus;
                    payPalTransactionLog.CurrencyCode = recurringPayPalSubscription.CurrencyCode;
                    payPalTransactionLog.BrandName = recurringPayPalSubscription.ApplicationContext.BrandName;
                    payPalTransactionLog.UserAction = recurringPayPalSubscription.ApplicationContext.UserAction;
                    payPalTransactionLog.ReturnUrl = recurringPayPalSubscription.ApplicationContext.ReturnUrl;
                    payPalTransactionLog.CancelUrl = recurringPayPalSubscription.ApplicationContext.CancelUrl;
                    payPalTransactionLog.Locale = recurringPayPalSubscription.ApplicationContext.Locale;
                    payPalTransactionLog.PaymentSource = recurringPayPalSubscription.PaymentSource.Source;
                    payPalTransactionLog.SubscriberProfileName = recurringPayPalSubscription.Subscriber.ProfileName;
                    payPalTransactionLog.SubscriberEmailId = recurringPayPalSubscription.Subscriber.EmailId;
                    payPalTransactionLog.SubscriberPhoneId = recurringPayPalSubscription.Subscriber.PhoneId;
                    payPalTransactionLog.SubscriptionId = recurringPayPalSubscription.paypalSubscriptionId;

                    _appraisallandContext.PaypalTransactionLogs.Add(payPalTransactionLog);
                    _appraisallandContext.SaveChanges();

                    if (recurringPayPalSubscription.PaymentStatus.ToUpper() == "COMPLETED")
                    {
                        Subscription newSubscription = new Subscription();
                        newSubscription.StartDate = createTimeEst;
                        newSubscription.EndDate = endDateEst;
                        newSubscription.PlanId = (short)recurringPayPalSubscription.newPlanId;
                        newSubscription.UserId = recurringPayPalSubscription.UserId;
                        newSubscription.Status = recurringPayPalSubscription.PaymentStatus;
                        newSubscription.PaymentId = recurringPayPalSubscription.PaymentId;
                        newSubscription.CurrencyCode = recurringPayPalSubscription.CurrencyCode;
                        _appraisallandContext.Subscriptions.Add(newSubscription);
                        _appraisallandContext.SaveChanges();

                        DBL.Models.TransactionLog transactionLog = new DBL.Models.TransactionLog();
                        transactionLog.TransactionDetail = planDetail.PlanName;
                        transactionLog.UserId = recurringPayPalSubscription.UserId;
                        transactionLog.PaymentId = recurringPayPalSubscription.PaymentId;
                        transactionLog.CreatedTime = createTimeEst;
                        transactionLog.PlanAmount = planDetail.MonthlyAmount;
                        transactionLog.PlanName = planDetail.PlanName;
                        transactionLog.IsActive = transactionLogIsActive;
                        transactionLog.StartDate = createTimeEst;
                        transactionLog.EndDate = endDateEst;
                        transactionLog.UsedProperties = 0;
                        transactionLog.PaypalSubscriptionStatus = Enum.GetName(PaypalSubscriptionStatus.Active);
                        transactionLog.TotalProperties = planDetail.NoOfProperties;
                        _appraisallandContext.TransactionLogs.Add(transactionLog);
                        _appraisallandContext.SaveChanges();
                    }
                    return true;
                }
            }
            catch (Exception ex)
            {
                Logs.WriteLog("Catch------------------" + ex.Message);
            }

            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="recurringPayPalSubscription"></param>
        /// <returns></returns>
        public async Task<bool> cancelRecurringSubscription(CancelSubscriptionDetails recurringPayPalSubscription)
        {
            try
            {
                TimeZoneInfo easternTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
                DateTime createTimeEst = TimeZoneInfo.ConvertTimeFromUtc(recurringPayPalSubscription.CancellationDateTime, easternTimeZone);

                DateTime endDateEst = createTimeEst.AddDays(30);

                PaypalTransactionLog transactionLog = new PaypalTransactionLog();
                Logs.WriteLog("PlanDetails------------------");
                transactionLog.UserId = recurringPayPalSubscription.UserId;
                transactionLog.PaymentId = recurringPayPalSubscription.PaymentId;
                transactionLog.PlanId = Convert.ToString(recurringPayPalSubscription.PlanId);
                transactionLog.TotalPropertiesOfPlan = 0;
                transactionLog.PaymentType = recurringPayPalSubscription.PaymentType;
                transactionLog.StratDate = createTimeEst;
                transactionLog.EndDate = endDateEst;
                transactionLog.PaymentRequestSent = recurringPayPalSubscription.PaymentRequestSent;
                transactionLog.PaymentResponseReceived = recurringPayPalSubscription.PaymentRequestReceived;
                transactionLog.Status = recurringPayPalSubscription.PaymentStatus;
                transactionLog.CurrencyCode = recurringPayPalSubscription.CurrencyCode;
                transactionLog.BrandName = recurringPayPalSubscription.ApplicationContext.BrandName;
                transactionLog.UserAction = recurringPayPalSubscription.ApplicationContext.UserAction;
                transactionLog.ReturnUrl = recurringPayPalSubscription.ApplicationContext.ReturnUrl;
                transactionLog.CancelUrl = recurringPayPalSubscription.ApplicationContext.CancelUrl;
                transactionLog.Locale = recurringPayPalSubscription.ApplicationContext.Locale;
                transactionLog.PaymentSource = recurringPayPalSubscription.PaymentSource.Source;
                transactionLog.SubscriberProfileName = recurringPayPalSubscription.Subscriber.ProfileName;
                transactionLog.SubscriberEmailId = recurringPayPalSubscription.Subscriber.EmailId;
                transactionLog.SubscriberPhoneId = recurringPayPalSubscription.Subscriber.PhoneId;
                transactionLog.SubscriptionId = recurringPayPalSubscription.PaypalSubscriptionId;

                _appraisallandContext.PaypalTransactionLogs.Add(transactionLog);
                _appraisallandContext.SaveChanges();

                var subcriptionDetail = _appraisallandContext.PaypalTransactionLogs.Where(x => x.SubscriptionId == recurringPayPalSubscription.PaypalSubscriptionId && x.PaymentId != "N.A.").FirstOrDefault();
                var transactionDetail = _appraisallandContext.TransactionLogs.Where(x => x.UserId == recurringPayPalSubscription.UserId && x.PaymentId == subcriptionDetail.PaymentId).FirstOrDefault();
                transactionDetail.PaypalSubscriptionStatus = Enum.GetName(PaypalSubscriptionStatus.Cancel);
                _appraisallandContext.TransactionLogs.Update(transactionDetail);
                _appraisallandContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
