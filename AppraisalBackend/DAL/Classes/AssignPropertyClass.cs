using DBL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Classes
{
    public class AssignPropertyClass
    {
        public int Id { get; set; }

        public int Companyid { get; set; }

        public int Appraiserid { get; set; }

        public int Propertyid { get; set; }

        public Property properrtyDetails {  get; set; }
    }
}
