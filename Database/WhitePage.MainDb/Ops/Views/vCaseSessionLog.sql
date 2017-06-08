CREATE VIEW [Ops].[vCaseSessionLog]
AS
	 select A.CaseSessionLogId
		,A.CaseId
		,A.CounselingDate
		,A.TypeOfCounselingLookupId
		,A.DurationOfSessionMIn
		,A.NextSessionScheduled
		,A.SessionNotes
		,B.Value as TypeOfCounselingDesc		
	from Ops.trCaseSessionLog A
	JOIN Core.dmnLookupDetail B on A.TypeOfCounselingLookupId = B.LookupDetailId