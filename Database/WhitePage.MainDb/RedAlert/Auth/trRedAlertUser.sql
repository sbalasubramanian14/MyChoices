CREATE TABLE [RedAlert].[trRedAlertUser]
(
	[RedAlertUserId] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[UserName] [varchar](200) NOT NULL,
	[UserCode] [varchar](5) NOT NULL,
	[Organization] [varchar](200) NOT NULL,	
	[PrimaryContact] [varchar](50) NULL,
	[PrimaryContactNumber] [varchar](20) NULL,
	[RoleId] [int] NOT NULL,
	[IsActive] [int] DEFAULT 1 NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL
)
