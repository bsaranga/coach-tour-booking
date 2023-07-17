using coach_tour_booking_domain.Common;

namespace coach_booking_auth.Models.Enumerations
{
    public class Role : Enumeration
    {
        public readonly static Role ADMIN = new Role(0, nameof(ADMIN));
        public readonly static Role DISPATCH_STAFF = new Role(1, nameof(DISPATCH_STAFF));
        public readonly static Role OPERATIONAL_STAFF = new Role(2, nameof(OPERATIONAL_STAFF));
        public readonly static Role STATION_MANAGER = new Role(3, nameof(STATION_MANAGER));
        public readonly static Role CONSUMER = new Role(4, nameof(CONSUMER));

        public Role(int Id, string Name) : base (Id, Name)
        {

        }
    }
}
