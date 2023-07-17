using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using coach_booking_auth.Configuration.Models;
using coach_booking_auth.Models;
using coach_booking_auth.Models.Enumerations;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Web;
using coach_tour_booking_domain.Services.Interfaces;

namespace coach_booking_auth.Helpers
{
    public class DefaultAuthHelper : IAuthHelper
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;
        private readonly ILogger<DefaultAuthHelper> logger;
        private readonly ITemplateFetcher templateFetcher;
        private readonly IEmailService emailService;
        private readonly JwtBearerTokenSettings jwtTokenSettings;

        public DefaultAuthHelper(
            UserManager<IdentityUser> userManager, 
            RoleManager<IdentityRole> roleManager, 
            IConfiguration configuration, 
            IOptions<JwtBearerTokenSettings> jwtTokenOptions, 
            ILogger<DefaultAuthHelper> logger,
            ITemplateFetcher templateFetcher,
            IEmailService emailService
            )
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
            this.logger = logger;
            this.templateFetcher = templateFetcher;
            this.emailService = emailService;
            this.jwtTokenSettings = jwtTokenOptions.Value;
        }

        public async Task SendEmailConfirmationMessage(IdentityUser identityUser)
        {
            var emailToken = await userManager.GenerateEmailConfirmationTokenAsync(identityUser);
            var emailTemplate = await templateFetcher.FetchEmailTemplate("VerifyAccount.html");
            
            var userId = identityUser.Id;
            var urlEncodedToken = HttpUtility.UrlEncode(emailToken);

            var baseUrl = configuration["Host:BaseUrl"];
            var callbackUrl = $"{baseUrl}/api/auth/verifyEmail?userId={userId}&emailToken={urlEncodedToken}";
            var emailBody = emailTemplate.Replace("{{verificationUrl}}", callbackUrl);
            var mailMessage = new MailMessage(configuration["EmailSettings:Email"], $"{identityUser.Email}")
            {
                Subject = "Verify Your Europe Bus Account",
                Priority = MailPriority.High,
                Body = emailBody,
                IsBodyHtml = true,
            };

            var emailClient = emailService.CreateSmtpClient();
            emailClient.Send(mailMessage);
        }

        public async Task<bool> VerifyEmail(string emailToken, IdentityUser identityUser)
        {
            if (!await userManager.IsEmailConfirmedAsync(identityUser))
            {
                var result = await userManager.ConfirmEmailAsync(identityUser, emailToken);
                if (result.Succeeded)
                    return true;
            }

            return false;
        }

        public async Task<IdentityUser?> ValidateUser(LoginCredentials? credentials)
        {
            var identityUser = await userManager.FindByNameAsync(credentials?.Username);
            
            if (identityUser != null)
            {
                var result = userManager.PasswordHasher.VerifyHashedPassword(identityUser, identityUser.PasswordHash, credentials?.Password);
                if (result == PasswordVerificationResult.Failed)
                    return null;

                return identityUser;
            }

            return null;
        }

        public async Task<string> GenerateToken(IdentityUser identityUser)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtTokenSettings.SecretKey!);
            var userClaims = await userManager.GetClaimsAsync(identityUser);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(userClaims),

                Expires = DateTime.UtcNow.AddSeconds(jwtTokenSettings.ExpiryTimeInSeconds),
                Audience = jwtTokenSettings.Audience,
                Issuer = jwtTokenSettings.Issuer,
                IssuedAt = DateTime.Now,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        #region For Seeding
        public async Task CreateDefaultRoles()
        {
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole(Role.ADMIN.Name),
                new IdentityRole(Role.CUSTOMER.Name),
            };

            foreach (var role in roles)
            {
                if (!(await roleManager.RoleExistsAsync(role.Name)))
                {
                    await roleManager.CreateAsync(role);
                    logger.LogInformation($"Role = {role.Name} created.");
                }
                else logger.LogError($"Role = {role.Name} already exists, skipping creation.");
            }
        }

        public async Task CreateDefaultAdminUser()
        {
            var existingAdmin = await userManager.FindByNameAsync("admin");
            if (existingAdmin == null)
            {
                logger.LogInformation("User doesn't exist, creating default user...");

                var defaultAdminUser = new IdentityUser("admin");
                await userManager.SetEmailAsync(defaultAdminUser, "admin@eurobus.com");
                
                var createdUser = await userManager.CreateAsync(defaultAdminUser, "admin");
                
                if (createdUser.Succeeded)
                {
                    defaultAdminUser = await userManager.FindByNameAsync("admin");

                    if (!(await userManager.IsEmailConfirmedAsync(defaultAdminUser)))
                    {
                        var emailConfToken = await userManager.GenerateEmailConfirmationTokenAsync(defaultAdminUser);
                        logger.LogInformation($"Email not confirmed, therefore confirming email with token: {emailConfToken}");
                        await userManager.ConfirmEmailAsync(defaultAdminUser, emailConfToken);
                    }
                    
                    var roleAdded = await userManager.AddToRoleAsync(defaultAdminUser, Role.ADMIN.Name);

                    if (roleAdded.Succeeded)
                    {
                        logger.LogInformation("Default Admin User added to ADMIN Role");
                    }
                }
            } else
            {
                logger.LogError("Default Admin User already exists");
            }
        }

        public async Task AddDefaultClaimsToDefaultAdmin()
        {
            var defaultAdminUser = await userManager.FindByNameAsync("admin");
            var roles = await userManager.GetRolesAsync(defaultAdminUser);

            foreach (var role in roles)
            {
                var result = await userManager.AddClaimAsync(defaultAdminUser, new Claim(ClaimTypes.Role, role));
                if (result.Succeeded) logger.LogInformation($"Added Role Claim for Role = {role}");
            }

            var otherClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, defaultAdminUser.Email),
                new Claim(ClaimTypes.Name, defaultAdminUser.UserName)
            };

            var otherClaimsResult = await userManager.AddClaimsAsync(defaultAdminUser, otherClaims);
            if (otherClaimsResult.Succeeded) logger.LogInformation("Other claims added.");
        }
        #endregion
    }
}
