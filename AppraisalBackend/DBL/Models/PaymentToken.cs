namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class PaymentToken
    {
        public int Id { get; set; }

        public int? UserId { get; set; }

        public int? PlanId { get; set; }

        public string? Token { get; set; }

        public DateTime CurrentDateTime { get; set; }

        public int? TopUpId { get; set; }
    }
}