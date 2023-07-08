namespace coach_tour_booking_domain
{
    public class Account
    {
        private readonly Role role;

        public Account(Role role)
        {
            this.role = role;
        }

        public Role GetRole()
        {
            return this.role;
        }
    }
}