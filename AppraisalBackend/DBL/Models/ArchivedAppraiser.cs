namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class ArchivedAppraiser
    {
        public long Id { get; set; }

        public long? OrderId { get; set; }

        public long? UserId { get; set; }
    }
}