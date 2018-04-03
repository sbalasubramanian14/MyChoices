﻿CREATE TABLE [dbo].[trRevisit]
(
	[RevisitId] INT NOT NULL PRIMARY KEY,
    [RevisitNumber] VARCHAR(15) NOT NULL,
	[VillageCode] INT NOT NULL,
	[DateofRevisit] DATETIME NOT NULL,

	[TrafficCountBeforeSVP] SMALLINT NOT NULL, 
	[TrafficCountAfterSVP] SMALLINT NOT NULL,
    [ChildMarriageCountBeforeSVP] SMALLINT NOT NULL,
    [ChildMarriageCountAfterSVP] SMALLINT NOT NULL,
    [IsVillageSafeForGirlsDesc] VARCHAR(500) NOT NULL,
	[IsStrategicNetworkingHelpfulDesc] VARCHAR(500) NOT NULL,
	[IsVillageLeadershipHelpfulDesc] VARCHAR(500) NOT NULL,
    [IsCVCActiveDesc] VARCHAR(500) NOT NULL,

	[DoFathersRememberSVP] VARCHAR(3) NOT NULL,
	[FathersFeedback] VARCHAR(200) NOT NULL,
	[DoMothersRememberSVP] VARCHAR(3) NOT NULL,
	[MothersFeedback] VARCHAR(200) NOT NULL,
	[DoGirlsRememberSVP] VARCHAR(3) NOT NULL,
	[GirlsFeedback] VARCHAR(200) NOT NULL,
	[DoBoysRememberSVP] VARCHAR(3) NOT NULL,
	[BoysFeedback] VARCHAR(200) NOT NULL,
	[DoVillageEldersRememberSVP] VARCHAR(3) NOT NULL,
	[VillageEldersFeedback] VARCHAR(200) NOT NULL,
	[DoPoliceRememberSVP] VARCHAR(3) NOT NULL,
	[PoliceFeedback] VARCHAR(200) NOT NULL,
	[VillageElderContactNumber] VARCHAR(10) NOT NULL,
	[PoliceContactNumber] VARCHAR(10) NOT NULL,
	[DoSchoolStaffRememberSVP] VARCHAR(3) NOT NULL,
	[SchoolStaffFeedback] VARCHAR(200) NOT NULL,
	[SchoolPrincipalContactNumber] VARCHAR(10) NOT NULL,
	[WasSkitConducted] VARCHAR(3) NOT NULL,
	[SVPSuccessStory] VARCHAR(500) NOT NULL,
	[ProgrammeFeedbackSummary] VARCHAR(500) NOT NULL,

	[SVPImplementationChallenges] VARCHAR(500) NOT NULL,
	[ORAHelplineCallDesc] VARCHAR(500) NOT NULL,
	[IsAnotherSVPRequired] VARCHAR(3) NOT NULL,
	[NextStepsRecommendations] VARCHAR(500) NOT NULL,
	[ComicBooksCount] INT NOT NULL,
	[StudentsParticipationCount] SMALLINT NOT NULL,
	[RakshakDesc] VARCHAR(500) NOT NULL,
	[HelplineNumber] VARCHAR(14) NOT NULL,
	[RevisitSummary] VARCHAR(200) NOT NULL,

	[CreatedDateTime] DATETIME NOT NULL,
	[CreatedBy] VARCHAR(50) NOT NULL
)
