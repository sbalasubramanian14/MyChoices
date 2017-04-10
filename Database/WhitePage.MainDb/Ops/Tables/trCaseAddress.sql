CREATE TABLE [Ops].[trCaseAddress]
(
	[CaseAddressId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[CaseId] INT NOT NULL,
	[Address] VARCHAR(2000) NULL,
	Area VARCHAR(200) NULL,
	CityId smallint NULL,
	StateId smallint NULL,
	PIN VARCHAR(20) NULL,	
	IsPrimary BIT NOT NULL default(0),

	[CreatedBy] int not null,
	[CreatedDateTime] datetime not null,
	[ModifiedBy] int not null,
	[ModifiedDatetime] datetime not null
)
