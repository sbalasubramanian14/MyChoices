CREATE TABLE [Core].[trSerialNumberTrackerRA]
(
	[SerialNumberTrackerRAId] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[FormType] [varchar](5) NOT NULL,
	[IpCode] [VARCHAR](10) NOT NULL,
	[SerialValue] [int] NOT NULL,
	[GeneratedDate] [datetime] NOT NULL
)
