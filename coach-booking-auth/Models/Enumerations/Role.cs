using coach_tour_booking_domain.Common;

namespace coach_booking_auth.Models.Enumerations
{
    public class Role : Enumeration
    {
        public readonly static Role ADMIN = new Role(0, nameof(ADMIN));
        public readonly static Role EMPLOYEE = new Role(1, nameof(EMPLOYEE));
        public readonly static Role CUSTOMER = new Role(2, nameof(CUSTOMER));

        public Role(int Id, string Name) : base (Id, Name)
        {

        }
    }
}
