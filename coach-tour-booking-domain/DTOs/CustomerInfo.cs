namespace coach_tour_booking_domain.DTOs
{
    public class CustomerInfo : CommonInfo, IAccountInfo
    {
        public CustomerInfo(string firstName, string lastName, string surname, Gender gender, DateTime dateOfBirth, string address, string country, string phone) 
            : base(firstName, lastName, surname, gender, dateOfBirth, address, country, phone)
        {
            
        }
    }
}