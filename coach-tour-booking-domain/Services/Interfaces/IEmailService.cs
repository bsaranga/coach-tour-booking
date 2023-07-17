using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace coach_tour_booking_domain.Services.Interfaces
{
    public interface IEmailService
    {
        SmtpClient CreateSmtpClient();
    }
}
