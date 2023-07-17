namespace coach_booking_auth.Configuration.Models
{
    public class JwtBearerTokenSettings
    {
        public string? SecretKey { get; set; }
        public string? Audience { get; set; }
        public string? Issuer { get; set; }
        public bool RequireHttpsMetadata { get; set; }
        public bool SaveToken { get; set; }
        public int ExpiryTimeInSeconds { get; set; }
    }
}
