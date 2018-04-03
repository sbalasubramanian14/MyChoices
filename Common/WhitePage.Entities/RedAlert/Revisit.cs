using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trRevisit", Schema = "RedAlert")]
    public class Revisit
    {
        [Key]
        public int RevisitId { get; set; }
        public string RevisitNumber { get; set; }
        public int VillageCode { get; set; }

        public DateTime DateofRevisit { get; set; }
        public short TrafficCountBeforeSVP { get; set; }
        public short TrafficCountAfterSVP { get; set; }
        public short ChildMarriageCountBeforeSVP { get; set; }
        public short ChildMarriageCountAfterSVP { get; set; }
        public string IsVillageSafeForGirlsDesc { get; set; }
        public string IsStrategicNetworkingHelpfulDesc { get; set; }
        public string IsVillageLeadershipHelpfulDesc { get; set; }
        public string IsCVCActiveDesc { get; set; }

        public string DoFathersRememberSVP { get; set; }
        public string FathersFeedback { get; set; }
        public string DoMothersRememberSVP { get; set; }
        public string MothersFeedback { get; set; }
        public string DoGirlsRememberSVP { get; set; }
        public string GirlsFeedback { get; set; }
        public string DoBoysRememberSVP { get; set; }
        public string BoysFeedback { get; set; }
        public string DoVillageEldersRememberSVP { get; set; }
        public string VillageEldersFeedback { get; set; }
        public string DoPoliceRememberSVP { get; set; }
        public string PoliceFeedback { get; set; }
        public string VillageElderContactNumber { get; set; }
        public string PoliceContactNumber { get; set; }
        public string DoSchoolStaffRememberSVP { get; set; }
        public string SchoolStaffFeedback { get; set; }
        public string SchoolPrincipalContactNumber { get; set; }
        public string WasSkitConducted { get; set; }
        public string SVPSuccessStory { get; set; }
        public string ProgrammeFeedbackSummary { get; set; }

        public string SVPImplementationChallenges { get; set; }
        public string ORAHelplineCallDesc { get; set; }
        public string IsAnotherSVPRequired { get; set; }
        public string NextStepsRecommendations { get; set; }

        public int ComicBooksCount { get; set; }
        public short StudentsParticipationCount { get; set; }
        public string RakshakDesc { get; set; }
        public string HelplineNumber { get; set; }
        public string RevisitSummary { get; set; }

        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
    }
}
