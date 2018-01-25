using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "IpDetails", Schema = "Core")]
    public class IpDetails
    {
        [Key]
        public string IpCode { get; set; }
        public string NgoName { get; set; }
        public string PrimaryContact { get; set; }
        public string PrimaryEmail { get; set; }

    }
}
