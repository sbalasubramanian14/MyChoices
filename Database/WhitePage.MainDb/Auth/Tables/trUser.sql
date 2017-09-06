CREATE TABLE [Auth].[trUser]
(
	[UserId] INT NOT NULL PRIMARY KEY IDENTITY (1,1),
	[UserName] VARCHAR(200) NOT NULL,
	[Password] VARCHAR(4000) NOT NULL,
	[FirstName] VARCHAR(200) NOT NULL,
	[LastName] VARCHAR(200) NOT NULL,
	[DoB] DATETIME NULL,
	[MobileNumber] VARCHAR(200) NULL,
	[FailureAttempts] SMALLINT NOT NULL DEFAULT(0),
	[IsLocked] BIT DEFAULT(0),
	[LockedDate] DATETIME NULL,
	[IsSuspended] BIT DEFAULT(0),
	[SuspendedDate] DATETIME NULL,	

	[CreatedBy] INT NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	[ModifiedBy] INT NOT NULL,
	[ModifiedDate] DATETIME NOT NULL,

	[IsActive] INT NOT NULL DEFAULT (1), 
    CONSTRAINT UK_trUser_UserName UNIQUE([UserName])
)
