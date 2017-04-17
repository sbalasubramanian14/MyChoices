CREATE PROCEDURE [Ops].[saveChildren]
	@caseChildrenType as [Ops].[CaseChildrenType] readonly
AS
BEGIN
	MERGE Ops.trCaseChildren T
	USING @caseChildrenType S ON T.[CaseChildrenId] = S.[CaseChildrenId] AND T.CaseId = S.CaseId
	WHEN NOT MATCHED THEN
		INSERT ([CaseId] , [Name] , [Age], [GenderLookupId], [RelationshipWithAbuserLookupId] 
				,CreatedBy,CreatedDateTime,ModifiedBy,ModifiedDatetime)
		VALUES (S.[CaseId] , S.[Name] , S.[Age], S.[GenderLookupId], S.[RelationshipWithAbuserLookupId],
				S.CreatedBy,S.CreatedDateTime,S.ModifiedBy,S.ModifiedDatetime)
	WHEN MATCHED THEN 
		UPDATE 
		SET 			
			T.Name = S.Name,
			T.Age = S.Age,
			T.GenderLookupId = S.GenderLookupId,
			T.RelationshipWithAbuserLookupId = S.RelationshipWithAbuserLookupId,			
			T.ModifiedBy = S.ModifiedBy,
			T.ModifiedDatetime = S.ModifiedDatetime;

	declare @CaseId INT;
	select @CaseId = CaseId from @caseChildrenType;
	select * from [Ops].[vCaseHeader] where CaseId = @CaseId;
END