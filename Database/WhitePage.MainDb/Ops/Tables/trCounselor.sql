CREATE TABLE [Ops].[trCounselor]
(
	[CounselorId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	FirstName VARCHAR(200) NOT NULL,
	LastName VARCHAR(200) NOT NULL,
	CenterId SMALLINT NULL,
	IsGlobal BIT NOT NULL default(0),
	IsActive BIT NOT NULL default(1)
)
