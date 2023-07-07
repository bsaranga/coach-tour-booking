using coach_tour_booking_data_access.Queries.Interfaces;
using coach_tour_booking_domain.Services.Implementations;
using Moq;

namespace coach_tour_booking_tests
{
    [TestFixture]
    public class CustomerTests
    {
        IUserQuery userQuery;

        public CustomerTests()
        {
            var userQueryMock = new Mock<IUserQuery>();
            userQueryMock.Setup(u => u.UserExists("phillip@europebus.eu")).Returns(true);
            userQueryMock.Setup(u => u.UserExists("adrian@europebus.eu")).Returns(false);
            userQuery = userQueryMock.Object;
        }

        [Test]
        public void When_An_Existing_Username_Is_Given_The_Appropriate_Error_Message_Should_Be_Returned()
        {
            var existingUsername = "phillip@europebus.eu";
            var accountService = new AccountService(userQuery);

            var validationResult = accountService.ValidateUsername(existingUsername);
            var expectedErrorMessage = "User already exists, please try logging in or try registering with a different username.";

            Assert.That(expectedErrorMessage, Is.EqualTo(validationResult.ErrorMessage));
        }

        [Test]
        public void When_A_New_Username_Is_Given_The_Validation_Should_Succeed()
        {
            var newUsername = "adrian@europebus.eu";
            var accountService = new AccountService(userQuery);

            var validationResult = accountService.ValidateUsername(newUsername);
            string? nullError = null;

            Assert.That(nullError, Is.EqualTo(validationResult.ErrorMessage));
        }
    }
}
