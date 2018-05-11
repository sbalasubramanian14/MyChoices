CREATE TABLE [RedAlert].[trPostSvpQC]
(
	[PostSvpQCId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,	
	[PostSvpQCNumber] VARCHAR(10) NOT NULL,
	[VillageCode] INT NOT NULL ,

	[PostSvpQCDate] DATE NOT NULL,
	[CVCStatus] VARCHAR(50) NOT NULL,
	[WasAnyAnotherClubFormed] VARCHAR(3) NOT NULL,
	[WasVillageLeadershipProActive] VARCHAR(3) NOT NULL, 
    [DoVillagersRememberSVP] VARCHAR(3) NOT NULL,
	[TrafficCountBeforeSVP] SMALLINT NOT NULL,
	[TrafficCountAfterSVP] SMALLINT NOT NULL,
	[ChildMarriageCountBeforeSVP] SMALLINT NOT NULL,
	[ChildMarriageCountAfterSVP] SMALLINT NOT NULL,
	[WasFollowUpDoneByNGO] VARCHAR(3) NOT NULL,
	[AreInfoStickersIntact] VARCHAR(3) NOT NULL,
	[IsVillageSafeForGirls] VARCHAR(3) NOT NULL,
	[SuccessStory] VARCHAR(500) NOT NULL,
	[IsFollowUpSvpRequiredDesc] VARCHAR(500) NOT NULL,
	[DoPeopleRememberHelpline] VARCHAR(3) NOT NULL,
	[WereIpFormsSubmitted] VARCHAR(3) NOT NULL,
	[RakshakStatus] VARCHAR(500) NOT NULL,
	[FieldWorkerNames] VARCHAR(200) NOT NULL,
	[Summary] VARCHAR(500) NOT NULL,
	[CreatedDateTime] DATETIME NOT NULL,
	[CreatedBy] VARCHAR(50) NOT NULL
)