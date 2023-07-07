using coach_tour_booking_data_access.Queries.Interfaces;
using coach_tour_booking_domain.Services.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace coach_tour_booking_domain.Services.Implementations
{
    public class AccountService : IAccount
    {
        private readonly IUserQuery userQuery;

        public AccountService(IUserQuery userQuery)
        {
            this.userQuery = userQuery;
        }

        public ValidationResult ValidateUsername(string username)
        {
            if (userQuery.UserExists(username))
            {
                return new ValidationResult("User already exists, please try logging in or try registering with a different username.");
            } else return new ValidationResult(null);
        }
    }
}
