using coach_tour_booking_domain.DTOs;

namespace coach_tour_booking_domain.Mappers
{
    public static class DtoToDto
    {
        public static CustomerDto MapToCustomerDto(this CustomerRegistrationDto customerRegistrationDto)
        {
            return new CustomerDto(
                customerRegistrationDto.CustomerDetails.FirstName,
                customerRegistrationDto.CustomerDetails.LastName,
                customerRegistrationDto.CustomerDetails.Surname,
                customerRegistrationDto.CustomerDetails.EmailAddress,
                customerRegistrationDto.CustomerDetails.DateOfBirth,
                customerRegistrationDto.CustomerDetails.EuPassportNumber,
                customerRegistrationDto.CustomerDetails.Address1,
                customerRegistrationDto.CustomerDetails.Address2,
                customerRegistrationDto.CustomerDetails.Country,
                customerRegistrationDto.CustomerDetails.Phone
                );
        }
    }
}
