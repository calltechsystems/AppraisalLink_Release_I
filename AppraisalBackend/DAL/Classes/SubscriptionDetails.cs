namespace DAL.Classes
{
    public class SubscriptionDetails
    {
        // public int SubscriptionId { get; set; } // subscription_id
        public DateTime StartDate { get; set; } // start_date
        public DateTime EndDate { get; set; } // end_date, nullable
        public short PlanId { get; set; } // plan_id
        public short TotalProperties { get; set; } // total_properties
        public short UsedProperties { get; set; } // used_properties
        public int UserId { get; set; } // user_id
        public int? TopUpId { get; set; } // topUp_id, nullable
        public string PaymentPayload { get; set; } // subscription
    }
    //public class TransactionLogs
    //{
    //   // public string TransactionId { get; set; } // transaction_id
    //    public string TransactionDetail { get; set; } // transaction_detail
    //    public int UserId { get; set; } // user_id
    //    public string PaymentId { get; set; } // paymentid
    //    public DateTime CreatedTime { get; set; } // created_time
    //    public double PlanAmount { get; set; } // plan_amount
    //    public string PlanName { get; set; } // plan_name
    //    public bool IsActive { get; set; } // Is_Active
    //    public DateTime StartDate { get; set; } // start_date
    //    public DateTime? EndDate { get; set; } // end_date, nullable
    //    public short UsedProperties { get; set; } // used_properties
    //    public short NoOfProperties { get; set; } // no_of_properties
    //    public short TotalProperties { get; set; } // total_properties
    //}
}
