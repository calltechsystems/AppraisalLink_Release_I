using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Classes
{
    public class ClsPlan
    {
        public long PlanId { get; set; }

        public string PlanName { get; set; } = null!;

        public double Amount { get; set; }

        public int NoOfBids { get; set; }
    }
}
