using DBL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PayPal.Api;


namespace AppraisalLand.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/com.appraisalland.RecurringPayments")]
    [ApiController]
    public class RecurringPaymentsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly AppraisallandsContext _context;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="configuration"></param>
        public RecurringPaymentsController(IConfiguration configuration)
        {
            _configuration = configuration;
            _httpClient = new HttpClient();
            _context = new AppraisallandsContext();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="subscriptionId"></param>
        /// <param name="UserId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("subscribe")]
        public async Task<IActionResult> Subscribe([FromQuery] int subscriptionId, [FromQuery] int UserId)
        {
            var clientId = _configuration["ApplicationSettings:ClientId"];
            var clientSecret = _configuration["ApplicationSettings:ClientSecret"];
            var isSandbox = Convert.ToBoolean(_configuration["ApplicationSettings:IsSandbox"]);


            var apiContext = isSandbox
                ? new APIContext(new OAuthTokenCredential(clientId, clientSecret, new Dictionary<string, string> { { "mode", "sandbox" } }).GetAccessToken())
                : new APIContext(new OAuthTokenCredential(clientId, clientSecret).GetAccessToken());

            var subscriptionPlan = _context.Subscriptionplans.FirstOrDefault(x => x.Id == subscriptionId);

            if (subscriptionPlan == null)
            {

                return NotFound("Subscription plan not found.");
            }


            var plan = new PayPal.Api.Plan
            {
                name = subscriptionPlan.Name,
                description = subscriptionPlan.Description,
                type = subscriptionPlan.Type,
                payment_definitions = new List<PaymentDefinition>
            {
                new PaymentDefinition
                {
                    name = "Regular Payment",
                    type = "REGULAR",
                    frequency = subscriptionPlan.Frequency,
                    frequency_interval = subscriptionPlan.Frequencyinterval.ToString(),
                    amount = new Currency
                    {
                        value = subscriptionPlan.Amount.ToString(),
                        currency = "USD"
                    },
                    cycles = subscriptionPlan.Cycles.ToString()
                }
            },
                merchant_preferences = new MerchantPreferences
                {
                    setup_fee = new Currency
                    {
                        value = subscriptionPlan.Amount.ToString(),
                        currency = "USD"
                    },
                    cancel_url = subscriptionPlan.Cancelurl,
                    return_url = subscriptionPlan.Returnurl,
                    auto_bill_amount = "YES", // Set to YES for automatic billing
                    initial_fail_amount_action = "CONTINUE", // Set to CONTINUE to continue billing on initial payment failure
                    max_fail_attempts = "0"
                }
            };


            var createdPlan = plan.Create(apiContext);


            if (createdPlan != null)
            {
                var planId = createdPlan.id;
                var planStatus = createdPlan.state;
            }

            var patchRequest = new PatchRequest
        {
            new Patch
            {
                op = "replace",
                path = "/",
                value = new PayPal.Api.Plan { state = "ACTIVE" }
            }
        };
            createdPlan.Update(apiContext, patchRequest);


            // Subscription API
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, "https://api-m.sandbox.paypal.com/v1/billing/subscriptions");
            request.Headers.Add("Authorization", "Bearer A21AALCQDSZoJ7Y5-qcATiocbpGoi6rdq3iZ0nTSYrj5Q-7CdBTdKFKJb4keq-zxH1zrZQJn3vmMquXB-o0QSvCGHt5UIn_PQ");
            request.Headers.Add("Cookie", "cookie_check=yes; d_id=9014591e55ee406d8c3ef17b4b8afa971704383329212; enforce_policy=gdpr_v2.1; ts=vreXpYrS%3D1799077728%26vteXpYrS%3D1704385128%26vr%3Dd529b1f218c0a6022c7284eaffbc5f5a%26vt%3Dd529b1f218c0a6022c7284eaffbc5f59%26vtyp%3Dnew; ts_c=vr%3Dd529b1f218c0a6022c7284eaffbc5f5a%26vt%3Dd529b1f218c0a6022c7284eaffbc5f59");
            var content = new StringContent("{\r\n  \"plan_id\": \"P-6S100019KX011303BOABOSOQ\",\r\n  \"start_time\": \"2024-02-05T00:00:00Z\",\r\n  \"quantity\": \"20\",\r\n  \"shipping_amount\": {\r\n    \"currency_code\": \"USD\",\r\n    \"value\": \"10.00\"\r\n  },\r\n  \"subscriber\": {\r\n    \"name\": {\r\n      \"given_name\": \"John\",\r\n      \"surname\": \"Doe\"\r\n    },\r\n    \"email_address\": \"customer@example.com\",\r\n    \"shipping_address\": {\r\n      \"name\": {\r\n        \"full_name\": \"John Doe\"\r\n      },\r\n      \"address\": {\r\n        \"address_line_1\": \"2211 N First Street\",\r\n        \"address_line_2\": \"Building 17\",\r\n        \"admin_area_2\": \"San Jose\",\r\n        \"admin_area_1\": \"CA\",\r\n        \"postal_code\": \"95131\",\r\n        \"country_code\": \"US\"\r\n      }\r\n    }\r\n  },\r\n  \"application_context\": {\r\n    \"brand_name\": \"walmart\",\r\n    \"locale\": \"en-US\",\r\n    \"shipping_preference\": \"SET_PROVIDED_ADDRESS\",\r\n    \"user_action\": \"SUBSCRIBE_NOW\",\r\n    \"payment_method\": {\r\n      \"payer_selected\": \"PAYPAL\",\r\n      \"payee_preferred\": \"IMMEDIATE_PAYMENT_REQUIRED\"\r\n    },\r\n    \"return_url\": \"https://example.com/returnUrl\",\r\n    \"cancel_url\": \"https://example.com/cancelUrl\"\r\n  }\r\n}", null, "application/json");
            request.Content = content;
            var response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();
            Console.WriteLine(await response.Content.ReadAsStringAsync());
            // End Subscription API

            DateTime nextPaymentDate = DateTime.Now; // Start billing tomorrow

            switch (subscriptionPlan.Frequency)
            {
                case "MONTH":
                    if (subscriptionPlan.Frequencyinterval.HasValue)
                    {
                        nextPaymentDate = nextPaymentDate.AddMonths(subscriptionPlan.Frequencyinterval.Value);
                    }
                    break;
                case "YEAR":
                    if (subscriptionPlan.Frequencyinterval.HasValue)
                    {
                        nextPaymentDate = nextPaymentDate.AddYears(subscriptionPlan.Frequencyinterval.Value);
                    }
                    break;
                case "WEEK":
                    if (subscriptionPlan.Frequencyinterval.HasValue)
                    {
                        nextPaymentDate = nextPaymentDate.AddDays(subscriptionPlan.Frequencyinterval.Value * 7);
                    }
                    break;
            }



            string formattedNextPaymentDate = nextPaymentDate.ToString("yyyy-MM-ddTHH:mm:ssZ");


            var agreement = new PayPal.Api.Agreement
            {
                name = "Subscription Agreement",
                description = "Subscription agreement for your service",
                start_date = formattedNextPaymentDate, // Start billing tomorrow
                plan = createdPlan,// new PayPal.Api.Plan { id = createdPlan.id },
                payer = new PayPal.Api.Payer { payment_method = "paypal" }
            };

            var createdAgreement = agreement.Create(apiContext);



            var approvalUrl = createdAgreement.links.FirstOrDefault(l => l.rel == "approval_url").href;

            var PlanName = subscriptionPlan.Name;
            var plan_id = _context.Plans.Where(x => x.PlanName == PlanName).FirstOrDefault();

            Subscription subscription = new Subscription();
            //subscription.SubscriptionId = subscriptionId;
            subscription.UserId = UserId;
            subscription.PlanId = plan_id.Id;
            subscription.StartDate = DateTime.Now;
            DateTime? endDate = null;
            subscription.EndDate = Convert.ToDateTime(endDate);
            _context.Subscriptions.Add(subscription);
            _context.SaveChanges();

            return Ok(approvalUrl);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="token"></param>
        /// <param name="ba_token"></param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult HandlePayPalReturn([FromQuery] string token, [FromQuery] string ba_token)
        {
            try
            {
                var clientId = _configuration["ApplicationSettings:ClientId"];
                var clientSecret = _configuration["ApplicationSettings:ClientSecret"];
                var isSandbox = Convert.ToBoolean(_configuration["ApplicationSettings:IsSandbox"]);

                var apiContext = isSandbox
                    ? new APIContext(new OAuthTokenCredential(clientId, clientSecret, new Dictionary<string, string> { { "mode", "sandbox" } }).GetAccessToken())
                    : new APIContext(new OAuthTokenCredential(clientId, clientSecret).GetAccessToken());
                var response = HttpContext.Request.Headers;
                //var billinginfo = new PayPal.Api.BillingInfo { pa };
                var paymentExecution = new PaymentExecution { payer_id = ba_token };
                var executedAgreement = PayPal.Api.Agreement.Execute(apiContext, token);

                var agreementId = executedAgreement.id;
                var agreement = PayPal.Api.Agreement.Get(apiContext, agreementId);

                var agreements = new PayPal.Api.Agreement() { id = agreementId };
                string endDate = DateTime.Now.ToShortDateString();


                string frequency = executedAgreement.plan.payment_definitions[0].frequency;
                int SubscriptionId = 0;
                switch (frequency)
                {
                    case "MONTH":

                        SubscriptionId = 1;

                        break;
                    case "YEAR":

                        SubscriptionId = 2;

                        break;
                    case "WEEK":

                        SubscriptionId = 3;

                        break;
                }

                if (agreement.state == "Active" || agreement.state == "Created")
                {
                    DBL.Models.Agreement agreement1 = new DBL.Models.Agreement();
                    agreement1.Name = agreement.name;
                    agreement1.Description = agreement.description;
                    agreement1.Startdate = DateTime.Now;
                    agreement1.Paypalagreementid = agreementId;
                    agreement1.Subscriptionid = SubscriptionId;
                    _context.Agreements.Add(agreement1);
                    _context.SaveChanges();
                    return Ok("PaymentSuccess");
                }
                else
                {

                    return BadRequest("PaymentFailed");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error processing payment: {ex.Message}" });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="agreementId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("suspend-subscription")]
        public IActionResult SuspendSubscription([FromQuery] string agreementId)
        {
            try
            {
                var clientId = _configuration["ApplicationSettings:ClientId"];
                var clientSecret = _configuration["ApplicationSettings:ClientSecret"];
                var isSandbox = Convert.ToBoolean(_configuration["ApplicationSettings:IsSandbox"]);

                var apiContext = isSandbox
                    ? new APIContext(new OAuthTokenCredential(clientId, clientSecret, new Dictionary<string, string> { { "mode", "sandbox" } }).GetAccessToken())
                    : new APIContext(new OAuthTokenCredential(clientId, clientSecret).GetAccessToken());


                var agreementStateDescriptor = new AgreementStateDescriptor();
                agreementStateDescriptor.note = "Subscription suspended";


                PayPal.Api.Agreement.Suspend(apiContext, agreementId, agreementStateDescriptor);
                return Ok("Subscription suspended successfully.");
            }
            catch (PayPal.PaymentsException ex)
            {

                return BadRequest($"Failed to suspend subscription: {ex.Message}");
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Error suspending subscription: {ex.Message}");
            }
        }

        //[Authorize]
        //[HttpGet("cancel-subscription")]
        //public IActionResult CancelSubscription([FromQuery] string token)
        //{
        //    try
        //    {
        //        var clientId = _configuration["ApplicationSettings:ClientId"];
        //        var clientSecret = _configuration["ApplicationSettings:ClientSecret"];
        //        var isSandbox = Convert.ToBoolean(_configuration["ApplicationSettings:IsSandbox"]);

        //        var apiContext = isSandbox
        //            ? new APIContext(new OAuthTokenCredential(clientId, clientSecret, new Dictionary<string, string> { { "mode", "sandbox" } }).GetAccessToken())
        //            : new APIContext(new OAuthTokenCredential(clientId, clientSecret).GetAccessToken());

        //        var agreementStateDescriptor = new AgreementStateDescriptor
        //        {
        //            note = "Subscription canceled by user",
        //        };
        //        var agreement = PayPal.Api.Agreement.Get(apiContext, token);


        //        var agreementId = agreement.id;

        //        PayPal.Api.Agreement.Cancel(apiContext, agreementId, agreementStateDescriptor);

        //        return Ok("Subscription canceled successfully.");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { message = $"Error canceling subscription: {ex.Message}" });
        //    }
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="agreementId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("cancel-subscription")]
        public IActionResult CancelSubscription([FromQuery] string agreementId)
        {
            try
            {
                var clientId = _configuration["ApplicationSettings:ClientId"];
                var clientSecret = _configuration["ApplicationSettings:ClientSecret"];
                var isSandbox = Convert.ToBoolean(_configuration["ApplicationSettings:IsSandbox"]);

                var apiContext = isSandbox
                    ? new APIContext(new OAuthTokenCredential(clientId, clientSecret, new Dictionary<string, string> { { "mode", "sandbox" } }).GetAccessToken())
                    : new APIContext(new OAuthTokenCredential(clientId, clientSecret).GetAccessToken());

                var agreement = PayPal.Api.Agreement.Get(apiContext, agreementId);

                if (agreement == null)
                {
                    return NotFound("Agreement not found.");
                }
                var agreementStateDescriptor = new AgreementStateDescriptor();
                agreementStateDescriptor.note = "Cancelled by user request";
                agreement.Cancel(apiContext, agreementStateDescriptor);

                // Fetch the agreement again after cancellation to check its current state
                agreement = PayPal.Api.Agreement.Get(apiContext, agreementId);

                if (agreement.state == "Cancelled")
                {
                    // Logic to update your database or perform necessary actions upon successful cancellation
                    // For example: 
                    // var cancelledSubscription = _context.Subscriptions.FirstOrDefault(s => s.AgreementId == agreementId);
                    // if (cancelledSubscription != null) { /* Update subscription status or perform related actions */ }

                    return Ok("Subscription cancelled successfully.");
                }
                else
                {
                    return BadRequest("Failed to cancel subscription.");
                }
            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Error cancelling subscription: {ex.Message}");
            }
        }
    }
}