CREATE TYPE [Ops].[CaseSessionLogType] AS TABLE
(
	[CaseSessionLogId] INT,
	CaseId INT,

	CounselingDate datetime,
	TypeOfCounselingLookupId INT,
	TypeOfCounselingDesc varchar(200),
	DurationOfSessionMIn smallint,
	NextSessionScheduled DateTime,
	SessionNotes varchar(2000)
)
