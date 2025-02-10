using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text.Json;
using System.Text;
using DBL.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace CallTech.Controllers
{
    [Route("api/webhook/paypal")]
    [ApiController]
    public class PayPalWebhookController : ControllerBase
    {
        private readonly AppraisallandsContext _appraisallandsContext;
        private readonly IConfiguration _configuration;

        public PayPalWebhookController(IConfiguration configuration, AppraisallandsContext appraisallandsContext)
        {
            _configuration = configuration;
            _appraisallandsContext= appraisallandsContext;
        }
        [HttpPost]
        public async Task<IActionResult> HandlePayPalWebhook([FromBody] dynamic payload)
        {
            if (HttpContext.Request.Method != HttpMethods.Post)
            {
                return StatusCode(405, new { error = "Method not allowed" });
            }

            try
            {
                string rawPayload = payload.ToString(); 
                                                        

                var parsedObject = JsonConvert.DeserializeObject<JObject>(rawPayload); 
                string eventType = parsedObject["event_type"]?.ToString();

                switch (eventType)
                {
                    case "BILLING.SUBSCRIPTION.CREATED":
                        HandleSubscriptionCreated(payload);
                        break;

                    case "BILLING.SUBSCRIPTION.UPDATED":
                        HandleSubscriptionUpdated(payload);
                        break;

                    case "BILLING.SUBSCRIPTION.CANCELLED":
                        HandleSubscriptionCancelled(payload);
                        break;

                    case "BILLING.SUBSCRIPTION.ACTIVATED":
                        HandleSubscriptionActivated(payload);
                        break;

                    case "BILLING.SUBSCRIPTION.PAYMENT.FAILED":
                        HandlePaymentFailed(payload);
                        break;

                    case "BILLING.SUBSCRIPTION.EXPIRED":
                        HandleSubscriptionExpired(payload);
                        break;

                    case "PAYMENT.SALE.COMPLETED":
                        HandlePaymentSaleCompleted(payload);
                        break;

                    case "PAYMENT.SALE.DENIED":
                        HandlePaymentSaleDenied(payload);
                        break;

                    default:
                        Console.WriteLine($"Unhandled event type: {eventType}");
                        break;
                }
                return Ok(new { status = "success" });
            }
            catch (Exception ex)
            {
                _appraisallandsContext.Notifications.Add(new Notification { Message = ex.Message });
                await _appraisallandsContext.SaveChangesAsync();
                Console.WriteLine("Error handling PayPal webhook: " + ex);
                return StatusCode(500, new { error = "Internal Server Error" });
            }
        }

        private void HandleSubscriptionCreated(JObject payload)
        {
            var resource = payload["resource"];
            string agreementId = resource["id"]?.ToString();
            string description = resource["description"]?.ToString();
            string state = resource["state"]?.ToString();
            string startDate = resource["start_date"]?.ToString();

            Console.WriteLine($"Subscription Created: Agreement ID = {agreementId}, Description = {description}, State = {state}, Start Date = {startDate}");
        }

        // Handler for subscription updated
        private void HandleSubscriptionUpdated(JObject payload)
        {
            var resource = payload["resource"];
            string agreementId = resource["id"]?.ToString();
            string state = resource["state"]?.ToString();

            Console.WriteLine($"Subscription Updated: Agreement ID = {agreementId}, State = {state}");
        }

        // Handler for subscription cancelled
        private void HandleSubscriptionCancelled(JObject payload)
        {
            var resource = payload["resource"];
            string agreementId = resource["id"]?.ToString();
            string state = resource["state"]?.ToString();

            Console.WriteLine($"Subscription Cancelled: Agreement ID = {agreementId}, State = {state}");
        }

        // Handler for subscription activated
        private void HandleSubscriptionActivated(JObject payload)
        {
            var resource = payload["resource"];
            string agreementId = resource["id"]?.ToString();
            string state = resource["state"]?.ToString();

            Console.WriteLine($"Subscription Activated: Agreement ID = {agreementId}, State = {state}");
        }

        // Handler for payment failed
        private void HandlePaymentFailed(JObject payload)
        {
            var resource = payload["resource"];
            string agreementId = resource["id"]?.ToString();
            string failedPayments = resource["agreement_details"]?["failed_payment_count"]?.ToString();

            Console.WriteLine($"Payment Failed: Agreement ID = {agreementId}, Failed Payments = {failedPayments}");
        }

        // Handler for subscription expired
        private void HandleSubscriptionExpired(JObject payload)
        {
            var resource = payload["resource"];
            string agreementId = resource["id"]?.ToString();
            string state = resource["state"]?.ToString();

            Console.WriteLine($"Subscription Expired: Agreement ID = {agreementId}, State = {state}");
        }

        // Handler for payment sale completed
        private void HandlePaymentSaleCompleted(JObject payload)
        {
            var resource = payload["resource"];
            string agreementId = resource["id"]?.ToString();
            string amount = resource["plan"]?["payment_definitions"]?.FirstOrDefault()?["amount"]?["value"]?.ToString();

            Console.WriteLine($"Payment Sale Completed: Agreement ID = {agreementId}, Amount = {amount}");
        }

        // Handler for payment sale denied
        private void HandlePaymentSaleDenied(JObject payload)
        {
            var resource = payload["resource"];
            string agreementId = resource["id"]?.ToString();
            string state = resource["state"]?.ToString();

            Console.WriteLine($"Payment Sale Denied: Agreement ID = {agreementId}, State = {state}");
        }

        //[HttpPost]
        //public async Task<IActionResult> HandlePayPalWebhook([FromBody] object payload)
        //{
        //    // Ensure the request is POST
        //    if (HttpContext.Request.Method != HttpMethods.Post)
        //    {
        //        return StatusCode(405, new { error = "Method not allowed" });
        //    }

        //    try
        //    {
        //        // 1. Retrieve PayPal webhook ID from environment variables
        //        var paypalWebhookId = _configuration["PayPalWebhookId"]; // Add this in appsettings.json or environment variables
        //        Console.WriteLine($"PAYPAL_WEBHOOK_ID: {paypalWebhookId}");

        //        // 2. Extract required headers
        //        var transmissionId = Request.Headers["paypal-transmission-id"];
        //        var transmissionTime = Request.Headers["paypal-transmission-time"];
        //        var certUrl = Request.Headers["paypal-cert-url"];
        //        var authAlgo = Request.Headers["paypal-auth-algo"];
        //        var transmissionSig = Request.Headers["paypal-transmission-sig"];

        //        if (string.IsNullOrEmpty(transmissionId) ||
        //            string.IsNullOrEmpty(transmissionTime) ||
        //            string.IsNullOrEmpty(certUrl) ||
        //            string.IsNullOrEmpty(authAlgo) ||
        //            string.IsNullOrEmpty(transmissionSig))
        //        {
        //            return BadRequest(new { error = "Missing required headers" });
        //        }

        //        // 3. Read the request body
        //        var requestBody = await new StreamReader(Request.Body).ReadToEndAsync();

        //        // 4. Fetch PayPal's public certificate
        //        using var httpClient = new HttpClient();
        //        var certResponse = await httpClient.GetAsync(certUrl);

        //        if (!certResponse.IsSuccessStatusCode)
        //        {
        //            return BadRequest(new { error = "Invalid PayPal certificate URL" });
        //        }

        //        var paypalCert = await certResponse.Content.ReadAsStringAsync();

        //        // 5. Construct the signature base string
        //        var requestBodyHash = SHA256.Create()
        //                                    .ComputeHash(Encoding.UTF8.GetBytes(requestBody));
        //        var requestBodyHashHex = BitConverter.ToString(requestBodyHash).Replace("-", "").ToLower();

        //        var signatureBase = $"{transmissionId}|{transmissionTime}|{paypalWebhookId}|{requestBodyHashHex}";

        //        // 6. Validate the signature
        //        using var rsa = RSA.Create();
        //        rsa.ImportFromPem(paypalCert.ToCharArray());

        //        var isValidSignature = rsa.VerifyData(
        //            Encoding.UTF8.GetBytes(signatureBase),
        //            Convert.FromBase64String(transmissionSig),
        //            new HashAlgorithmName(authAlgo),
        //            RSASignaturePadding.Pkcs1);

        //        if (!isValidSignature)
        //        {
        //            return BadRequest(new { error = "Invalid webhook signature" });
        //        }

        //        // 7. Handle the event
        //        var webhookEvent = JsonSerializer.Deserialize<JsonElement>(requestBody);
        //        var eventType = webhookEvent.GetProperty("event_type").GetString();

        //        switch (eventType)
        //        {
        //            case "PAYMENT.SALE.COMPLETED":
        //                Console.WriteLine("Payment completed: " + requestBody);
        //                break;

        //            case "CHECKOUT.ORDER.APPROVED":
        //                Console.WriteLine("Order approved: " + requestBody);
        //                break;

        //            default:
        //                Console.WriteLine("Unhandled event type: " + eventType);
        //                break;
        //        }
        //        Notification notification = new Notification();
        //        notification.Message= requestBody + payload;
        //        _appraisallandsContext.Notifications.Add(notification);
        //        _appraisallandsContext.SaveChanges();   
        //        // 8. Respond to PayPal
        //        return Ok(new { status = "success" });
        //    }
        //    catch (Exception ex)
        //    {
        //        Notification notification = new Notification();
        //        notification.Message = ex.Message+ payload;
        //        _appraisallandsContext.Notifications.Add(notification);
        //        _appraisallandsContext.SaveChanges();
        //        Console.WriteLine("Error handling PayPal webhook: " + ex);
        //        return StatusCode(500, new { error = "Internal Server Error" });
        //    }
        //}
    }
}
