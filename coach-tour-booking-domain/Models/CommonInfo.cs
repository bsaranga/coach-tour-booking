namespace coach_tour_booking_domain
{
    public class CommonInfo
    {
        public string FirstName;
        public string LastName;
        public string Surname;
        public Gender Gender;
        public DateTime DateOfBirth;
        public string Address;
        public string Country;
        public string Phone;

        public CommonInfo(string firstName, string lastName, string surname, Gender gender, DateTime dateOfBirth, string address, string country, string phone)
        {
            FirstName = firstName;
            LastName = lastName;
            Surname = surname;
            Gender = gender;
            DateOfBirth = dateOfBirth;
            Address = address;
            Country = country;
            Phone = phone;
        }
    }
}