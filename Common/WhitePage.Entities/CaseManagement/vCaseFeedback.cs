using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "vCaseFeedback", Schema = "Ops")]
    public class vCaseFeedback
    {
        [Key]
        public int CaseFeedbackId { get; set; }
        public int CaseId { get; set; }

        public int? RespectedDuringYourVisitLookupId { get; set; }
        public int? FeelSafeAndSecureLookupId { get; set; }
        public int? FeelThatCounsellingLookupId { get; set; }
        public int? AssistanceOfPeacemakerLookupId { get; set; }

        public int? RecommendFreeCounsellingLookupId { get; set; }
        public int? AbleToImproveLookupId { get; set; }
        public int? OPMTeamToFollowupLookupId { get; set; }
        public string AnySuggestions { get; set; }

        public string RespectedDuringYourVisit { get; set; }
        public string FeelSafeAndSecure { get; set; }
        public string FeelThatCounselling { get; set; }
        public string AssistanceOfPeacemaker { get; set; }
        public string RecommendFreeCounselling { get; set; }
        public string AbleToImprove { get; set; }
        public string OPMTeamToFollowup { get; set; }
        
    }
}
