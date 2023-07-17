using System;
using System.Collections.Generic;

namespace coach_tour_booking_data_access.Models
{
    public partial class Customer
    {
        public int UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Surname { get; set; }
        public string? EmailAddress { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? EupassportNumber { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? Country { get; set; }
        public string? Phone { get; set; }
        public string? ExternalAuthId { get; set; }
    }
}
