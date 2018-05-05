CREATE TABLE [RedAlert].[trPreSvpQC]
(
	[PreSVPQCId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,	
	[PreSvpQCNumber] VARCHAR(10) NOT NULL,
	[VillageCode] INT NOT NULL ,
	[StakeholdersDescription] VARCHAR(500) NOT NULL,
	[IpFacilitatorCommunicationSkillLevel] VARCHAR(20) NOT NULL,
	[CVCStatus] VARCHAR(50) NOT NULL,
	[WasLogisticArrangementsMade] VARCHAR(3) NOT NULL,
	[AreVillagersInterested] VARCHAR(3) NOT NULL,
	[Summary] VARCHAR(500) NOT NULL,

	[CreatedDateTime] DATETIME NOT NULL,
	[CreatedBy] VARCHAR(50) NOT NULL
)
