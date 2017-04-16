using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "trCaseMental", Schema = "Ops")]
    public class CaseMental
    {
        [Key]
        public int CaseMentalId { get; set; }
        public int CaseId { get; set; }

        public int? MentalDressLookupId { get; set; }
        public int? MentalHygieneLookupId { get; set; }
        public int? MentalBodyTypeLookupId { get; set; }
        public int? MentalExpressionLookupId { get; set; }
        public int? MentalMotorActivityLookupId { get; set; }
        public int? MentalVocabularyLookupId { get; set; }
        public int? MentalImpulseControlLookupId { get; set; }
        public int? MentalSpeechLookupId { get; set; }
        public int? MentalBehaviourLookupId { get; set; }
        public int? MentalContentLookupId { get; set; }
        public int? MentalFlowOfThoughtLookupId { get; set; }
        public int? MentalOrientationLookupId { get; set; }
        public int? MentalEstimatedIntellectLookupId { get; set; }
        public int? MentalAttentionLookupId { get; set; }
        public int? MentalInsightLookupId { get; set; }
        public int? MentalJudgementLookupId { get; set; }
        public int? MentalMemoryLookupId { get; set; }
        public int? MentalInformationLookupId { get; set; }
        public int? MentalAbstractionLookupId { get; set; }
    }
}
