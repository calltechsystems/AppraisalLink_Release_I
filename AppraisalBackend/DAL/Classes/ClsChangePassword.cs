using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Classes
{
    public class ClsChangePassword
    {
        [Required]
        public string Email { get; set;}
        [Required]
        public string OldPassword { get; set;}
        [Required]
        public string NewPassword { get; set; }
    }
}
