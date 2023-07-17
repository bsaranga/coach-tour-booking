using coach_tour_booking_domain.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;

namespace coach_tour_booking_domain.Services.Implementations
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration configuration;

        public EmailService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public SmtpClient CreateSmtpClient()
        {
            string host = configuration["EmailSettings:Host"];
            int port = Int32.Parse(configuration["EmailSettings:Port"]);
            string sender = configuration["EmailSettings:Email"];
            string password = configuration["EmailSettings:Password"];
            bool enableSSL = bool.Parse(configuration["EmailSettings:StartTls"]);

            var smtpClient = new SmtpClient(host, port);
            smtpClient.EnableSsl = enableSSL;
            smtpClient.Credentials = new NetworkCredential(sender, password);
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

            return smtpClient;
        }
    }
}
