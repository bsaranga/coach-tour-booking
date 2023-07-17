namespace coach_tour_booking_domain.DTOs
{
    public class CustomerDto
    {
        public CustomerDto(
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
            Email = email;
            DateOfBirth = dateOfBirth;
            EuPassportNumber = euPassportNumber;
            Address1 = address1;
            Address2 = address2;
            Country = country;
            Phone = phone;
        }

        public string FirstName { get; }
        public string LastName { get; }
        public string Surname { get; }
        public string Email { get; }
        public DateTime DateOfBirth { get; }
        public string EuPassportNumber { get; }
        public string Address1 { get; }
        public string Address2 { get; }
        public string Country { get; }
        public string Phone { get; }
        public string? ExternalAuthId { get; private set; }

        public CustomerDto SetAuthId(string authId)
        {
            ExternalAuthId = authId;
            return this;
        }
    }
}
