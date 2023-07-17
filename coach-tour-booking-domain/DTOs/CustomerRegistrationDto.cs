namespace coach_tour_booking_domain.DTOs
{
    public class CustomerRegistrationDto
    {
        public CustomerDetails CustomerDetails { get; }
        public CustomerLoginCredentials CustomerLoginCredentials { get; }

        public CustomerRegistrationDto(CustomerDetails customerDetails, CustomerLoginCredentials customerLoginCredentials)
        {
            CustomerDetails = customerDetails;
            CustomerLoginCredentials = customerLoginCredentials;
        }
    }

    public class CustomerDetails
    {
        public string FirstName { get; }
        public string LastName { get; }
        public string Surname { get; }
        public string EmailAddress { get; }
        public DateTime DateOfBirth { get; }
        public string EuPassportNumber { get; }
        public string Address1 { get; }
        public string Address2 { get; }
        public string Country { get; }
        public string Phone { get; }

        public CustomerDetails(
            string firstName, 
            string lastName, 
            string surname, 
            string email, 
            DateTime dateOfBirth, 
            string euPassportNumber, 
            string address1, 
            string address2, 
            string country, 
            string phone)
        {
            FirstName = firstName;
            LastName = lastName;
            Surname = surname;
            EmailAddress = email;
            DateOfBirth = dateOfBirth;
            EuPassportNumber = euPassportNumber;
            Address1 = address1;
            Address2 = address2;
            Country = country;
            Phone = phone;
        }
    }

    public class CustomerLoginCredentials
    {
        public string Username { get; }
        public string Password { get; }
        public CustomerLoginCredentials(string username, string password)
        {
            Username = username;
            Password = password;
        }
    }
}