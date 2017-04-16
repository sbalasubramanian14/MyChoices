using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "trCaseSessionLog", Schema = "Ops")]
    public class CaseSessionLog
    {
        [Key]
        public int CaseSessionLogId { get; set; }
        public int CaseId { get; set; }

        public DateTime CounselingDate { get; set; }
        public int TypeOfCounselingLookupId { get; set; }
        public string TypeOfCounselingDesc { get; set; }
        public short DurationOfSessionMIn { get; set; }
        public DateTime? NextSessionScheduled { get; set; }
        public string SessionNotes { get; set; }

    }
}
