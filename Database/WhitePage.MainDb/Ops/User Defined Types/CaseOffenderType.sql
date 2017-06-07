CREATE TYPE [Ops].[CaseOffenderType] AS TABLE
(
	[CaseOffenderId] INT,
	CaseId INT,
	Name varchar(200),
	Age DECIMAL(5, 2),
	GenderLookupId INT,
	RelationshipWithVictimLookupId INT,
	OtherRelationship varchar(200)
)
