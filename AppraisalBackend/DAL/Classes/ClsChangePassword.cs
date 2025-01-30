using System.ComponentModel.DataAnnotations;

namespace DAL.Classes;

public class ClsChangePassword
{
    [Required] public string Email { get; set; }

    [Required] public string OldPassword { get; set; }

    [Required] public string NewPassword { get; set; }
}