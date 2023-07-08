using System.ComponentModel.DataAnnotations;
using coach_tour_booking_domain.DTOs;

namespace coach_tour_booking_domain.Services.Interfaces
{
    public interface IAccountService
    {
        ValidationResult ValidateUsername(string username);
        Account CreateCustomerAccount(CustomerInfo customerInfo);
    }
}