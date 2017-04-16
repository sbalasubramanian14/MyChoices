CREATE TYPE [Ops].[CaseManageType] AS TABLE
(
	CaseManageId INT ,
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
