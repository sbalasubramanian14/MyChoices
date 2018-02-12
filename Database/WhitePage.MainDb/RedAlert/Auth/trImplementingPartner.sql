CREATE TABLE [Auth].[trImplementingPartner]
(
	[ImplementingPartnerId] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[UserName] [varchar](200) NOT NULL,
	[IpCode] [varchar](5) NOT NULL,
	[NgoName] [varchar](200) NOT NULL,
	[PrimaryContact] [varchar](200) NOT NULL,
	[PrimaryContactNumber] [varchar](20) NULL,	
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL
)
