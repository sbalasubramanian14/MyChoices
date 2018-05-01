CREATE TABLE [RedAlert].[trSerialNumberTrackerRA]
(
	[SerialNumberTrackerRAId] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[FormType] [varchar](5) NOT NULL,
	[UserCode] [VARCHAR](10) NOT NULL,
	[SerialValue] [int] NOT NULL,
	[GeneratedDate] [datetime] NOT NULL
)
