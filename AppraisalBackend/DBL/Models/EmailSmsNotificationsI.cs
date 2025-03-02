using System;
using System.Collections.Generic;

namespace DBL.Models
{
    public partial class EmailSmsNotificationsI
    {
        public int NotificationIdI { get; set; }
        public int? MsgCode { get; set; }
        public int? SubMsgCode { get; set; }
        public string? UserType { get; set; }
        public string? UserDescription { get; set; }
        public string? TriggerPoint { get; set; }
        public string? EmailSubject { get; set; }
        public string? EmailContent { get; set; }
        public string? SmsContent { get; set; }
    }
}