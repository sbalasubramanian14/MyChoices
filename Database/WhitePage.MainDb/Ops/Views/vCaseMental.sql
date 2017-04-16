CREATE VIEW [Ops].[vCaseMental]
AS 
SELECT 
A.CaseMentalId,
A.CaseId,
A.MentalDressLookupId,
A.MentalHygieneLookupId,
A.MentalBodyTypeLookupId,
A.MentalExpressionLookupId,
A.MentalMotorActivityLookupId,
A.MentalVocabularyLookupId,
A.MentalImpulseControlLookupId,
A.MentalSpeechLookupId,
A.MentalBehaviourLookupId,
A.MentalContentLookupId,
A.MentalFlowOfThoughtLookupId,
A.MentalOrientationLookupId,
A.MentalEstimatedIntellectLookupId,
A.MentalAttentionLookupId,
A.MentalInsightLookupId,
A.MentalJudgementLookupId,
A.MentalMemoryLookupId,
A.MentalInformationLookupId,
A.MentalAbstractionLookupId,

A30.Value as MentalDress,
A31.Value as MentalHygiene,
A32.Value as MentalBodyType,
A33.Value as MentalExpression,
A34.Value as MentalMotorActivity,
A35.Value as MentalVocabulary,
A36.Value as MentalImpulseControl,
A37.Value as MentalSpeech,
A38.Value as MentalBehaviour,
A39.Value as MentalContent,
A40.Value as MentalFlowOfThought,
A41.Value as MentalOrientation,
A42.Value as MentalEstimatedIntellect,
A43.Value as MentalAttention,
A51.Value as MentalInsight,
A52.Value as MentalJudgement,
A53.Value as MentalMemory,
A54.Value as MentalInformation,
A55.Value as MentalAbstraction

FROM [Ops].[trCaseMental] A
LEFT JOIN Core.dmnLookupDetail A30 ON A30.LookupDetailId = A.MentalDressLookupId 
LEFT JOIN Core.dmnLookupDetail A31 ON A31.LookupDetailId = A.MentalHygieneLookupId 
LEFT JOIN Core.dmnLookupDetail A32 ON A32.LookupDetailId = A.MentalBodyTypeLookupId 
LEFT JOIN Core.dmnLookupDetail A33 ON A33.LookupDetailId = A.MentalExpressionLookupId 
LEFT JOIN Core.dmnLookupDetail A34 ON A34.LookupDetailId = A.MentalMotorActivityLookupId 
LEFT JOIN Core.dmnLookupDetail A35 ON A35.LookupDetailId = A.MentalVocabularyLookupId 
LEFT JOIN Core.dmnLookupDetail A36 ON A36.LookupDetailId = A.MentalImpulseControlLookupId 
LEFT JOIN Core.dmnLookupDetail A37 ON A37.LookupDetailId = A.MentalSpeechLookupId 
LEFT JOIN Core.dmnLookupDetail A38 ON A38.LookupDetailId = A.MentalBehaviourLookupId 
LEFT JOIN Core.dmnLookupDetail A39 ON A39.LookupDetailId = A.MentalContentLookupId 
LEFT JOIN Core.dmnLookupDetail A40 ON A40.LookupDetailId = A.MentalFlowOfThoughtLookupId 
LEFT JOIN Core.dmnLookupDetail A41 ON A41.LookupDetailId = A.MentalOrientationLookupId 
LEFT JOIN Core.dmnLookupDetail A42 ON A42.LookupDetailId = A.MentalEstimatedIntellectLookupId 
LEFT JOIN Core.dmnLookupDetail A43 ON A43.LookupDetailId = A.MentalAttentionLookupId 
LEFT JOIN Core.dmnLookupDetail A51 ON A51.LookupDetailId = A.MentalInsightLookupId 
LEFT JOIN Core.dmnLookupDetail A52 ON A52.LookupDetailId = A.MentalJudgementLookupId 
LEFT JOIN Core.dmnLookupDetail A53 ON A53.LookupDetailId = A.MentalMemoryLookupId 
LEFT JOIN Core.dmnLookupDetail A54 ON A54.LookupDetailId = A.MentalInformationLookupId 
LEFT JOIN Core.dmnLookupDetail A55 ON A55.LookupDetailId = A.MentalAbstractionLookupId 
