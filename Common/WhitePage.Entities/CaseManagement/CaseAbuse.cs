using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "trCaseAbuse", Schema = "Ops")]
    public class CaseAbuse
    {
        public int CaseAbuseId { get; set; }
        public int CaseId { get; set; }

        public int? SufferingFromAbuseLookupId { get; set; }
        public string SufferingFromAbuseDesc { get; set; }

        public string FeelAboutAbuseLookupId { get; set; }
        [NotMapped]
        public int[] FeelAboutAbuseLookupArray { get; set; }
        public string ParentsFeelAboutAbuseLookupId { get; set; }
        [NotMapped]
        public int[] ParentsFeelAboutAbuseLookupArray { get; set; }
        public string LawFeelAboutAbuseLookupId { get; set; }
        [NotMapped]
        public int[] LawFeelAboutAbuseLookupArray { get; set; }

        public int? SignsOfPhysicalAbuseLookupId { get; set; }
        public string SignsOfPhysicalAbuseDesc { get; set; }

        public string WeaponsUsedLookupId { get; set; }
        [NotMapped]
        public int[] WeaponsUsedLookupArray { get; set; }

        public string WeaponsUsedDesc { get; set; }

        public string TypesOfPhyscialAbuseLookupId { get; set; }
        [NotMapped]
        public int[] TypesOfPhyscialAbuseLookupArray { get; set; }
        public int? FrequencyOfPhyscialAbuseLookupId { get; set; }
        public byte? NumberOfYearsOfPhyscialAbuse { get; set; }

        public string TypesOfEmotionalAbuseLookupId { get; set; }
        [NotMapped]
        public int[] TypesOfEmotionalAbuseLookupArray { get; set; }
        public int? FrequencyOfEmotionalAbuseLookupId { get; set; }
        public byte? NumberOfYearsOfEmotionalAbuse { get; set; }

        public string TypesOfSexualAbuseLookupId { get; set; }
        [NotMapped]
        public int[] TypesOfSexualAbuseLookupArray { get; set; }
        public int? FrequencyOfSexualAbuseLookupId { get; set; }
        public byte? NumberOfYearsOfSexualAbuse { get; set; }

        public string TypesOfEconomicAbuseLookupId { get; set; }
        [NotMapped]
        public int[] TypesOfEconomicAbuseLookupArray { get; set; }
        public int? FrequencyOfEconomicAbuseLookupId { get; set; }
        public byte? NumberOfYearsOfEconomicAbuse { get; set; }

        public string ReasonsForAbuseLookupId { get; set; }
        [NotMapped]
        public int[] ReasonsForAbuseLookupArray { get; set; }
    }
}
