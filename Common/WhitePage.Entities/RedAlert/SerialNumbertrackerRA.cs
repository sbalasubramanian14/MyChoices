using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trSerialNumbertrackerRA", Schema = "RedAlert")]
    public class SerialNumbertrackerRA
    {
       [Key]
       public int SerialNumberTrackerRAId { get; set; }
       public string FormType { get; set; }
       public string IpCode { get; set; }
       public int SerialValue { get; set; }
       public DateTime GeneratedDate { get; set; }
    }
}
