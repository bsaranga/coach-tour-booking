using coach_tour_booking_domain.DTOs;

namespace coach_tour_booking_domain.Services.Interfaces.Repositories
{
    public interface IAccountRepository
    {
        Account CreateAccount(IAccountInfo customerInfo);
    }
}