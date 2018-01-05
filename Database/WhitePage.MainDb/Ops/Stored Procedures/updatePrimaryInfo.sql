CREATE PROCEDURE [Ops].[updatePrimaryInfo]
	@caseType [Ops].[CaseType] readonly
AS
BEGIN

	MERGE Ops.trCase T
	USING @caseType S ON T.CaseId = S.CaseId
	WHEN MATCHED THEN 
		UPDATE 
		SET 
			T.CenterId = S.CenterId, 
			T.SourceOfCaseLookupId = S.SourceOfCaseLookupId,
			T.SourceOfCaseDesc = S.SourceOfCaseDesc,
			T.PeaceMakerId = S.PeaceMakerId,
			T.CounselorId = S.CounselorId,
			T.ClientFirstName = S.ClientFirstName,
			T.ClientLastName = S.ClientLastName,
			T.FatherName = S.FatherName,
			T.Mi = S.Mi,
			T.GenderLookupId = S.GenderLookupId,
			T.RequireAssistanceLookupId = S.RequireAssistanceLookupId,
			T.MaritalStatusLookupId = S.MaritalStatusLookupId,
			T.Remarks = S.Remarks,
			T.MobileNumber = S.MobileNumber;

	declare @CaseId INT;
	select @CaseId = CaseId from @caseType;
	select * from [Ops].[vCaseHeader] where CaseId = @CaseId;
END
	
