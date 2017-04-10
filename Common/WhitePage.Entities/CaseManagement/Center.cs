using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "dmnCenter", Schema = "Core")]
    public class Center
    {
        [Key]
        public short CenterId { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }
        public bool IsActive { get; set; }
    }
}
