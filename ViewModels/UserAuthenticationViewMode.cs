using System.ComponentModel.DataAnnotations;

namespace $safeprojectname$.ViewModels
{
    public class UserAuthenticationViewModel
    {
        [Required(ErrorMessage = "Username is required.")]
        [RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "Username can only contain letters and numbers.")]
        [StringLength(32, ErrorMessage = "Username can only be 32 characters long.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(256, ErrorMessage = "Password max length is 256 characters.")]
        public string Password { get; set; }
    }
}