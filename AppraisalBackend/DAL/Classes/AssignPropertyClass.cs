using DBL.Models;

namespace DAL.Classes
{
    public class AssignPropertyClass
    {
        public int Id { get; set; }

        public int Companyid { get; set; }

        public int Appraiserid { get; set; }

        public int Propertyid { get; set; }

        public Property properrtyDetails { get; set; }
    }
}
