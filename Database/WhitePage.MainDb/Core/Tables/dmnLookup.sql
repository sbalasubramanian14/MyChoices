CREATE TABLE [Core].[dmnLookup]
(
	[LookupId] INT NOT NULL PRIMARY KEY,
	[Title] nvarchar(200) not null,
	[IsActive] bit not null,
	[IsReadOnly] bit not null default(0),
	
	[CreatedBy] int not null,
	[CreatedDateTime] datetime not null,
	[ModifiedBy] int not null,
	[ModifiedDatetime] datetime not null,

	CONSTRAINT UK_dmnLookup_UserName UNIQUE([Title])
)
