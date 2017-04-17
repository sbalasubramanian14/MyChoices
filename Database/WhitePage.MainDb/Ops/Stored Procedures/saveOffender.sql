CREATE PROCEDURE [Ops].[saveOffender]
	@caseOffenderType as [Ops].[CaseOffenderType] readonly
AS
BEGIN

	MERGE Ops.trCaseOffender T
	USING @caseOffenderType S ON T.CaseOffenderId = S.CaseOffenderId AND T.CaseId = S.CaseId
	WHEN NOT MATCHED THEN
		INSERT (CaseId, Name, Age, GenderLookupId, RelationshipWithVictimLookupId)
		VALUES (S.CaseId, S.Name, S.Age, S.GenderLookupId, S.RelationshipWithVictimLookupId)
	WHEN MATCHED THEN 
		UPDATE 
		SET 			
			T.Name = S.Name
			,T.Age = S.Age
			,T.GenderLookupId = S.GenderLookupId
			,T.RelationshipWithVictimLookupId = S.RelationshipWithVictimLookupId;

declare @CaseId INT;
	select @CaseId = CaseId from @caseOffenderType;
	select * from [Ops].[vCaseHeader] where CaseId = @CaseId;
END
	