using System.ComponentModel.DataAnnotations;

namespace DAL.Classes
{
    public class ClsChangePassword
    {
        [Required]
        public string Email { get; set; } = String.Empty;

        [Required]
        public string OldPassword { get; set; } = String.Empty;

        [Required]
        public string NewPassword { get; set; } = String.Empty;
    }
}
