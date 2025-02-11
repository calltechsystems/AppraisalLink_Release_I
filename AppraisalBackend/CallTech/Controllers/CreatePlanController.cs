using DAL.Repository;
using DBL.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace CallTech.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CreatePlanController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly AppraisallandsContext _context;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IEmailService _emailService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="configuration"></param>
        /// <param name="httpClient"></param>
        /// <param name="httpClientFactory"></param>
        /// <param name="emailService"></param>
        public CreatePlanController(IConfiguration configuration, HttpClient httpClient, IHttpClientFactory httpClientFactory, IEmailService emailService)
        {
            _configuration = configuration;
            _httpClient = httpClient;
            _context = new AppraisallandsContext();
            _httpClientFactory = httpClientFactory;
            _emailService = emailService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <param name="description"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpPost("CreateProduct")]
        public async Task<string> CreateProduct(string name, string description)
        {
            var accessToken = await GetAccessToken();

            var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

            var requestUrl = "https://api.sandbox.paypal.com/v1/catalogs/products";

            var requestData = new
            {
                name,
                description
            };

            var requestDataJson = Newtonsoft.Json.JsonConvert.SerializeObject(requestData);
            var requestContent = new StringContent(requestDataJson, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(requestUrl, requestContent);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {

                var productId = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(responseContent).id;
                RecurringProduct recurringProduct = new RecurringProduct();
                recurringProduct.Name = name;
                recurringProduct.Description = description;
                recurringProduct.Id = productId;
                _context.RecurringProducts.Add(recurringProduct);
                _context.SaveChanges();
                return productId;
            }
            else
            {
                throw new Exception($"Failed to create product. {responseContent}");
            }
        }

        //    [HttpPost("createNewPlan")]
        //    public async Task<string> CreatePlan(string product_id, string name, string description, string billing_cycles_interval_unit, int billing_cycles_interval_count, string amount,int numberOfproperties)
        //    {
        //        var accessToken = await GetAccessToken();
        //        var client = new System.Net.Http.HttpClient();
        //        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        //        var requestUrl = "https://api.sandbox.paypal.com/v1/billing/plans";

        //        var requestData = new
        //        {
        //            product_id = product_id,
        //            name = name,
        //            description = description,
        //            status = "ACTIVE",
        //            billing_cycles = new[]
        //{
        //    new
        //    {
        //        frequency = new
        //        {
        //            interval_unit = billing_cycles_interval_unit,
        //            interval_count = billing_cycles_interval_count
        //        },
        //        tenure_type = "TRIAL",
        //        sequence = 1,
        //        total_cycles = 1,
        //        pricing_scheme = new
        //        {
        //            fixed_price = new
        //            {
        //                value = "1",
        //                currency_code = "USD"
        //            }
        //        }
        //    },
        //    new
        //    {
        //        frequency = new
        //        {
        //            interval_unit = billing_cycles_interval_unit,
        //            interval_count = billing_cycles_interval_count
        //        },
        //        tenure_type = "REGULAR",
        //        sequence = 2,
        //        total_cycles = billing_cycles_interval_count,
        //        pricing_scheme = new
        //        {
        //            fixed_price = new
        //            {
        //                value = "44",
        //                currency_code = "USD"
        //            }
        //        }
        //    }
        //},
        //            payment_preferences = new
        //            {
        //                auto_bill_outstanding = true,
        //                setup_fee = new
        //                {
        //                    value = amount,
        //                    currency_code = "USD"
        //                },
        //                setup_fee_failure_action = "CONTINUE",
        //                payment_failure_threshold = 3
        //            },
        //            taxes = new
        //            {
        //                percentage = "0",
        //                inclusive = false
        //            }
        //        };
        //        var requestDataJson = Newtonsoft.Json.JsonConvert.SerializeObject(requestData);
        //        var requestContent = new StringContent(requestDataJson, Encoding.UTF8, "application/json");

        //        var response = await client.PostAsync(requestUrl, requestContent);
        //        var result = response.Content.ReadAsStringAsync().Result;
        //        var planData = JsonConvert.DeserializeObject<DBL.Models.Paypalplan>(result);

        //        var newPlan = new DBL.Models.RecurringPlan
        //        {
        //            Id = planData.Id,
        //            ProductId = product_id,
        //            Name = planData.Name,
        //            Status = planData.Status,
        //            Description = planData.Description,
        //            UsageType = planData.UsageType,
        //            CreateTime = DateTime.Now,
        //            Ammount = Convert.ToInt32(amount),
        //            Returnurl = "https://localhost:44370/api/CreatePlan/HandleReturnUrl",
        //            NoOfProperties = numberOfproperties,
        //        };
        //        _context.RecurringPlans.Add(newPlan);
        //        await _context.SaveChangesAsync();

        //        return result;
        //    }

        //[HttpPost("AddSubscription")]
        //public async Task<ActionResult> AddSubscription(string planId, long UserId)
        //{
        //    var _httpClient = new HttpClient();
        //    string url = "https://api.sandbox.paypal.com/v1/billing/subscriptions";
        //    string accessToken = await GetAccessToken(); // Replace with your actual access token
        //    var UserDetails = _context.UserInformations.Where(x => x.UserId == UserId).FirstOrDefault();
        //    Broker Details=null;
        //    Brokerage BrokerageDetails=null;
        //    //switch (UserDetails.UserType)
        //    //{
        //    //    case 1:
        //    //        Details=_context.Brokers.Where(x=>x.UserId== UserId).FirstOrDefault();
        //    //        break;
        //    //    case 2:
        //    //         BrokerageDetails = _context.Brokerages.Where(x => x.UserId == UserId).FirstOrDefault();
        //    //        break;
        //    //    case 6:
        //    //        Details = _context.Brokers.Where(x => x.UserId == UserId).FirstOrDefault();
        //    //        break;
        //    //    default:
        //    //        // code block
        //    //        break;
        //    //}
        //    var name="";
        //    var surname = "";
        //    var address_line_1 = "";
        //    var address_line_2 = "";
        //    var admin_area_2 = "";
        //    var admin_area_1 = "";
        //    var postal_code = "";
        //    var country_code = "";
        //    if (Details == null)
        //    {
        //        //name = BrokerageDetails?.FirstName + " " + BrokerageDetails?.LastName ;
        //        //address_line_1 = BrokerageDetails?.StreetNumber + " " + BrokerageDetails?.StreetName;
        //        //address_line_2 = BrokerageDetails?.ApartmentNo;
        //        //admin_area_2 = BrokerageDetails?.City;
        //        //admin_area_1 = "CA";
        //        //postal_code = BrokerageDetails?.PostalCode;
        //        //country_code = "US";

        //        name = "Appraiserlland";
        //        surname = "Company";
        //        address_line_1 = "2211 N First Street";
        //        address_line_2 = "Building 17";
        //        admin_area_2 = "San Jose";
        //        admin_area_1 = "CA";
        //        postal_code = "466554";
        //        country_code = "US";


        //    }
        //    else
        //    {


        //        name = "Appraiserlland" ;
        //        surname = "Company";
        //        address_line_1 = "2211 N First Street";
        //        address_line_2 = "Building 17";
        //        admin_area_2 = "San Jose";
        //        admin_area_1 = "CA";
        //        postal_code = "466554";
        //        country_code = "US";

        //    }

        //    var plan_details = _context.RecurringPlans.Where(x => x.Id == planId).FirstOrDefault();
        //    var requestData = new
        //    {
        //        plan_id = planId,
        //        start_time = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"),
        //        shipping_amount = new
        //        {
        //            currency_code = "USD",
        //            value = plan_details?.Ammount
        //        },
        //        subscriber = new
        //        {
        //            name = new
        //            {
        //                given_name = name,
        //                surname = surname
        //            },
        //            email_address = UserDetails.Email,
        //            shipping_address = new
        //            {
        //                name = new
        //                {
        //                    full_name = name + surname
        //                },
        //                address = new
        //                {
        //                    address_line_1 = address_line_1,
        //                    address_line_2 = address_line_2,
        //                    admin_area_2 = admin_area_2,
        //                    admin_area_1 = admin_area_1,
        //                    postal_code = postal_code,
        //                    country_code = country_code
        //                }
        //            }
        //        },
        //        application_context = new
        //        {
        //            brand_name = "Appraiserlland",
        //            locale = "en-US",
        //            shipping_preference = "SET_PROVIDED_ADDRESS",
        //            user_action = "SUBSCRIBE_NOW",
        //            payment_method = new
        //            {
        //                payer_selected = "PAYPAL",
        //                payee_preferred = "IMMEDIATE_PAYMENT_REQUIRED"
        //            },
        //            return_url = plan_details.Returnurl,
        //            cancel_url = "https://localhost:44370/cancel"
        //        }
        //    };


        //    var requestContent = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(requestData), Encoding.UTF8, "application/json");
        //    _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        //    var response = await _httpClient.PostAsync(url, requestContent);
        //    var responseContent = await response.Content.ReadAsStringAsync();

        //    if (response.IsSuccessStatusCode)
        //    {
        //        dynamic response1 = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(responseContent);

        //        string approveUrl = response1.links[0].href;
        //        return Ok(approveUrl);
        //    }
        //    else
        //    {
        //        throw new Exception($"Failed to create subscription: {responseContent}");
        //    }
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        private async Task<string> GetAccessToken()
        {
            var clientId = _configuration["ApplicationSettings:ClientId"];
            var clientSecret = _configuration["ApplicationSettings:ClientSecret"];
            var mode = _configuration.GetValue<string>("ApplicationSettings:IsSandbox");
            var client = new HttpClient();
            var credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{clientId}:{clientSecret}"));
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", credentials);

            var requestUrl = "https://api.sandbox.paypal.com/v1/oauth2/token";
            var requestData = new StringContent("grant_type=client_credentials", Encoding.UTF8, "application/x-www-form-urlencoded");

            var response = await client.PostAsync(requestUrl, requestData);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var accessToken = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(responseContent).access_token;
                return accessToken;
            }
            else
            {
                throw new Exception($"Failed to get access token. {responseContent}");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="subscription_id"></param>
        /// <param name="ba_token"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        [HttpGet("HandleReturnUrl")]
        public async Task<IActionResult> HandleReturnUrl(string subscription_id, string ba_token, string token)
        {
            if (string.IsNullOrEmpty(subscription_id) || string.IsNullOrEmpty(ba_token) || string.IsNullOrEmpty(token))
            {
                return BadRequest("Missing parameters");
            }

            try
            {
                // Call PayPal APIs or database to check subscription and payment status
                string subscriptionDone = await GetSubscriptionDetails(subscription_id);
                var subscriptionDetails = JsonConvert.DeserializeObject<dynamic>(subscriptionDone);

                if (subscriptionDetails.status = "Active")
                {
                    return Ok("Your subscription has been successfully created.");
                }
                else
                {
                    return BadRequest("Failed to create the subscription. Please try again later.");
                }

            }
            catch (Exception ex)
            {
                // Log or handle exceptions
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="subscriptionId"></param>
        /// <returns></returns>
        [HttpGet("GetSubscriptionDetails")]
        public async Task<string> GetSubscriptionDetails(string subscriptionId)
        {
            try
            {
                var _httpClient = new HttpClient();
                string accessToken = await GetAccessToken(); // Assuming you have a method to retrieve access token
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

                string url = $"https://api.sandbox.paypal.com/v1/billing/subscriptions/{subscriptionId}";
                HttpResponseMessage response = await _httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    return responseBody;
                }
                else
                {
                    return $"Failed to retrieve subscription details. Status code: {response.StatusCode}";
                }
            }
            catch (Exception ex)
            {
                return $"An error occurred while retrieving subscription details: {ex.Message}";
            }
        }
    }
}