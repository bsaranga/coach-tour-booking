using coach_tour_booking_domain;
using coach_tour_booking_domain.DTOs;
using coach_tour_booking_domain.Services.Interfaces.Repositories;

namespace coach_tour_booking_data_access.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        public AccountRepository()
        {
                
        }

        public Account CreateAccount(IAccountInfo customerInfo)
        {
            Role assignedRole = 0;

            if (customerInfo.GetType().Equals(typeof(CustomerInfo)))
            {
                assignedRole = Role.Customer;
            }

            var _customerInfo = customerInfo as CustomerInfo;

            var account = new Account(
                _customerInfo.FirstName,
                _customerInfo.LastName,
                _customerInfo.Surname,
                _customerInfo.Gender,
                _customerInfo.DateOfBirth,
                _customerInfo.Address,
                _customerInfo.Country,
                _customerInfo.Phone);

            account.SetRole(assignedRole);
            return account;
        }
    }
}
