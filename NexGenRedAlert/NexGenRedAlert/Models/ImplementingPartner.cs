using System;
using System.Collections.Generic;
using System.Text;

namespace NexGenRedAlert.Models
{
    public class ImplementingPartner
    {
        public string UserName { get; set; }
        public int UserId { get; set; }

        public string IpCode { get; set; }
        public string NgoName { get; set; }
        public string PrimaryContact { get; set; }
        public string PrimaryContactNumber { get; set; }

        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
