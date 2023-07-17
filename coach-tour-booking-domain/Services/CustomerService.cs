using coach_tour_booking_data_access.Models;
using coach_tour_booking_domain.DTOs;
using coach_tour_booking_domain.Mappers;
using Microsoft.Extensions.Logging;

namespace coach_tour_booking_domain.Services
{
    public class CustomerService
    {
        private readonly EuroBusContext euroBusContext;
        private readonly ILogger<CustomerService> logger;

        public CustomerService(EuroBusContext euroBusContext, ILogger<CustomerService> logger)
        {
            this.logger = logger;
            this.euroBusContext = euroBusContext;
        }

        public async Task AddCustomer(CustomerDto customer)
        {
            try
            {
                euroBusContext.Customers.Add(customer.MapToCustomerDbModel());
                await euroBusContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
            }
        }
    }
}
