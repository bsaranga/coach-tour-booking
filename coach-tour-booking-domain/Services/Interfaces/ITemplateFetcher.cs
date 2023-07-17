using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace coach_tour_booking_domain.Services.Interfaces
{
    public interface ITemplateFetcher
    {
        Task<string> FetchEmailTemplate(string templateName);
        Task<string> FetchResponseTemplate(string templateName);
    }
}
