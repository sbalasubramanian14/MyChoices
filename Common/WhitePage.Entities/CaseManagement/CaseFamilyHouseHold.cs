using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "trCaseFamilyHouseHold", Schema = "Ops")]
    public class CaseFamilyHouseHold
    {
        [Key]
        public int CaseFamilyHouseHoldId { get; set; }
        public int CaseId { get; set; }

        public string ChildrenDeceasedLookupId { get; set; }
        [NotMapped]
        public int[] ChildrenDeceasedLookupArray { get; set; }

        public int? HouseHoldIncomeLookupId { get; set; }
        public int? SoughtHelpYesNoLookupId { get; set; }
        public string SoughtHelpDesc { get; set; }
        public string SoughtHelpOutPut { get; set; }

        public string PeacemakerAssistanceLookupId { get; set; }
        [NotMapped]
        public int[] PeacemakerAssistanceLookupArray { get; set; }

        public string PeacemakerAssistanceDesc { get; set; }

        public int? PeacemakerFollowupYesNoLookupId { get; set; }
        public int? ClientSignedRegistrationFormYesNoLookupId { get; set; }
        public string ClientEmailId { get; set; }
        public int? ReligionLookupId { get; set; }
        public int? LevelOfEducationLookupId { get; set; }
        public int? VocationalSkillsLookupId { get; set; }
        public string VocationalSkillsDesc { get; set; }

        public int? OccupationLookupId { get; set; }
        public string OccupationDesc { get; set; }
        public int? ClientIncomeLookupId { get; set; }

        public string HouseHoldMembersLivingLookupId { get; set; }
        [NotMapped]
        public int[] HouseHoldMembersLivingLookupArray { get; set; }

        public short? YearOfMarriage { get; set; }
        public byte? ClientAgeAtFirstChild { get; set; }

    }
}
