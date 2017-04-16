CREATE TABLE [Ops].[trCaseMental]
(
	[CaseMentalId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	CaseId INT,

	MentalDressLookupId INT,
	MentalHygieneLookupId INT,
	MentalBodyTypeLookupId INT,
	MentalExpressionLookupId INT,
	MentalMotorActivityLookupId INT,
	MentalVocabularyLookupId INT,
	MentalImpulseControlLookupId INT,
	MentalSpeechLookupId INT,
	MentalBehaviourLookupId INT,
	MentalContentLookupId INT,
	MentalFlowOfThoughtLookupId INT,
	MentalOrientationLookupId INT,
	MentalEstimatedIntellectLookupId INT,
	MentalAttentionLookupId INT,
	MentalInsightLookupId INT,
	MentalJudgementLookupId INT,
	MentalMemoryLookupId INT,
	MentalInformationLookupId INT,
	MentalAbstractionLookupId INT
)
