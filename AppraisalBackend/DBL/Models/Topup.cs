namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class Topup
    {
        public int Id { get; set; }

        public decimal? TopUpAmount { get; set; }

        public int? NoOfProperties { get; set; }

        public string? TopupName { get; set; }

        public string? TopupDescription { get; set; }

        public string? CurrencyCode { get; set; }

        public string? ReturnUrl { get; set; }

        public short? UserType { get; set; }
    }
}