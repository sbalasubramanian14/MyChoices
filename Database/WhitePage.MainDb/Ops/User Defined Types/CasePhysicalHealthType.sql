CREATE TYPE [Ops].[CasePhysicalHealthType] AS TABLE
(
	[CasePhysicalHealthId] INT NULL,
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
	WhoIsAbusingYouLookupId INT,
	WhoIsAbusingYouDesc varchar(200)
)
