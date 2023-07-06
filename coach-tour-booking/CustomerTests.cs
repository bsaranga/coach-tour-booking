using coach_tour_booking_domain.Services.Implementations;

namespace coach_tour_booking_tests
{
    [TestFixture]
    public class CustomerTests
    {
        [Test]
        public void When_An_Existing_Username_Is_Given_The_Appropriate_Error_Message_Should_Be_Returned()
        {
            var existingUsername = "phillip@europebus.eu";
            var accountService = new AccountService();

            var validationResult = accountService.ValidateUsername(existingUsername);
            var expectedErrorMessage = "User already exists, please try logging in or try registering with a different username.";

            Assert.Equals(expectedErrorMessage, validationResult.ErrorMessage!);
        }
    }
}
