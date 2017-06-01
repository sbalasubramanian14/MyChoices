CREATE TABLE [Ops].[trCaseMental]
(
	[CaseMentalId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	CaseId INT,

	MentalDressLookupId VARCHAR(200),
	MentalHygieneLookupId VARCHAR(200),
	MentalBodyTypeLookupId VARCHAR(200),
	MentalExpressionLookupId VARCHAR(200),
	MentalMotorActivityLookupId VARCHAR(200),
	MentalVocabularyLookupId VARCHAR(200),
	MentalImpulseControlLookupId VARCHAR(200),
	MentalSpeechLookupId VARCHAR(200),
	MentalBehaviourLookupId VARCHAR(200),
	MentalContentLookupId VARCHAR(200),
	MentalFlowOfThoughtLookupId VARCHAR(200),
	MentalOrientationLookupId VARCHAR(200),
	MentalEstimatedIntellectLookupId VARCHAR(200),
	MentalAttentionLookupId VARCHAR(200),
	MentalInsightLookupId VARCHAR(200),
	MentalJudgementLookupId VARCHAR(200),
	MentalMemoryLookupId VARCHAR(200),
	MentalInformationLookupId VARCHAR(200),
	MentalAbstractionLookupId VARCHAR(200)
)
