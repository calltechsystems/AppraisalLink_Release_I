using DBL.Models;

namespace DBL.Backend
{
    public class PaypalTopUpPayment
    {
        public PaypalTopUpPayment()
        {
            ProductList = new List<Topup>();
        }
        public List<Topup> ProductList { get; set; }
        public string SiteURL { get; set; }
        public string InvoiceNumber { get; set; }
        public string Currency { get; set; }
        public string Tax { get; set; }
        public string ShippingFee { get; set; }
        public string OrderDescription { get; set; }
        public string PayerId { get; set; }
        public string PaymentId { get; set; }
        public string Token { get; set; }
        public int? Count { get; set; }
        public string StartId { get; set; }
        public int? StartIndex { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string StartDate { get; set; }
        public string PayeeEmail { get; set; }
        public string PayeeId { get; set; }
        public string SortBy { get; set; }
        public string SortOrder { get; set; }
    }
}
