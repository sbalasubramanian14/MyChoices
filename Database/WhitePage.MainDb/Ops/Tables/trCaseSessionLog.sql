CREATE TABLE [Ops].[trCaseSessionLog]
(
	[CaseSessionLogId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	CaseId INT,

	CounselingDate datetime,
	TypeOfCounselingLookupId INT,
	TypeOfCounselingDesc varchar(200),
	DurationOfSessionMIn smallint,
	NextSessionScheduled DateTime,
	SessionNotes varchar(2000)
)
