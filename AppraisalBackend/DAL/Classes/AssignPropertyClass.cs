using DBL.Models;

namespace DAL.Classes
{
    public class AssignPropertyClass
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public int AppraiserId { get; set; }

        public int PropertyId { get; set; }

        public Property PropertyDetail { get; set; }
    }
}
