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

'' as MentalDress,
'' as MentalHygiene,
'' as MentalBodyType,
'' as MentalExpression,
'' as MentalMotorActivity,
'' as MentalVocabulary,
'' as MentalImpulseControl,
'' as MentalSpeech,
'' as MentalBehaviour,
'' as MentalContent,
'' as MentalFlowOfThought,
'' as MentalOrientation,
'' as MentalEstimatedIntellect,
'' as MentalAttention,
'' as MentalInsight,
'' as MentalJudgement,
'' as MentalMemory,
'' as MentalInformation,
'' as MentalAbstraction

FROM [Ops].[trCaseMental] A
--LEFT JOIN Core.dmnLookupDetail A30 ON A30.LookupDetailId = REPLACE(A.MentalDressLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A31 ON A31.LookupDetailId = REPLACE(A.MentalHygieneLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A32 ON A32.LookupDetailId = REPLACE(A.MentalBodyTypeLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A33 ON A33.LookupDetailId = REPLACE(A.MentalExpressionLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A34 ON A34.LookupDetailId = REPLACE(A.MentalMotorActivityLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A35 ON A35.LookupDetailId = REPLACE(A.MentalVocabularyLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A36 ON A36.LookupDetailId = REPLACE(A.MentalImpulseControlLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A37 ON A37.LookupDetailId = REPLACE(A.MentalSpeechLookupId, ';', ',' ) 
--LEFT JOIN Core.dmnLookupDetail A38 ON A38.LookupDetailId = REPLACE(A.MentalBehaviourLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A39 ON A39.LookupDetailId = REPLACE(A.MentalContentLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A40 ON A40.LookupDetailId = REPLACE(A.MentalFlowOfThoughtLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A41 ON A41.LookupDetailId = REPLACE(A.MentalOrientationLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A42 ON A42.LookupDetailId = REPLACE(A.MentalEstimatedIntellectLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A43 ON A43.LookupDetailId = REPLACE(A.MentalAttentionLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A51 ON A51.LookupDetailId = REPLACE(A.MentalInsightLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A52 ON A52.LookupDetailId = REPLACE(A.MentalJudgementLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A53 ON A53.LookupDetailId = REPLACE(A.MentalMemoryLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A54 ON A54.LookupDetailId = REPLACE(A.MentalInformationLookupId, ';', ',' )
--LEFT JOIN Core.dmnLookupDetail A55 ON A55.LookupDetailId = REPLACE(A.MentalAbstractionLookupId, ';', ',' )

