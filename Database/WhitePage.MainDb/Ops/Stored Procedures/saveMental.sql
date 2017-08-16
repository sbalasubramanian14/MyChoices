CREATE PROCEDURE [Ops].[saveMental]
	@caseMentalType as [Ops].[CaseMentalType] readonly
AS
BEGIN

	MERGE Ops.trCaseMental T
	USING @caseMentalType S ON T.CaseMentalId = S.CaseMentalId AND T.CaseId = S.CaseId
	WHEN NOT MATCHED THEN
		INSERT (CaseId, MentalDressLookupId, MentalHygieneLookupId, MentalBodyTypeLookupId, MentalExpressionLookupId, MentalMotorActivityLookupId, MentalVocabularyLookupId, MentalImpulseControlLookupId,
				MentalSpeechLookupId, MentalBehaviourLookupId, MentalContentLookupId, MentalFlowOfThoughtLookupId, MentalOrientationLookupId, MentalEstimatedIntellectLookupId, MentalAttentionLookupId,
				MentalInsightLookupId, MentalJudgementLookupId, MentalMemoryLookupId, MentalInformationLookupId, MentalAbstractionLookupId)
		VALUES (S.CaseId, S.MentalDressLookupId, S.MentalHygieneLookupId, S.MentalBodyTypeLookupId, S.MentalExpressionLookupId, S.MentalMotorActivityLookupId, S.MentalVocabularyLookupId, S.MentalImpulseControlLookupId,
				S.MentalSpeechLookupId, S.MentalBehaviourLookupId, S.MentalContentLookupId, S.MentalFlowOfThoughtLookupId, S.MentalOrientationLookupId, S.MentalEstimatedIntellectLookupId, S.MentalAttentionLookupId,
				S.MentalInsightLookupId, S.MentalJudgementLookupId, S.MentalMemoryLookupId, S.MentalInformationLookupId, S.MentalAbstractionLookupId)
	WHEN MATCHED THEN 
		UPDATE 
		SET 			
			T.MentalDressLookupId = S.MentalDressLookupId
			,T.MentalHygieneLookupId = S.MentalHygieneLookupId
			,T.MentalBodyTypeLookupId = S.MentalBodyTypeLookupId
			,T.MentalExpressionLookupId = S.MentalExpressionLookupId
			,T.MentalMotorActivityLookupId = S.MentalMotorActivityLookupId
			,T.MentalVocabularyLookupId = S.MentalVocabularyLookupId
			,T.MentalImpulseControlLookupId = S.MentalImpulseControlLookupId
			,T.MentalSpeechLookupId = S.MentalSpeechLookupId
			,T.MentalBehaviourLookupId = S.MentalBehaviourLookupId
			,T.MentalContentLookupId = S.MentalContentLookupId
			,T.MentalFlowOfThoughtLookupId = S.MentalFlowOfThoughtLookupId
			,T.MentalOrientationLookupId = S.MentalOrientationLookupId
			,T.MentalEstimatedIntellectLookupId = S.MentalEstimatedIntellectLookupId
			,T.MentalAttentionLookupId = S.MentalAttentionLookupId
			,T.MentalInsightLookupId = S.MentalInsightLookupId
			,T.MentalJudgementLookupId = S.MentalJudgementLookupId
			,T.MentalMemoryLookupId = S.MentalMemoryLookupId
			,T.MentalInformationLookupId = S.MentalInformationLookupId
			,T.MentalAbstractionLookupId = S.MentalAbstractionLookupId;

	declare @CaseId INT;
	select @CaseId = CaseId from @caseMentalType;
	select * from [Ops].[vCaseMental] where CaseId = @CaseId;
END
	