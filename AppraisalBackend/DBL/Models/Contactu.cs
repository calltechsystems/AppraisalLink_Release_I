namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class Contactu
    {
        public int ContactUsId { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string EmailAddress { get; set; } = null!;

        public bool UserLoggedIn { get; set; }

        public string PhoneNumber { get; set; } = null!;

        public string? Company { get; set; }

        public string State { get; set; } = null!;

        public string Subject { get; set; } = null!;

        public string Description { get; set; } = null!;
    }
}