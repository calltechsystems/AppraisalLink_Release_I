namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class Subscriptionplan
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public string? Type { get; set; }

        public string? Frequency { get; set; }

        public int? FrequencyInterval { get; set; }

        public decimal? Amount { get; set; }

        public int? Cycles { get; set; }

        public decimal? SetupFee { get; set; }

        public string? CancelUrl { get; set; }

        public string? ReturnUrl { get; set; }
    }
}