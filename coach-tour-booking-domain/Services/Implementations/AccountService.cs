using coach_tour_booking_domain.Services.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace coach_tour_booking_domain.Services.Implementations
{
    public class AccountService : IAccount
    {
        public ValidationResult ValidateUsername(string username)
        {
            throw new NotImplementedException();
        }
    }
}
