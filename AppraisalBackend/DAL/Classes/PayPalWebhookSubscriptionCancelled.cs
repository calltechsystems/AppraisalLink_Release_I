using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using PayPal.Api;

namespace DAL.Classes
{
    public class PayPalWebhookSubscriptionCancelled
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
        public SubscriptionCancelledPayPalResource Resource { get; set; }

        [JsonProperty("links")]
        public List<SubscriptionCancelledPayPalLink> Links { get; set; }

        [JsonProperty("event_version")]
        public string EventVersion { get; set; }
    }
    public class SubscriptionCancelledPayPalResource
    {
        [JsonProperty("agreement_details")]
        public SubscriptionCancelledAgreementDetails AgreementDetails { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("links")]
        public List<SubscriptionCancelledPayPalLink> Links { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("shipping_address")]
        public SubscriptionCancelledAddress ShippingAddress { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("plan")]
        public SubscriptionCancelledPayPalPlan Plan { get; set; }

        [JsonProperty("payer")]
        public SubscriptionCancelledPayer Payer { get; set; }

        [JsonProperty("start_date")]
        public DateTime StartDate { get; set; }
    }
    public class SubscriptionCancelledPayer
    {
        [JsonProperty("payment_method")]
        public string PaymentMethod { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("payer_info")]
        public SubscriptionCancelledPayerInfo PayerInfo { get; set; }
    }
    public class SubscriptionCancelledPayerInfo
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
        public SubscriptionCancelledAddress ShippingAddress { get; set; }
    }
    public class SubscriptionCancelledAddress
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
    public class SubscriptionCancelledPayPalPlan
    {
        [JsonProperty("curr_code")]
        public string CurrencyCode { get; set; }

        [JsonProperty("links")]
        public List<SubscriptionCancelledPayPalLink> Links { get; set; }

        [JsonProperty("payment_definitions")]
        public List<SubscriptionCancelledPaymentDefinition> PaymentDefinitions { get; set; }

        [JsonProperty("merchant_preferences")]
        public SubscriptionCancelledMerchantPreferences MerchantPreferences { get; set; }
    }
    public class SubscriptionCancelledMerchantPreferences
    {
        [JsonProperty("setup_fee")]
        public SubscriptionCancelledAmount SetupFee { get; set; }

        [JsonProperty("auto_bill_amount")]
        public string AutoBillAmount { get; set; }

        [JsonProperty("max_fail_attempts")]
        public int MaxFailAttempts { get; set; }
    }
    public class SubscriptionCancelledAmount
    {
        [JsonProperty("value")]
        public string Value { get; set; }
    }
    public class SubscriptionCancelledPaymentDefinition
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("frequency")]
        public string Frequency { get; set; }

        [JsonProperty("frequency_interval")]
        public string FrequencyInterval { get; set; }

        [JsonProperty("amount")]
        public Amount Amount { get; set; }

        [JsonProperty("cycles")]
        public int Cycles { get; set; }

        [JsonProperty("charge_models")]
        public List<SubscriptionCancelledChargeModel> ChargeModels { get; set; }
    }

    public class SubscriptionCancelledChargeModel
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("amount")]
        public Amount Amount { get; set; }
    }
    public class SubscriptionCancelledAgreementDetails
    {
        [JsonProperty("outstanding_balance")]
        public Amount OutstandingBalance { get; set; }

        [JsonProperty("num_cycles_remaining")]
        public int NumCyclesRemaining { get; set; }

        [JsonProperty("num_cycles_completed")]
        public int NumCyclesCompleted { get; set; }

        [JsonProperty("last_payment_date")]
        public DateTime? LastPaymentDate { get; set; }

        [JsonProperty("last_payment_amount")]
        public Amount LastPaymentAmount { get; set; }

        [JsonProperty("final_payment_due_date")]
        public DateTime? FinalPaymentDueDate { get; set; }

        [JsonProperty("failed_payment_count")]
        public int FailedPaymentCount { get; set; }
    }
    public class SubscriptionCancelledPayPalLink
    {
        [JsonProperty("href")]
        public string Href { get; set; }

        [JsonProperty("rel")]
        public string Rel { get; set; }

        [JsonProperty("method")]
        public string Method { get; set; }

        [JsonProperty("encType")]
        public string EncType { get; set; }
    }
}
