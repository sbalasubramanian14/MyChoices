CREATE TABLE [Ops].[trPostSvp]
(
	[FormId] INT NOT NULL PRIMARY KEY,
	[PostSvpNumber] VARCHAR(200) NOT NULL,
	[PostSvpDate] DATE NOT NULL,
	[TravelHours] DECIMAL(3,1) NOT NULL,
	[TotalCampaignHours] DECIMAL(4,2) NOT NULL,
	[FieldWorkerNames] VARCHAR(200) NOT NULL,
	[ORAVisited] BIT NOT NULL,

	[VillageCode] INT NOT NULL,
	
	[ConfirmedChildAbuseCount] TINYINT NOT NULL,
	[ConfirmedDomesticViolenceCasesCount] TINYINT NOT NULL,
	[ConfirmedTraffickingCasesCount] TINYINT NOT NULL,
	[ConfirmedMissingCasesCount] TINYINT NOT NULL,
	[ConfirmedSchoolDropOutsCount] TINYINT NOT NULL,
	[NeighbouringTrafficProneDesc] VARCHAR(500) NOT NULL,
	

	-- participants count
	[MothersParticipationCount] SMALLINT NOT NULL,
	[FathersParticipationCount] SMALLINT NOT NULL,
	[SchoolParticipationCount] SMALLINT NOT NULL,
	[EldersParticipationCount] SMALLINT NOT NULL,
	[MovieParticipationCount] SMALLINT NOT NULL,
	[TotalParticipationCount] SMALLINT NOT NULL,

	--feedback
	[MothersFeedback] VARCHAR(500) NOT NULL,
	[FathersFeedback] VARCHAR(500) NOT NULL,
	[SchoolFeedback] VARCHAR(500) NOT NULL,
	[EldersFeedback] VARCHAR(500) NOT NULL,

	--others
	[SchoolName] VARCHAR(100) NOT NULL,
	[ComicBooksCount] SMALLINT NOT NULL,
	[TotalSvpCost] INT NOT NULL,
	[Summary] VARCHAR(500) NOT NULL,
	[PositiveFeedback] VARCHAR(500) NOT NULL,
	[ChallengesDesc] VARCHAR(500) NOT NULL,
	[IsFollowUpRequiredDesc] VARCHAR(500) NOT NULL,
	[Recomendations] VARCHAR(500) NOT NULL,

	-- Name,designation and phone number of elders and police
	[ElderName] VARCHAR(50) NOT NULL,
	[ElderDesignation] VARCHAR(50) NOT NULL,
	[ElderContactNumber] VARCHAR(14) NOT NULL, 

	[PoliceName] VARCHAR(50) NOT NULL,
	[PoliceDesignation] VARCHAR(50) NOT NULL,
	[PoliceContactNumber] VARCHAR(14) NOT NULL,

	[CreatedDateTime] DATETIME NOT NULL,
	[CreatedBy] VARCHAR(50) NOT NULL
)
