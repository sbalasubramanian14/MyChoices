using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "trSerialNumberTracker", Schema = "Core")]
    public class SerialNumberTracker
    {
        [Key]
        public int SerialNumberTrackerId { get; set; }
        public int SerialValue { get; set; }        
        public DateTime GeneratedDate { get; set; }
    }
}
