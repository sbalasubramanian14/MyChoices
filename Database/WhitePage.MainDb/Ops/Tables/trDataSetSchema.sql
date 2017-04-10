CREATE TABLE [Ops].[trDataSetSchema]
(
	[DataSetSchemaId] [int] NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Name] [varchar](250) NOT NULL,
	[DisplayTitle] [varchar](250) NOT NULL,
	[IsActive] [bit] NOT NULL,

	[CreatedBy] int not null,
	[CreatedDateTime] datetime not null,
	[ModifiedBy] int not null,
	[ModifiedDatetime] datetime not null
)
