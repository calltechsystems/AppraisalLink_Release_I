namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class AssignProperty
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public int AppraiserId { get; set; }

        public int PropertyId { get; set; }

        public DateTime? CreatedDateTime { get; set; }

        public int? AssignCount { get; set; }

        public bool? IsSelfAssigned { get; set; }
        public Property Property { get; set; }
    }
}