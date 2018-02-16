using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trImplementingPartner", Schema = "RedAlert")]
    public class ImplementingPartner
    {
        [Key]
        public int ImplementingPartnerId { get; set; }
        public string UserName { get; set; }
        public string IpCode { get; set; }
        public string NgoName { get; set; }
        public string PrimaryContact { get; set; }
        public string PrimaryContactNumber { get; set; }       
        public int CreatedBy { get; set; }	
        public DateTime CreatedDate { get; set; }

    }
}
