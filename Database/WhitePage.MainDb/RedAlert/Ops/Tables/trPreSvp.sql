CREATE TABLE [RedAlert].[trPreSvp]
(
	[PreSVPId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,	
	[PreSvpNumber] VARCHAR(200) NOT NULL,
	[VillageCode] INT NOT NULL ,
	
	[PreSvpDate] DATE NOT NULL,
	[DistanceToVillage] SMALLINT NOT NULL,
	[LocationDesc] VARCHAR(500) NOT NULL,

	[MajorSourceOfIncome] VARCHAR(200) NOT NULL,
	[ActiveCommunityGroup] VARCHAR(500) NOT NULL,

	[ChildAbuseCount] TINYINT NOT NULL,
	[DomesticViolenceCasesCount] TINYINT NOT NULL,
	[TraffickingCasesCount] TINYINT NOT NULL,
	[MissingCasesCount] TINYINT NOT NULL,
	[SchoolDropoutsCount] TINYINT NOT NULL,

	[NeighbouringTrafficProneDesc] VARCHAR(500) NOT NULL,
	[LocalIssuesDesc] VARCHAR(500) NOT NULL,
	[AwarenessDesc] VARCHAR(500) NOT NULL,
	[TraffickingCausesDesc] VARCHAR(500) NOT NULL,
	[PreviousAwareness] VARCHAR(3) NOT NULL,
	[PreviousAwarenessDesc] VARCHAR(500),

	[CreatedDateTime] DATETIME NOT NULL,
	[CreatedBy] VARCHAR(50) NOT NULL
)
