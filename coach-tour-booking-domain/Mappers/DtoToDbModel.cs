using coach_tour_booking_data_access.Models;
using coach_tour_booking_domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace coach_tour_booking_domain.Mappers
{
    public static class DtoToDbModel
    {
        public static Customer MapToCustomerDbModel(this CustomerDto customerDto)
        {
            return new Customer
            {
                FirstName = customerDto.FirstName,
                LastName = customerDto.LastName,
                Surname = customerDto.Surname,
                Address1 = customerDto.Address1,
                Address2 = customerDto.Address2,
                Country = customerDto.Country,
                DateOfBirth = customerDto.DateOfBirth,
                EmailAddress = customerDto.Email,
                EupassportNumber = customerDto.EuPassportNumber,
                Phone = customerDto.Phone,
                ExternalAuthId = customerDto.ExternalAuthId
            };
        }
    }
}
