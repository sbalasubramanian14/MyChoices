using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "vCaseMental", Schema = "Ops")]
    public class vCaseMental
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

        public string MentalDress { get; set; }
        public string MentalHygiene { get; set; }
        public string MentalBodyType { get; set; }
        public string MentalExpression { get; set; }
        public string MentalMotorActivity { get; set; }
        public string MentalVocabulary { get; set; }
        public string MentalImpulseControl { get; set; }
        public string MentalSpeech { get; set; }
        public string MentalBehaviour { get; set; }
        public string MentalContent { get; set; }
        public string MentalFlowOfThought { get; set; }
        public string MentalOrientation { get; set; }
        public string MentalEstimatedIntellect { get; set; }
        public string MentalAttention { get; set; }
        public string MentalInsight { get; set; }
        public string MentalJudgement { get; set; }
        public string MentalMemory { get; set; }
        public string MentalInformation { get; set; }
        public string MentalAbstraction { get; set; }
    }
}
