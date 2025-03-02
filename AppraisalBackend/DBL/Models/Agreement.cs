namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class Agreement
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public DateTime? StartDate { get; set; }

        public string? PayPalAgreementId { get; set; }

        public int? SubscriptionId { get; set; }
    }
}