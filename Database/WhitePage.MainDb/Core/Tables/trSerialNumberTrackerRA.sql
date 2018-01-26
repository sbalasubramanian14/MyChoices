CREATE TABLE [Core].[trSerialNumberTrackerRA]
(
	[SerialNumberTrackerId] [int] NOT NULL PRIMARY KEY,
	[FormType] [varchar](5) NOT NULL,
	[IpCode] [int] NOT NULL,
	[SerialValue] [int] NOT NULL,
	[GeneratedDate] [datetime] NOT NULL
)
