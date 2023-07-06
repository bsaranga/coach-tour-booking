using System.ComponentModel.DataAnnotations;

namespace coach_tour_booking_domain.Services.Interfaces
{
    public interface IAccount
    {
        ValidationResult ValidateUsername(string username);
    }
}
