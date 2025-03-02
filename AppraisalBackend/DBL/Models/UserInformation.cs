namespace DBL.Models
{
    /// <summary>
    /// 
    /// </summary>
    public partial class UserInformation
    {
        public long UserId { get; set; }

        public string Email { get; set; } = null!;

        public string? Password { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public byte[]? PasswordSalt { get; set; }

        public byte[]? PasswordHash { get; set; }

        public short? UserType { get; set; }

        public string? ForgotPasswordToken { get; set; }

        public string? VerifyEmailToken { get; set; }

        public DateTime? ResetTokenExpiry { get; set; }

        public int? GetSms { get; set; }

        public int? GetEmail { get; set; }

        public bool? IsAdmin { get; set; }

        public bool? IsPasswordSet { get; set; }
    }
}