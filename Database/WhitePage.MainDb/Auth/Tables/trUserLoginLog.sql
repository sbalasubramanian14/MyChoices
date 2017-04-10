CREATE TABLE [Auth].[trUserLoginLog]
(
	[UserLoginLogId] INT NOT NULL IDENTITY(1,1),
	[UserId] INT NOT NULL,
	[IpAddress] VARCHAR(70),
	[Status] VARCHAR(20),
	[LoggedInDate] DATETIME,
	[Remarks] VARCHAR(50)
)
GO
--CREATE CLUSTERED COLUMNSTORE INDEX trUserLoginLog_ColumnStore_Index ON [Auth].[trUserLoginLog]; 
--GO