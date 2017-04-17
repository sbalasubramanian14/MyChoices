CREATE PROCEDURE [Ops].[saveFeedback]
	@caseFeedbackType as [Ops].[CaseFeedbackType] readonly
AS
BEGIN

	MERGE Ops.trCaseFeedback T
	USING @caseFeedbackType S ON T.CaseFeedbackId = S.CaseFeedbackId AND T.CaseId = S.CaseId
	WHEN NOT MATCHED THEN
		INSERT (CaseId, RespectedDuringYourVisitLookupId, FeelSafeAndSecureLookupId, FeelThatCounsellingLookupId, AssistanceOfPeacemakerLookupId, RecommendFreeCounsellingLookupId,
				AbleToImproveLookupId, OPMTeamToFollowupLookupId, AnySuggestions)
		VALUES (S.CaseId, S.RespectedDuringYourVisitLookupId, S.FeelSafeAndSecureLookupId, S.FeelThatCounsellingLookupId, S.AssistanceOfPeacemakerLookupId, S.RecommendFreeCounsellingLookupId,
				S.AbleToImproveLookupId, S.OPMTeamToFollowupLookupId, S.AnySuggestions)
	WHEN MATCHED THEN 
		UPDATE 
		SET 			
			T.RespectedDuringYourVisitLookupId = S.RespectedDuringYourVisitLookupId
			,T.FeelSafeAndSecureLookupId = S.FeelSafeAndSecureLookupId
			,T.FeelThatCounsellingLookupId = S.FeelThatCounsellingLookupId
			,T.AssistanceOfPeacemakerLookupId = S.AssistanceOfPeacemakerLookupId
			,T.RecommendFreeCounsellingLookupId = S.RecommendFreeCounsellingLookupId
			,T.AbleToImproveLookupId = S.AbleToImproveLookupId
			,T.OPMTeamToFollowupLookupId = S.OPMTeamToFollowupLookupId
			,T.AnySuggestions = S.AnySuggestions;

	declare @CaseId INT;
	select @CaseId = CaseId from @caseFeedbackType;
	select * from [Ops].[vCaseHeader] where CaseId = @CaseId;
END