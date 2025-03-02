using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DAL.Classes
{
    public class PaypalWebhookSubcriptionCreated
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("create_time")]
        public DateTime CreateTime { get; set; }

        [JsonProperty("resource_type")]
        public string ResourceType { get; set; }

        [JsonProperty("event_type")]
        public string EventType { get; set; }

        [JsonProperty("summary")]
        public string Summary { get; set; }

        [JsonProperty("resource")]
        public PayPalResource Resource { get; set; }

        [JsonProperty("links")]
        public List<PayPalLink> Links { get; set; }

        [JsonProperty("event_version")]
        public string EventVersion { get; set; }
    }

    public class PayPalResource
    {
        [JsonProperty("agreement_details")]
        public AgreementDetails AgreementDetails { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("links")]
        public List<PayPalLink> Links { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("shipping_address")]
        public Address ShippingAddress { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("plan")]
        public PaymentPlan Plan { get; set; }

        [JsonProperty("payer")]
        public PayerInfo Payer { get; set; }

        [JsonProperty("start_date")]
        public DateTime StartDate { get; set; }
    }

    public class AgreementDetails
    {
        [JsonProperty("outstanding_balance")]
        public CurrencyValue OutstandingBalance { get; set; }

        [JsonProperty("num_cycles_remaining")]
        public int NumCyclesRemaining { get; set; }

        [JsonProperty("num_cycles_completed")]
        public int NumCyclesCompleted { get; set; }

        [JsonProperty("final_payment_due_date")]
        public DateTime FinalPaymentDueDate { get; set; }

        [JsonProperty("failed_payment_count")]
        public int FailedPaymentCount { get; set; }
    }

    public class CurrencyValue
    {
        [JsonProperty("value")]
        public string Value { get; set; }
    }

    public class PayPalLink
    {
        [JsonProperty("href")]
        public string Href { get; set; }

        [JsonProperty("rel")]
        public string Rel { get; set; }

        [JsonProperty("method")]
        public string Method { get; set; }
    }

    public class Address
    {
        [JsonProperty("recipient_name")]
        public string RecipientName { get; set; }

        [JsonProperty("line1")]
        public string Line1 { get; set; }

        [JsonProperty("line2")]
        public string Line2 { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("postal_code")]
        public string PostalCode { get; set; }

        [JsonProperty("country_code")]
        public string CountryCode { get; set; }
    }

    public class PaymentPlan
    {
        [JsonProperty("curr_code")]
        public string CurrencyCode { get; set; }

        [JsonProperty("links")]
        public List<PayPalLink> Links { get; set; }

        [JsonProperty("payment_definitions")]
        public List<PaymentDefinition> PaymentDefinitions { get; set; }

        [JsonProperty("merchant_preferences")]
        public MerchantPreferences MerchantPreferences { get; set; }
    }

    public class PaymentDefinition
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("frequency")]
        public string Frequency { get; set; }

        [JsonProperty("frequency_interval")]
        public int FrequencyInterval { get; set; }

        [JsonProperty("amount")]
        public CurrencyValue Amount { get; set; }

        [JsonProperty("cycles")]
        public int Cycles { get; set; }

        [JsonProperty("charge_models")]
        public List<ChargeModel> ChargeModels { get; set; }
    }

    public class ChargeModel
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("amount")]
        public CurrencyValue Amount { get; set; }
    }

    public class MerchantPreferences
    {
        [JsonProperty("setup_fee")]
        public CurrencyValue SetupFee { get; set; }

        [JsonProperty("auto_bill_amount")]
        public string AutoBillAmount { get; set; }

        [JsonProperty("max_fail_attempts")]
        public int MaxFailAttempts { get; set; }
    }

    public class PayerInfo
    {
        [JsonProperty("payment_method")]
        public string PaymentMethod { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("payer_info")]
        public PayerDetails PayerDetails { get; set; }
    }

    public class PayerDetails
    {
        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("first_name")]
        public string FirstName { get; set; }

        [JsonProperty("last_name")]
        public string LastName { get; set; }

        [JsonProperty("payer_id")]
        public string PayerId { get; set; }

        [JsonProperty("shipping_address")]
        public Address ShippingAddress { get; set; }
    }

}
