CREATE TABLE [Ops].[dmnInputControlType]
(
	[InputControlTypeId] INT NOT NULL PRIMARY KEY,
	[Name] [varchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL DEFAULT(1)
)
