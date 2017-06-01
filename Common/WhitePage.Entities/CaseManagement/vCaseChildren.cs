using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "vCaseChildren", Schema = "Ops")]
    public class vCaseChildren
    {
        [Key]
        public int CaseChildrenId { get; set; }
        public int CaseId { get; set; }
        public string Name { get; set; }
        public decimal Age { get; set; }
        public int? GenderLookupId { get; set; }
        public int? RelationshipWithAbuserLookupId { get; set; }

        public int CreatedBy { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime ModifiedDatetime { get; set; }

        public string Gender { get; set; }
        public string Relation { get; set; }
    }
}
