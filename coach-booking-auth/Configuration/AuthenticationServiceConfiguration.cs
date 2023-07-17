using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using coach_booking_auth.Configuration.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Logging;

namespace coach_booking_auth.Configuration
{
    public static class AuthenticationServiceConfiguration
    {
        public static AuthenticationBuilder AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var serviceProvider = services.BuildServiceProvider();

            var loggerFactory = serviceProvider.GetRequiredService<ILoggerFactory>();

            var logger = loggerFactory.CreateLogger("auth-build");

            var jwtSection = configuration.GetSection("JwtBearerTokenSettings");
            
            services.Configure<JwtBearerTokenSettings>(jwtSection);

            var jwtBearerTokenSettings = jwtSection.Get<JwtBearerTokenSettings>();

            var authenticationBuidler = services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = jwtBearerTokenSettings.RequireHttpsMetadata;
                options.SaveToken = jwtBearerTokenSettings.SaveToken;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidIssuer = jwtBearerTokenSettings.Issuer,
                    ValidAudience = jwtBearerTokenSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtBearerTokenSettings.SecretKey!)),
                    ClockSkew = TimeSpan.Zero
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        if (context.Request.Cookies.ContainsKey("X-Access-Token"))
                            context.Token = context.Request.Cookies["X-Access-Token"];

                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        logger.LogDebug("AUTH VALIDATED");
                        return Task.CompletedTask;
                    }
                };
            });

            return authenticationBuidler;
        }
    }
}
