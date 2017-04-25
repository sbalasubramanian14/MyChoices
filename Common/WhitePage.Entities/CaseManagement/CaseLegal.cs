using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "trCaseLegal", Schema = "Ops")]
    public class CaseLegal
    {
        [Key]
        public int CaseLegalId { get; set; }
        public int CaseId { get; set; }

        public string CaseNumber { get; set; }
        public string Court { get; set; }
        public string Prayer { get; set; }
        public string LegalRepresentative { get; set; }

        public int? LegalConsentFormLookupId { get; set; }
        public int? LegalActionLookupId { get; set; }
        public string OutcomeLookupId { get; set; }
        [NotMapped]
        public int[] OutcomeLookupArray { get; set; }
        public string DocumentsLookupId { get; set; }
        [NotMapped]
        public int[] DocumentsLookupArray { get; set; }
    }
}
