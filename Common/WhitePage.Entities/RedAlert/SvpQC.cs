using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trSvpQC", Schema = "RedAlert")]
    public class SvpQC
    {
        [Key]
        public int SvpQCId { get; set; }
        public string SvpQCNumber { get; set; }
        public int VillageCode { get; set; }
        public string AreStakeholdersAware { get; set; }
        public string WasStickersPutUp { get; set; }
        public string WasProtocolFollowed { get; set; }
        public string WereEquipmentsWorkingProperly { get; set; }
        public string WereAllProgramStartedInTime { get; set; }
        public string WasGuardianGirlConducted { get; set; }
        public string DidGirlsTakeOath { get; set; }
        public short GirlsParticipationCount { get; set; }
        public string WasCoolBoysConducted { get; set; }
        public string DidBoysTakeOath { get; set; }
        public short BoysParticipationCount { get; set; }
        public string WasSkitConducted { get; set; }
        public string WereFilmsUsedInSchoolProgram { get; set; }
        public string WasMyRightsMentioned { get; set; }
        public string WasMotherProgramConducted { get; set; }
        public short MothersParticipationCount { get; set; }
        public string WereFilmsUsedInMothersProgram { get; set; }
        public string WasFathersProgramConducted { get; set; }
        public short FathersParticipationCount { get; set; }
        public string WereFilmsUsedInFathersProgram { get; set; }
        public short TotalParticipationCount { get; set; }
        public string DidTeamMeetSarpanch { get; set; }
        public string DidTeamMeetPolice{ get; set; }
        public string DidTeamMeetSchoolStaff{ get; set; }
        public string DidTeamMeetAnganwadiHead{ get; set; }
        public string DidTeamVisitedSchoolOnSecondDay { get; set; }
        public string SchoolChildrenFeedback { get; set; }
        public string StakeholdersFeedback { get; set; }
        public string WasRakshakIdentified { get; set; }
        public string WasRakshakRegistrationDone { get; set; }
        public string PreviousAwarenessDesc { get; set; }
        public string CVCStatus { get; set; }
        public string WasCertificateGivenToSchool { get; set; }
        public string FieldWorkerNames { get; set; }
        public string Summary { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
    }
}
