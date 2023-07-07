namespace coach_tour_booking_data_access.Queries.Interfaces
{
    public interface IUserQuery
    {
        bool UserExists(string username);
    }
}
