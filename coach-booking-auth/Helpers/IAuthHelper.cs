using Microsoft.AspNetCore.Identity;
using coach_booking_auth.Models;

namespace coach_booking_auth.Helpers
{
    public interface IAuthHelper
    {
        Task<IdentityUser?> ValidateUser(LoginCredentials? credentials);
        Task<string> GenerateToken(IdentityUser identityUser);
        Task SendEmailConfirmationMessage(IdentityUser identityUser);
        Task<bool> VerifyEmail(string emailToken, IdentityUser identityUser);

        #region For Seeding
        Task CreateDefaultRoles();
        Task CreateDefaultAdminUser();
        Task AddDefaultClaimsToDefaultAdmin();
        #endregion
    }
}