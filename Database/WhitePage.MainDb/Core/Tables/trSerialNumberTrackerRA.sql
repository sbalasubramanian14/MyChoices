CREATE TABLE [Core].[trSerialNumberTrackerRA]
(
	[SerialNumberTrackerId] [int] NOT NULL PRIMARY KEY,
	[IpId] [int] NOT NULL,
	[SerialValue] [int] NOT NULL,
	[GeneratedDate] [datetime] NOT NULL
)
