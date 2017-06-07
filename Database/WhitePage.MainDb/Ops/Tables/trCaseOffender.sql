CREATE TABLE [Ops].[trCaseOffender]
(
	[CaseOffenderId] INT NOT NULL PRIMARY KEY IDENTITY (1,1),
	CaseId INT NOT NULL,
	Name varchar(200),
	Age DECIMAL(5, 2),
	GenderLookupId INT,
	RelationshipWithVictimLookupId INT, 
    OtherRelationship varchar(200) 
)
