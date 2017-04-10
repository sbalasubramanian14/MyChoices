CREATE PROCEDURE [Ops].[savePrimaryCase]
(
	@caseType as [Ops].[CaseType] readonly,
	@caseAddressType as [Ops].[CaseAddressType] readonly
)AS
BEGIN
	declare @caseNumber varchar(200);
	declare @caseSerial INT;

	select @caseSerial = max(SerialValue) from Core.trSerialNumberTracker;

	set @caseSerial = ISNULL(@caseSerial,0) + 1;
	set @caseNumber = Right(Year(getDate()),2) + RIGHT('00'+CAST(Month(getDate()) AS VARCHAR(2)),2)  + '-' + RIGHT('0000'+CAST(@caseSerial AS VARCHAR(4)),4);

	insert into Core.trSerialNumberTracker
	values(1, @caseSerial, GETDATE());

	declare @caseId INT;

	INSERT INTO Ops.trCase (CaseNumber, [CenterId] , CaseStausId ,[CounselorId] ,[PeaceMakerId] ,ClientFirstName , ClientLastName , Mi , FatherName ,GenderLookupId,	
	RequireAssistanceLookupId , MaritalStatusLookupId , Remarks , RegisterDate, MobileNumber
	,CreatedBy, CreatedDateTime, ModifiedBy, ModifiedDatetime)
	SELECT @caseNumber, [CenterId] , 1 ,[CounselorId] ,[PeaceMakerId] ,ClientFirstName , ClientLastName , Mi , FatherName ,GenderLookupId,	
	RequireAssistanceLookupId , MaritalStatusLookupId , Remarks , RegisterDate, MobileNumber
	,CreatedBy, CreatedDateTime, ModifiedBy, ModifiedDatetime FROM @caseType;	

	SET @CaseId = SCOPE_IDENTITY();

	INSERT INTO Ops.trCaseAddress ([CaseId], [Address], Area, CityId, StateId, PIN, IsPrimary, [CreatedBy], [CreatedDateTime], [ModifiedBy], [ModifiedDatetime] )
	SELECT @CaseId, [Address], Area, CityId, StateId, PIN, 1, [CreatedBy], [CreatedDateTime], [ModifiedBy], [ModifiedDatetime] FROM @caseAddressType

	select * from [Ops].[vCaseHeader] where CaseId = @CaseId;
END

