namespace coach_tour_booking_domain.DTOs
{
    public class CustomerRegistrationDto
    {
        public CustomerDetails? CustomerDetails { get; set; }
        public CustomerLoginCredentials? CustomerLoginCredentials { get; set; }
    }

    public class CustomerDetails
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Surname { get; set; }
        public string? EmailAddress { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? EuPassportNumber { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? Country { get; set; }
        public string? Phone { get; set; }
    }

    public class CustomerLoginCredentials
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}