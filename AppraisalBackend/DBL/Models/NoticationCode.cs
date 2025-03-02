using System;
using System.Collections.Generic;

namespace DBL.Models
{
    public partial class NoticationCode
    {
        public int CodeId { get; set; }
        public int? NotificationTriggerCode { get; set; }
        public string? NotificationDescription { get; set; }
    }
}