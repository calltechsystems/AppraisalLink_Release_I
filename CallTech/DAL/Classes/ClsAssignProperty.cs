using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Classes
{
    public class ClsAssignProperty
    {
        public int Companyid { get; set; }

        public int Appraiserid { get; set; }

        public int Propertyid { get; set; }
        public bool IsSelfAssigned { get; set; }
    }
}
