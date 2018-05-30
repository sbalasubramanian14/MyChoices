using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trRakshakMonthlyReport", Schema = "RedAlert")]
    public class RakshakMonthlyReport
    {
        [Key]
        public int RakshakMonthlyReportId { get; set; }
        public string RakshakMonthlyReportNumber { get; set; }
        public string MonthAndYear { get; set; }
        public int ActiveRakshakCount { get; set; }
        public int DroppedRakshakCount { get; set; }
        public int RegisteredRakshakCount { get; set; }
        public string WasRakshakActive { get; set; }
        public string WasRakshakReportable { get; set; }
        public int CommunityMeetingCount { get; set; }
        public string WasCommunityMeetingHelpful { get; set; }
        public int CommunityMeetingParticipationCount { get; set; }
        public int WorkHoursSpent { get; set; }
        public string WasSchoolDropoutsReported { get; set; }
        public string WasProblemsReported { get; set; }
        public string RakshakEffectivenessDesc { get; set; }
        public string ChallengesInManagingRakshakDesc { get; set; }
        public string RakshakStoryDesc { get; set; }
        public string TopPerformingRakshakDesc { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
    }
}