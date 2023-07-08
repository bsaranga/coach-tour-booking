using coach_tour_booking_data_access.Queries.Interfaces;
using coach_tour_booking_domain;
using coach_tour_booking_domain.DTOs;
using coach_tour_booking_domain.Services.Implementations;
using coach_tour_booking_domain.Services.Interfaces.Repositories;
using Moq;

namespace coach_tour_booking_tests
{
    [TestFixture]
    public class CustomerTests
    {
        IUserQuery userQuery;
        IAccountRepository accountRepository;

        public CustomerTests()
        {
            userQuery = SetupUserQueryMock();
            accountRepository = SetUpAccountRepositoryMock();
        }

        private IAccountRepository SetUpAccountRepositoryMock()
        {
            var accountRepositoryMock = new Mock<IAccountRepository>();
            accountRepositoryMock.Setup(a => a.CreateAccount(It.IsAny<CustomerInfo>())).Returns(new Account(Role.Customer));
            return accountRepositoryMock.Object;
        }
        private IUserQuery SetupUserQueryMock()
        {
            var userQueryMock = new Mock<IUserQuery>();
            userQueryMock.Setup(u => u.UserExists("phillip@europebus.eu")).Returns(true);
            userQueryMock.Setup(u => u.UserExists("adrian@europebus.eu")).Returns(false);
            return userQueryMock.Object;
        }

        [Test]
        public void When_An_Existing_Username_Is_Given_The_Appropriate_Error_Message_Should_Be_Returned()
        {
            var existingUsername = "phillip@europebus.eu";
            var accountService = new AccountService(userQuery, accountRepository);

            var validationResult = accountService.ValidateUsername(existingUsername);
            var expectedErrorMessage = "User already exists, please try logging in or try registering with a different username.";

            Assert.That(expectedErrorMessage, Is.EqualTo(validationResult.ErrorMessage));
        }

        [Test]
        public void When_A_New_Username_Is_Given_The_Validation_Should_Succeed()
        {
            var newUsername = "adrian@europebus.eu";
            var accountService = new AccountService(userQuery, accountRepository);

            var validationResult = accountService.ValidateUsername(newUsername);
            string? nullError = null;

            Assert.That(nullError, Is.EqualTo(validationResult.ErrorMessage));
        }

        [Test]
        public void When_A_CustomerInfo_DTO_Is_Given_A_Customer_Account_Is_Created()
        {
            // Create customer info object
            var customerInfo = new CustomerInfo
            {

            };
            
            // Create account using repository
            var accountService = new AccountService(userQuery, accountRepository);
            var account = accountService.CreateCustomerAccount(customerInfo);
            
            // Verify the created account has role of customer
            Assert.That(account.GetRole(), Is.EqualTo(Role.Customer));
        }
    }
}
