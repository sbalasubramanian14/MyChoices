CREATE TABLE [Ops].[trCaseManage]
(
	[CaseManageId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	CaseId INT,
	CaseStatusId TINYINT,

	SourceOfCaseLookupId INT,
	SourceOfCaseDesc varchar(2000),

	TypesOfCounselingLookupId INT,
	TotalNoOfSessionsLookupId INT,
	TotalHoursSpentLookupId INT,

	ReasonForClosureStatus varchar(2000),
	CaseSubject varchar(2000),
	CaseDescription varchar(2000),
	RelationshipWithPMLookupId INT,

	ResolutionLog varchar(2000)

)
