CREATE PROCEDURE [Ops].[saveSessionLog]
	@caseSessionLogType as [Ops].[CaseSessionLogType] readonly
AS
BEGIN

	MERGE Ops.trCaseSessionLog T
	USING @caseSessionLogType S ON T.CaseSessionLogId = S.CaseSessionLogId AND T.CaseId = S.CaseId
	WHEN NOT MATCHED THEN
		INSERT (CaseId, CounselingDate, TypeOfCounselingLookupId, TypeOfCounselingDesc, DurationOfSessionMIn, NextSessionScheduled, SessionNotes)
		VALUES (S.CaseId, S.CounselingDate, S.TypeOfCounselingLookupId, S.TypeOfCounselingDesc, S.DurationOfSessionMIn, S.NextSessionScheduled, S.SessionNotes)
	WHEN MATCHED THEN 
		UPDATE 
		SET 			
			T.CounselingDate = S.CounselingDate
			,T.TypeOfCounselingLookupId = S.TypeOfCounselingLookupId
			,T.TypeOfCounselingDesc = S.TypeOfCounselingDesc
			,T.DurationOfSessionMIn = S.DurationOfSessionMIn
			,T.NextSessionScheduled = S.NextSessionScheduled
			,T.SessionNotes = S.SessionNotes;

	declare @CaseId INT;
	select @CaseId = CaseId from @caseSessionLogType;
	select * from [Ops].[vCaseSessionLog] where CaseId = @CaseId;
END
	