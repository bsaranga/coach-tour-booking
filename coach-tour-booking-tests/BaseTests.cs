/*
 * You have been approached by a company called Europe Bus which is planning to 
 * launch a service offering coach journeys to European countries, such as 
 * France, Spain, Germany, etc. 
 * They wish to introduce an IT system to support their business. You are 
 * required to implement a prototype of a system which will help them manage 
 * their routes and coaches. 
 * 
 * Potential customers should be able to search for and book coach journeys.
 * The system will be used by two types of users:
    (x) Europe Bus employees
    (x) Customers
 * The system needs to provide the following functionality to each type of user:
 *  1. Europe Bus employees:
        - Manage routes – adding new routes, as well as editing or deleting existing ones
        - View a list of all routes
 *  2. Customers:
        - Register an account
        - Search for available journeys by departure and destination
        - Book a coach journey

For the time being, the system has to support only single journeys – 
so someone wishing to book a return journey would just have to book two single journeys.
The information kept about a route should include at least the following: 
    - departure country and town, 
    - destination country and town, 
    - day(s) of the week on which this route operates, 
    - departure time, 
    - journey price, 
    - capacity (number of seats available).

A customer needs to register an account in order to book a trip. The system should capture 
at least the following details during the registration process: 
    - first name, 
    - surname, 
    - email address (also used as username), 
    - password, 
    - gender, 
    - date of birth, 
    - phone number and 
    - address.

A customer should only be able to book trips in the future and the system should not allow 
overbooking of trips – i.e. there should not be more seats sold than there is capacity on 
a particular journey.

The application needs to provide the following functionality to a user:
    1. Log in
    2. Add/edit/delete routes

It must be possible for an employee to view a list of routes and to filter the list by 
various criteria, such as destination, day of the week, price, etc.
 */
namespace coach_tour_booking_tests
{
    [TestFixture]
    public class BaseTests
    {
        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void FirstTestAlwaysPasses()
        {
            Console.WriteLine("Hello world...");
            Assert.Pass();
        }
    }
}