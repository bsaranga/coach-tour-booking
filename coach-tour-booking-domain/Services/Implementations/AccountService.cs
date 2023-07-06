using coach_tour_booking_domain.Services.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace coach_tour_booking_domain.Services.Implementations
{
    public class AccountService : IAccount
    {
        public ValidationResult ValidateUsername(string username)
        {
            return new ValidationResult("User already exists, please try logging in or try registering with a different username.");
        }
    }
}
