using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "dmnLookupDetail", Schema = "Core")]
    public class LookupDetail
    {
        [Key]
        public int LookupDetailId { get; set; }
        public int LookupId { get; set; }
        public string Value { get; set; }
        public short SortId { get; set; }
        public bool IsAcitve { get; set; }
    }
}
