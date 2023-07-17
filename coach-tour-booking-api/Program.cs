using coach_booking_auth;
using coach_booking_auth.Configuration;
using coach_booking_auth.Helpers;
using coach_tour_booking_data_access.Models;
using coach_tour_booking_domain.Services;
using coach_tour_booking_domain.Services.Implementations;
using coach_tour_booking_domain.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace coach_tour_booking_api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var authDbConnectionString = builder.Configuration.GetConnectionString("eurobus-auth-db");
            var coreDbConnectionString = builder.Configuration.GetConnectionString("eurobus-core-db");

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<AuthContext>(options =>
            {
                options.UseSqlServer(authDbConnectionString, opt => opt.MigrationsAssembly("coach-booking-auth"));

            });

            builder.Services.AddDbContext<EuroBusContext>(options =>
            {
                options.UseSqlServer(coreDbConnectionString);
            });

            builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
            {
                options.SignIn.RequireConfirmedAccount = true;
                options.Password = new PasswordOptions
                {
                    RequireDigit = false,
                    RequiredLength = 5,
                    RequiredUniqueChars = 0,
                    RequireLowercase = false,
                    RequireNonAlphanumeric = false,
                    RequireUppercase = false,
                };
            }).AddEntityFrameworkStores<AuthContext>()
              .AddDefaultTokenProviders();

            builder.Services.AddJwtAuthentication(builder.Configuration);

            // Authentication Services
            builder.Services.AddScoped<CustomerService>();
            builder.Services.AddScoped<IAuthHelper, DefaultAuthHelper>();
            builder.Services.AddScoped<IEmailService, EmailService>();
            builder.Services.AddScoped<ITemplateFetcher, TemplateFetcher>();

            var app = builder.Build();

            if (args.Contains("seed"))
            {
                Console.WriteLine("Seeding...");

                using var scope = app.Services.CreateScope();
                var authHelper = scope.ServiceProvider.GetRequiredService<IAuthHelper>();

                try
                {
                    authHelper?.CreateDefaultRoles().Wait();
                    authHelper?.CreateDefaultAdminUser().Wait();
                    authHelper?.AddDefaultClaimsToDefaultAdmin().Wait();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Exception occurred");
                    Console.WriteLine(ex.Message);
                    Console.WriteLine(ex?.InnerException?.Message);
                }
            } else
            {
                // Configure the HTTP request pipeline.
                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }

                app.UseCors(x =>
                {
                    x.WithOrigins("http://localhost:3000")
                     .AllowCredentials()
                     .AllowAnyMethod()
                     .AllowAnyHeader();
                });

                app.UseHttpsRedirection();

                app.UseAuthentication();

                app.UseAuthorization();

                app.MapControllers();

                app.Run();
            }
        }
    }
}