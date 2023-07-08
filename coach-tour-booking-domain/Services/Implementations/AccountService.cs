using coach_tour_booking_data_access.Queries.Interfaces;
using coach_tour_booking_domain.DTOs;
using coach_tour_booking_domain.Services.Interfaces;
using coach_tour_booking_domain.Services.Interfaces.Repositories;
using System.ComponentModel.DataAnnotations;

namespace coach_tour_booking_domain.Services.Implementations
{
    public class AccountService : IAccountService
    {
        private readonly IUserQuery userQuery;
        private readonly IAccountRepository accountRepository;

        public AccountService(IUserQuery userQuery, IAccountRepository accountRepository)
        {
            this.userQuery = userQuery;
            this.accountRepository = accountRepository;
        }

        public Account CreateCustomerAccount(CustomerInfo customerInfo)
        {
            var account = accountRepository.CreateAccount(customerInfo);
            return account;
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
