CREATE TABLE [Ops].[trCaseFeedback]
(
	[CaseFeedbackId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	CaseId INT,

	RespectedDuringYourVisitLookupId INT,
	FeelSafeAndSecureLookupId INT,
	FeelThatCounsellingLookupId INT,
	AssistanceOfPeacemakerLookupId INT,
	RecommendFreeCounsellingLookupId INT,
	AbleToImproveLookupId INT,
	OPMTeamToFollowupLookupId INT,
	AnySuggestions varchar(2000)
)
