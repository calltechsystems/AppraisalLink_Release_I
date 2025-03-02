using System;
using System.Collections.Generic;

namespace DBL.Models
{
    public partial class EmailSmsNotificationsIi
    {
        public int NotificationIdIi { get; set; }
        public int? SubMsgCode { get; set; }
        public string? SubUserTypeDescription { get; set; }
        public int? NotificationTriggerCode { get; set; }
        public string? SubTriggerPoint { get; set; }
        public string? SubEmailDescription { get; set; }
        public string? SubEmailSubject { get; set; }
        public string? SubSmsContent { get; set; }
    }
}