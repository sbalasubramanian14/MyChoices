using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "trCaseManage", Schema = "Ops")]
    public class CaseManage
    {
        [Key]
        public int CaseManageId { get; set; }
        public int CaseId { get; set; }

        public byte CaseStatusId { get; set; }

        public int? SourceOfCaseLookupId { get; set; }
        public string SourceOfCaseDesc { get; set; }

        public int? TypesOfCounselingLookupId { get; set; }
        public int? TotalNoOfSessionsLookupId { get; set; }
        public int? TotalHoursSpentLookupId { get; set; }

        public string ReasonForClosureStatus { get; set; }
        public string CaseSubject { get; set; }
        public string CaseDescription { get; set; }
        public int? RelationshipWithPMLookupId { get; set; }

        public string ResolutionLog { get; set; }
    }
}
