CREATE TABLE [dbo].[trDataSetSchemaDetail]
(
	[DataSetSchemaDetailId] [int] NOT NULL PRIMARY KEY IDENTITY(1,1),
	[DataSetSchemaId] [int] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[DisplayTitle] [varchar](250) NOT NULL,
	[DeafultValue] [nvarchar](500) NULL,
	[IsActive] [bit] NOT NULL
)
