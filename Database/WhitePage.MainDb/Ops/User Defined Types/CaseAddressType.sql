CREATE TYPE [Ops].[CaseAddressType] AS TABLE
(
	CaseAddressId INT ,
	CaseId INT ,
	Address VARCHAR(2000) NULL,
	Area VARCHAR(200) NULL,
	CityId smallint NULL,
	StateId smallint NULL,
	PIN VARCHAR(20) NULL,	

	[CreatedBy] int ,
	[CreatedDateTime] datetime ,
	[ModifiedBy] int ,
	[ModifiedDatetime] datetime 
)
