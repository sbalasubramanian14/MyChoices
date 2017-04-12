CREATE TABLE [Ops].[trCaseChildren]
(
	[CaseChildrenId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[CaseId] INT NOT NULL,
	[Name] VARCHAR(200) null,
	[Age] TINYINT null,
	[GenderLookupId] INT null,
	[RelationshipWithAbuserLookupId] INT null,

	[CreatedBy] int not null,
	[CreatedDateTime] datetime not null,
	[ModifiedBy] int not null,
	[ModifiedDatetime] datetime not null
)
