using coach_tour_booking_domain.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace coach_tour_booking_domain.Services.Implementations
{
    public class TemplateFetcher : ITemplateFetcher
    {
        private readonly string htmlTemplateDir;
        private readonly string emailTemplateDir;
        private readonly ILogger<TemplateFetcher> logger;

        public TemplateFetcher(IConfiguration configuration, ILogger<TemplateFetcher> logger)
        {
            this.logger = logger;
            htmlTemplateDir = configuration["HtmlTemplates"];
            emailTemplateDir = configuration["EmailSettings:EmailTemplates"];
            this.logger = logger;
        }

        public async Task<string> FetchEmailTemplate(string templateName)
        {
            try
            {
                var emailTemplate = await File.ReadAllTextAsync($"{emailTemplateDir}\\{templateName}");
                return emailTemplate;
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<string> FetchResponseTemplate(string templateName)
        {
            try
            {
                var htmlTemplate = await File.ReadAllTextAsync($"{htmlTemplateDir}\\{templateName}");
                return htmlTemplate;
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                throw;
            }
        }
    }
}
