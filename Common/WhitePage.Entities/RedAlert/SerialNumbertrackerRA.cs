using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trSerialNumbertrackerRA", Schema = "Core")]
    public class SerialNumbertrackerRA
    {
       [Key]
       public int SerialNumberTrackerId { get; set; }
       public string FormType { get; set; }
       public string IpCode { get; set; }
       public int SerialValue { get; set; }
       public DateTime GeneratedDate { get; set; }


    }
}
