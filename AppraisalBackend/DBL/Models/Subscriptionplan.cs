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

        public int? Frequencyinterval { get; set; }

        public decimal? Amount { get; set; }

        public int? Cycles { get; set; }

        public decimal? Setupfee { get; set; }

        public string? Cancelurl { get; set; }

        public string? Returnurl { get; set; }
    }
}