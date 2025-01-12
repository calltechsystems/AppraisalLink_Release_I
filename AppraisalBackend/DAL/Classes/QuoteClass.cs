using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Classes
{
    public class QuoteClass
    {
        public long Quoteid { get; set; }
        public int OrderStatus { get; set; }
        public string remark { get; set; }
        public string statusDate { get; set; }


        //long Quoteid, int OrderStatus,string remark
    }
}
