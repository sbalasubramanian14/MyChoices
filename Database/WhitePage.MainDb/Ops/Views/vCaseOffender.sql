CREATE VIEW [Ops].[vCaseOffender]
AS
	select A.CaseOffenderId
		,A.CaseId
		,A.Name
		,A.Age
		,A.GenderLookupId
		,A.RelationshipWithVictimLookupId
		,B.Value as Gender
		,C.Value as RelationshipWithVictim		
	from Ops.trCaseOffender A
	JOIN Core.dmnLookupDetail B ON A.GenderLookupId = B.LookupDetailId
	JOIN Core.dmnLookupDetail C on A.RelationshipWithVictimLookupId = C.LookupDetailId
