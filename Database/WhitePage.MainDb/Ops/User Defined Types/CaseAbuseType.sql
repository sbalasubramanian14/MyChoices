CREATE TYPE [Ops].[CaseAbuseType] AS TABLE
(
	[CaseAbuseId] INT ,
	[CaseId] INT,

	SufferingFromAbuseLookupId INT,
	SufferingFromAbuseDesc varchar(2000),
	
	FeelAboutAbuseLookupId INT,
	ParentsFeelAboutAbuseLookupId INT,
	LawFeelAboutAbuseLookupId INT,
	SignsOfPhysicalAbuseLookupId INT,
	SignsOfPhysicalAbuseDesc varchar(2000),

	WeaponsUsedLookupId INT,
	WeaponsUsedDesc varchar(2000),

	TypesOfPhyscialAbuseLookupId INT,
	FrequencyOfPhyscialAbuseLookupId INT,
	NumberOfYearsOfPhyscialAbuse tinyint,

	TypesOfEmotionalAbuseLookupId INT,
	FrequencyOfEmotionalAbuseLookupId INT,
	NumberOfYearsOfEmotionalAbuse tinyint,

	TypesOfSexualAbuseLookupId INT,
	FrequencyOfSexualAbuseLookupId INT,
	NumberOfYearsOfSexualAbuse tinyint,

	TypesOfEconomicAbuseLookupId INT,
	FrequencyOfEconomicAbuseLookupId INT,
	NumberOfYearsOfEconomicAbuse tinyint,

	ReasonsForAbuseLookupId INT
)
