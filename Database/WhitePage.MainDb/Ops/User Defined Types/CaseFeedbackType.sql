CREATE TYPE [Ops].[CaseFeedbackType] AS TABLE
(
	[CaseFeedbackId] INT,
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
