CREATE TABLE [Ops].[trCasePhysicalHealth]
(
	[CasePhysicalHealthId] INT NOT NULL PRIMARY KEY identity(1,1),
	CaseId INT,
	SufferingFromAnyMajorIllnessLookupId INT,
	SufferingFromAnyMajorIllnessDesc varchar(200),

	DiagnosedPsychiatricIllnessLookupId INT,
	DiagnosedPsychiatricIllnessDesc varchar(200),

	SleepPerNightLookupId INT,
	AppetiteLookupId INT,
	ExerciseLookupId INT,

	AnyMedicationLookupId INT,
	AnyMedicationDesc varchar(200),

	AnySubstanceLookupId INT,
	AnySubstanceDesc varchar(200),

	CurrentlyPregnantLookup INT,
	CurrentlyPregnantDesc varchar(200),

	ReasonForSeekingHelpLookupId INT,
	WhoIsAbusingYouLookupId varchar(200),
	WhoIsAbusingYouDesc varchar(200)
)
