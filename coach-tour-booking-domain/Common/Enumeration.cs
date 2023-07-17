namespace coach_tour_booking_domain.Common
{
    public class Enumeration
    {
        public int Id { get; }
        public string Name { get; }
        public string? PersistedName { get; }

        public Enumeration(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public Enumeration(int id, string name, string persistedName)
        {
            Id = id;
            Name = name;
            PersistedName = persistedName;
        }

        public override string? ToString()
        {
            return PersistedName ?? Name;
        }
    }
}
