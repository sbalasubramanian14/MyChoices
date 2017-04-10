using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "dmnCaseStatus", Schema = "Core")]
    public class CaseStatus
    {
        [Key]
        public byte CaseStatusId { get; set; }
        public string Title { get; set; }
        public byte Level { get; set; }
        public bool IsActive { get; set; }
    }
}
