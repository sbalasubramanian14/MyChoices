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

        public string MentalDressLookupId { get; set; }
        public string MentalHygieneLookupId { get; set; }
        public string MentalBodyTypeLookupId { get; set; }
        public string MentalExpressionLookupId { get; set; }
        public string MentalMotorActivityLookupId { get; set; }
        public string MentalVocabularyLookupId { get; set; }
        public string MentalImpulseControlLookupId { get; set; }
        public string MentalSpeechLookupId { get; set; }
        public string MentalBehaviourLookupId { get; set; }
        public string MentalContentLookupId { get; set; }
        public string MentalFlowOfThoughtLookupId { get; set; }
        public string MentalOrientationLookupId { get; set; }
        public string MentalEstimatedIntellectLookupId { get; set; }
        public string MentalAttentionLookupId { get; set; }
        public string MentalInsightLookupId { get; set; }
        public string MentalJudgementLookupId { get; set; }
        public string MentalMemoryLookupId { get; set; }
        public string MentalInformationLookupId { get; set; }
        public string MentalAbstractionLookupId { get; set; }

        [NotMapped]
        public int[] MentalDressLookupArray { get; set; }
        [NotMapped]
        public int[] MentalHygieneLookupArray { get; set; }
        [NotMapped]
        public int[] MentalBodyTypeLookupArray { get; set; }
        [NotMapped]
        public int[] MentalExpressionLookupArray { get; set; }
        [NotMapped]
        public int[] MentalMotorActivityLookupArray { get; set; }
        [NotMapped]
        public int[] MentalVocabularyLookupArray { get; set; }
        [NotMapped]
        public int[] MentalImpulseControlLookupArray { get; set; }
        [NotMapped]
        public int[] MentalSpeechLookupArray { get; set; }
        [NotMapped]
        public int[] MentalBehaviourLookupArray { get; set; }
        [NotMapped]
        public int[] MentalContentLookupArray { get; set; }
        [NotMapped]
        public int[] MentalFlowOfThoughtLookupArray { get; set; }
        [NotMapped]
        public int[] MentalOrientationLookupArray { get; set; }
        [NotMapped]
        public int[] MentalEstimatedIntellectLookupArray { get; set; }
        [NotMapped]
        public int[] MentalAttentionLookupArray { get; set; }
        [NotMapped]
        public int[] MentalInsightLookupArray { get; set; }
        [NotMapped]
        public int[] MentalJudgementLookupArray { get; set; }
        [NotMapped]
        public int[] MentalMemoryLookupArray { get; set; }
        [NotMapped]
        public int[] MentalInformationLookupArray { get; set; }
        [NotMapped]
        public int[] MentalAbstractionLookupArray { get; set; }
    }
}
