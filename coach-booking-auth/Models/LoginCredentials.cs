using System.ComponentModel.DataAnnotations;

namespace coach_booking_auth.Models
{
    public class LoginCredentials
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}
