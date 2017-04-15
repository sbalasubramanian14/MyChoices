CREATE TYPE [Ops].[CaseOffenderType] AS TABLE
(
	[CaseOffenderId] INT,
	CaseId INT,
	Name varchar(200),
	Age smallint,
	GenderLookupId INT,
	RelationshipWithVictimLookupId INT
)
