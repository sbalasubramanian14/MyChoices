using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trImplementingPartner", Schema = "Auth")]
    public class ImplementingPartner
    {
        [Key]
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
