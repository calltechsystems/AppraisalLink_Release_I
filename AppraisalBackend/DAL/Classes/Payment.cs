using System.ComponentModel.DataAnnotations;

namespace DAL.Classes
{
    public class PaymentPayload
    {

        [Required]
        public DateTime CreateTime { get; set; }

        [Required]
        public DateTime UpdateTime { get; set; }

        public short PlanId { get; set; }  // Returned from PayPal

        public double PlanAmount { get; set; } // Returned from PayPal

        [Required]
        [MaxLength(255)]
        public string PlanName { get; set; }  // Returned from PayPal

        [Required]
        public int UserId { get; set; }

        [Required]
        [MaxLength(255)]
        public string PaymentId { get; set; }  // Returned from PayPal

        public int TopUpId { get; set; }

        [Required]
        public string PaymentRequestSent { get; set; }  // Request payload sent to PayPal

        [Required]
        public string PaymentResponseReceived { get; set; }  // Response payload received from PayPal

        [Required]
        [MaxLength(50)]
        public string Status { get; set; }  // Status (COMPLETED, etc.)

        [Required]
        [MaxLength(10)]
        public string CurrencyCode { get; set; }  // CAD, USD, etc.
    }
}
