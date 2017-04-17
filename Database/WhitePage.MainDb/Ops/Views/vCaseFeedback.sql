CREATE VIEW [Ops].[vCaseFeedback]
AS
SELECT 
A.CaseFeedbackId,
A.CaseId,

A.RespectedDuringYourVisitLookupId,
A.FeelSafeAndSecureLookupId,
A.FeelThatCounsellingLookupId,
A.AssistanceOfPeacemakerLookupId,

A.RecommendFreeCounsellingLookupId,
A.AbleToImproveLookupId,
A.OPMTeamToFollowupLookupId,
A.AnySuggestions,

A1.Value as RespectedDuringYourVisit,
A2.Value as FeelSafeAndSecure,
A3.Value as FeelThatCounselling,
A4.Value as AssistanceOfPeacemaker,

A5.Value as RecommendFreeCounselling,
A6.Value as AbleToImprove,
A7.Value as OPMTeamToFollowup

FROM [Ops].[trCaseFeedback] A
LEFT JOIN Core.dmnLookupDetail A1 ON A1.LookupDetailId = A.RespectedDuringYourVisitLookupId 
LEFT JOIN Core.dmnLookupDetail A2 ON A2.LookupDetailId = A.FeelSafeAndSecureLookupId 
LEFT JOIN Core.dmnLookupDetail A3 ON A3.LookupDetailId = A.FeelThatCounsellingLookupId 
LEFT JOIN Core.dmnLookupDetail A4 ON A4.LookupDetailId = A.AssistanceOfPeacemakerLookupId 

LEFT JOIN Core.dmnLookupDetail A5 ON A5.LookupDetailId = A.RecommendFreeCounsellingLookupId 
LEFT JOIN Core.dmnLookupDetail A6 ON A6.LookupDetailId = A.AbleToImproveLookupId 
LEFT JOIN Core.dmnLookupDetail A7 ON A7.LookupDetailId = A.OPMTeamToFollowupLookupId 


