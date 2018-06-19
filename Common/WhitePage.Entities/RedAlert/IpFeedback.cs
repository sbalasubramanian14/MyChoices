using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trIpFeedback", Schema = "RedAlert")]
    public class IpFeedback
    {
        [Key]
        public int IpFeedbackId { get; set; }
        public string IpFeedbackNumber { get; set; }
        public string WasDifferenceMadeBySVP { get; set; }
        public string DidStateCoordinatorGaveSatisfiedGuidance { get; set; }
        public string DidStateCoordinatorVisit { get; set; }
        public string WasStateCoordinatorHelpfulInFollowup { get; set; }
        public int StateCoordinatorRating { get; set; }
        public string AreasOfImprovementForStateCoordinatorDesc { get; set; }
        public string AreasOfImprovementForProgramDesc { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
    }
}
