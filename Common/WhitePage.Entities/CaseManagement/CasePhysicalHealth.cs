using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "trCasePhysicalHealth", Schema = "Ops")]
    public class CasePhysicalHealth
    {
        [Key]
        public int CasePhysicalHealthId { get; set; }
        public int CaseId { get; set; }
        public int? SufferingFromAnyMajorIllnessLookupId { get; set; }
        public string SufferingFromAnyMajorIllnessDesc { get; set; }

        public int? DiagnosedPsychiatricIllnessLookupId { get; set; }
        public string DiagnosedPsychiatricIllnessDesc { get; set; }

        public int? SleepPerNightLookupId { get; set; }
        public int? AppetiteLookupId { get; set; }
        public int? ExerciseLookupId { get; set; }

        public int? AnyMedicationLookupId { get; set; }
        public string AnyMedicationDesc { get; set; }

        public int? AnySubstanceLookupId { get; set; }
        public string AnySubstanceDesc { get; set; }

        public int? CurrentlyPregnantLookup { get; set; }
        public string CurrentlyPregnantDesc { get; set; }

        public int? ReasonForSeekingHelpLookupId { get; set; }
        public int? WhoIsAbusingYouLookupId { get; set; }
        public string WhoIsAbusingYouDesc { get; set; }
    }
}
