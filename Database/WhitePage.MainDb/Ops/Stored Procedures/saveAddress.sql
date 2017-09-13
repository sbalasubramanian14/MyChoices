CREATE PROCEDURE [Ops].[saveAddress]
	@caseAddressType as [Ops].[CaseAddressType] readonly
AS
BEGIN
	MERGE Ops.trCaseAddress T
	USING @caseAddressType S ON T.CaseAddressId = S.CaseAddressId AND T.CaseId = S.CaseId
	WHEN NOT MATCHED THEN
		INSERT (CaseId,Address,Area,CityId,StateId,PIN,IsPrimary,CreatedBy,CreatedDateTime,ModifiedBy,ModifiedDatetime)
		VALUES (S.CaseId,S.Address,S.Area,S.CityId,S.StateId,S.PIN,0,S.CreatedBy,S.CreatedDateTime,S.ModifiedBy,S.ModifiedDatetime)
	WHEN MATCHED THEN 
		UPDATE 
		SET 			
			T.Address = S.Address,
			T.Area = S.Area,
			T.CityId = S.CityId,
			T.StateId = S.StateId,
			T.PIN = S.PIN,			
			T.ModifiedBy = S.ModifiedBy,
			T.ModifiedDatetime = S.ModifiedDatetime;

	declare @CaseId INT;
	select @CaseId = CaseId from @caseAddressType;
	select * from [Ops].[vCaseAddress] where CaseId = @CaseId;
END
