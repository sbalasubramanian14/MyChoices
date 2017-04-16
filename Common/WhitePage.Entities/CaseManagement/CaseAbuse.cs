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

        public int? FeelAboutAbuseLookupId { get; set; }
        public int? ParentsFeelAboutAbuseLookupId { get; set; }
        public int? LawFeelAboutAbuseLookupId { get; set; }
        public int? SignsOfPhysicalAbuseLookupId { get; set; }
        public string SignsOfPhysicalAbuseDesc { get; set; }

        public int? WeaponsUsedLookupId { get; set; }
        public string WeaponsUsedDesc { get; set; }

        public int? TypesOfPhyscialAbuseLookupId { get; set; }
        public int? FrequencyOfPhyscialAbuseLookupId { get; set; }
        public byte? NumberOfYearsOfPhyscialAbuse { get; set; }

        public int? TypesOfEmotionalAbuseLookupId { get; set; }
        public int? FrequencyOfEmotionalAbuseLookupId { get; set; }
        public byte? NumberOfYearsOfEmotionalAbuse { get; set; }

        public int? TypesOfSexualAbuseLookupId { get; set; }
        public int? FrequencyOfSexualAbuseLookupId { get; set; }
        public byte? NumberOfYearsOfSexualAbuse { get; set; }

        public int? TypesOfEconomicAbuseLookupId { get; set; }
        public int? FrequencyOfEconomicAbuseLookupId { get; set; }
        public byte? NumberOfYearsOfEconomicAbuse { get; set; }

        public int? ReasonsForAbuseLookupId { get; set; }
    }
}
