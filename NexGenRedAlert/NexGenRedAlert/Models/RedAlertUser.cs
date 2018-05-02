using System;

namespace NexGenRedAlert.Models
{
    public class RedAlertUser
    {
        public string UserName { get; set; }
        public int UserId { get; set; }

        public string UserCode { get; set; }
        public string Organization { get; set; }
        public int RoleId { get; set; }
        public string PrimaryContact { get; set; }
        public string PrimaryContactNumber { get; set; }

        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
