namespace coach_tour_booking_domain
{
    public class Account
    {
        private Role role;
        public readonly string firstName;
        public readonly string lastName;
        public readonly string surname;
        public readonly Gender gender;
        public readonly DateTime dateOfBirth;
        public readonly string address;
        public readonly string country;
        public readonly string phone;

        public Account(string firstName, string lastName, string surname, Gender gender, DateTime dateOfBirth, string address, string country, string phone)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.surname = surname;
            this.gender = gender;
            this.dateOfBirth = dateOfBirth;
            this.address = address;
            this.country = country;
            this.phone = phone;
        }

        public Role GetRole()
        {
            return this.role;
        }

        public void SetRole(Role role)
        {
            this.role = role;
        }
    }
}