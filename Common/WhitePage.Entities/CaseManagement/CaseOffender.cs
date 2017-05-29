using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "trCaseOffender", Schema = "Ops")]
    public class CaseOffender
    {
        [Key]
        public int CaseOffenderId { get; set; }
        public int CaseId { get; set; }
        public string Name { get; set; }
        public short? Age { get; set; }
        public int? GenderLookupId { get; set; }
        public int? RelationshipWithVictimLookupId { get; set; }
        public string OtherRelationship { get; set; }
    }
}
