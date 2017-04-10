CREATE TABLE [Ops].[trCaseRegistration]
(
	[CaseRegistrationId] INT NOT NULL PRIMARY KEY identity(1,1),
	[CaseId] INT NOT NULL,
	[Subject] VARCHAR(2000) NULL,
	[Description] VARCHAR(2000) NULL,
	RelationshipOfClientWithPMLookupId INT NULL,
	RelationshipOfClientWithPMOther varchar(2000) NULL,
	ClientEmailAddress varchar(2000) NULL,
	ReligionLookupId INT NULL,
	LevelOfEducationLookupId INT NULL
)
