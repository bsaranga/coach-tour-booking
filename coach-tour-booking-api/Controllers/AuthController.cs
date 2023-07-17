using coach_booking_auth.Helpers;
using coach_booking_auth.Models;
using coach_booking_auth.Models.Enumerations;
using coach_tour_booking_domain.DTOs;
using coach_tour_booking_domain.Mappers;
using coach_tour_booking_domain.Services;
using coach_tour_booking_domain.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Security.Claims;

namespace coach_tour_booking_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> logger;
        private readonly CustomerService customerService;
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IAuthHelper authHelper;
        private readonly ITemplateFetcher templateFetcher;

        public AuthController(ILogger<AuthController> logger,
            CustomerService customerService,
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IAuthHelper authHelper,
            ITemplateFetcher templateFetcher)
        {
            this.logger = logger;
            this.customerService = customerService;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
            this.authHelper = authHelper;
            this.templateFetcher = templateFetcher;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDetails userDetails)
        {
            if (userDetails == null || !ModelState.IsValid)
                return BadRequest("Empty user details");

            var identityUser = new IdentityUser()
            {
                UserName = userDetails.Username,
                Email = userDetails.Email
            };

            var result = await userManager.CreateAsync(identityUser, userDetails.Password);

            if (!result.Succeeded)
            {
                var dictionary = new ModelStateDictionary();

                foreach (var error in result.Errors)
                {
                    dictionary.AddModelError(error.Code, error.Description);
                }

                return BadRequest(new { Message = "User Registration Failed.", Errors = dictionary });
            }

            return Ok(new { Message = "User Registration Successfull" });
        }

        [HttpPost("register/customer")]
        public async Task<IActionResult> RegisterCustomer([FromBody] CustomerRegistrationDto customerRegistrationDto)
        {
            try
            {
                if (customerRegistrationDto == null || !ModelState.IsValid)
                    return BadRequest();

                var identityUser = new IdentityUser()
                {
                    UserName = customerRegistrationDto.CustomerLoginCredentials.Username,
                    Email = customerRegistrationDto.CustomerDetails.EmailAddress
                };

                var result = await userManager.CreateAsync(identityUser, customerRegistrationDto.CustomerLoginCredentials.Password);

                await authHelper.SendEmailConfirmationMessage(identityUser);

                await userManager.AddToRoleAsync(identityUser, Role.CUSTOMER.Name);

                var additionalClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, customerRegistrationDto.CustomerDetails.EmailAddress),
                    new Claim(ClaimTypes.Name, customerRegistrationDto.CustomerLoginCredentials.Username),
                    new Claim(ClaimTypes.Role, Role.CUSTOMER.Name)
                };

                await userManager.AddClaimsAsync(identityUser, additionalClaims);

                if (!result.Succeeded)
                {
                    var dictionary = new ModelStateDictionary();

                    foreach (var error in result.Errors)
                    {
                        dictionary.AddModelError(error.Code, error.Description);
                    }

                    return BadRequest(new { Message = "User Registration Failed.", Errors = dictionary });
                }
                else
                {
                    var customerDto = customerRegistrationDto.MapToCustomerDto()
                                                             .SetAuthId(identityUser.Id);

                    await customerService.AddCustomer(customerDto);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("verifyEmail")]
        public async Task<ContentResult> VerifyEmail([FromQuery] string userId, [FromQuery] string emailToken)
        {
            var identityUser = await userManager.FindByIdAsync(userId);
            var result = await authHelper.VerifyEmail(emailToken, identityUser);
            string template = "";

            if (result)
                template = await templateFetcher.FetchResponseTemplate("AccountVerified.html");
            else template = await templateFetcher.FetchResponseTemplate("VerificationError.html");

            return new ContentResult
            {
                Content = template,
                ContentType = "text/html",
                StatusCode = 200,
            };
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCredentials? credentials)
        {
            IdentityUser? identityUser;

            if (ModelState.IsValid && credentials != null)
            {
                identityUser = await authHelper.ValidateUser(credentials);

                if (identityUser == null) return Unauthorized();

                Response.Cookies.Append("X-Access-Token",
                                        await authHelper.GenerateToken(identityUser!),
                                        new CookieOptions { HttpOnly = true, Secure = true, Domain = "localhost", SameSite = SameSiteMode.None });

                return Ok(new
                {
                    Authenticated = true
                });
            }

            return BadRequest("Login failed");
        }

        [HttpGet("status")]
        public IActionResult IsAuthenticated()
        {
            var user = Request.HttpContext.User;
            if (user.Claims.Any() && user.Identity?.Name != null)
            {
                return Ok(new
                {
                    Authenticated = true
                });
            } else
            {
                return Ok(new
                {
                    Authenticated = false
                });
            }
        }

        [HttpGet("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("X-Access-Token", new CookieOptions { HttpOnly = true, Secure = true, Domain = "localhost", SameSite = SameSiteMode.None });
            return Ok();
        }
    }
}
