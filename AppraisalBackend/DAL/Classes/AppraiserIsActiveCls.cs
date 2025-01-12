using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Classes
{
    public class AppraiserIsActiveCls
    {
        public long CompanyId { get; set; }
        public long AppraiserId { get; set; }
        public bool Value { get; set; }
    }
}
