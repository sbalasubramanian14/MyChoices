CREATE VIEW [Ops].[vCaseAddress]
AS
	select A.CaseAddressId
		,A.CaseId
		,A.Address
		,A.Area
		,A.CityId
		,A.StateId
		,A.PIN
		,A.IsPrimary
		,A.CreatedBy
		,A.CreatedDateTime
		,A.ModifiedBy
		,A.ModifiedDatetime
		,C.Title as City
		,S.Title as State
	from Ops.trCaseAddress A
	JOIN Core.dmnCity C ON C.CityId = A.CityId
	JOIN Core.dmnState S on S.StateId = A.StateId
