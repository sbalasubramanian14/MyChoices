CREATE TYPE [Ops].[CaseHouseHoldType] AS TABLE
(
	[CaseFamilyHouseHoldId] INT,
	[CaseId] INT NOT NULL,
	ChildrenDeceasedLookupId INT NULL,
	HouseHoldIncomeLookupId INT NULL,
	SoughtHelpYesNoLookupId INT NULL,
	SoughtHelpDesc varchar(200) NULL,
	SoughtHelpOutPut varchar(200) NULL,
	PeacemakerAssistanceLookupId int NULL,
	PeacemakerAssistanceDesc varchar(200),
	PeacemakerFollowupYesNoLookupId INT NULL,
	ClientSignedRegistrationFormYesNoLookupId INT NULL,
	ClientEmailId varchar(200) NULL,
	ReligionLookupId INT NULL,
	LevelOfEducationLookupId INT NULL,
	VocationalSkillsLookupId INT NULL,
	OccupationLookupId INT NULL,
	OccupationDesc varchar(200) NULL,
	ClientIncomeLookupId INT NULL,
	HouseHoldMembersLivingLookupId INT NULL,
	YearOfMarriage smallint NULL,
	ClientAgeAtFirstChild tinyint NULL
)
