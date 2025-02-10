using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Classes
{
    public class SubscriptionDto
    {
        public long SubscriptionId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public short PlanId { get; set; }
        public long? UserId { get; set; }
        public int? TopUpId { get; set; }
        public string? Status { get; set; }
        public string? CurrencyCode { get; set; }
        public string? PaymentId { get; set; }
        public bool IsActive { get; set; }
    }
}
