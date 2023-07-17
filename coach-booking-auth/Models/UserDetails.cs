using System.ComponentModel.DataAnnotations;

namespace coach_booking_auth.Models
{
    public class UserDetails
    {
        [Required]
        public string? Firstname { get; set; }

        [Required]
        public string? Lastname { get; set; }

        [Required]
        public string? Username { get; set; }

        [Required]
        public string? Password { get; set; }

        [Required]
        public string? Email { get; set; }

        [Required]
        public int Role { get; set; }
    }
}
