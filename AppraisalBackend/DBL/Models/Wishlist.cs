namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class Wishlist
    {
        public long Id { get; set; }

        public long PropertyId { get; set; }

        public long UserId { get; set; }

        public DateTime? AddedDateTime { get; set; }
    }
}