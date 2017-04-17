CREATE PROCEDURE [Ops].[saveLegal]
	@caseLegalType as [Ops].[CaseLegalType] readonly
AS
BEGIN

	MERGE Ops.trCaseLegal T
	USING @caseLegalType S ON T.CaseLegalId = S.CaseLegalId AND T.CaseId = S.CaseId
	WHEN NOT MATCHED THEN
		INSERT (CaseId, CaseNumber, Court, Prayer, LegalRepresentative, LegalConsentFormLookupId, LegalActionLookupId, OutcomeLookupId, DocumentsLookupId)
		VALUES (S.CaseId, S.CaseNumber, S.Court, S.Prayer, S.LegalRepresentative, S.LegalConsentFormLookupId, S.LegalActionLookupId, S.OutcomeLookupId, S.DocumentsLookupId)
	WHEN MATCHED THEN 
		UPDATE 
		SET 			
			T.CaseNumber = S.CaseNumber
			,T.Court = S.Court
			,T.Prayer = S.Prayer
			,T.LegalRepresentative = S.LegalRepresentative
			,T.LegalConsentFormLookupId = S.LegalConsentFormLookupId
			,T.LegalActionLookupId = S.LegalActionLookupId
			,T.OutcomeLookupId = S.OutcomeLookupId
			,T.DocumentsLookupId = S.DocumentsLookupId;

	declare @CaseId INT;
	select @CaseId = CaseId from @caseLegalType;
	select * from [Ops].[vCaseHeader] where CaseId = @CaseId;
END