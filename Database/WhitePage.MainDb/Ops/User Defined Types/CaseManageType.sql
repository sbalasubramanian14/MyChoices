CREATE TYPE [Ops].[CaseManageType] AS TABLE
(
	CaseManageId INT ,
	CaseId INT,
	CaseStatusId TINYINT,

	SourceOfCaseLookupId INT,
	SourceOfCaseDesc varchar(MAX),

	TypesOfCounselingLookupId varchar(100),
	TotalNoOfSessionsLookupId INT,
	TotalHoursSpentLookupId INT,

	ReasonForClosureStatus varchar(MAX),
	CaseSubject varchar(MAX),
	CaseDescription varchar(MAX),
	RelationshipWithPMLookupId INT,

	ResolutionLog varchar(MAX)
)
