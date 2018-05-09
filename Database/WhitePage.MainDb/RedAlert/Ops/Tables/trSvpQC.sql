﻿CREATE TABLE [RedAlert].[trSvpQC]
(
	[PreSVPQCId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,	
	[PreSvpQCNumber] VARCHAR(10) NOT NULL,
	[VillageCode] INT NOT NULL ,
	[AreStakeholdersAware] VARCHAR(500) NOT NULL,
	[WasStickersPutUp] VARCHAR(3) NOT NULL,
	[WasProtocolFollowed] VARCHAR(3) NOT NULL,
	[WereEquipmentsWorkingProperly] VARCHAR(3) NOT NULL,
	[WereAllProgramStartedInTime] VARCHAR(3) NOT NULL,
    [WasGuardianGirlConducted] VARCHAR(3) NOT NULL,
    [DidGirlsTakeOath] VARCHAR(3) NOT NULL,
    [GirlsParticipationCount] SMALLINT NOT NULL,
	[WasCoolBoysConducted] VARCHAR(3) NOT NULL,
    [DidBoysTakeOath] VARCHAR(3) NOT NULL,
    [BoysParticipationCount] SMALLINT NOT NULL,
    [WasSkitConducted] VARCHAR(3) NOT NULL,
	[WereFilmsUsedInSchoolProgram] VARCHAR(3) NOT NULL,
    [WasMyRightsMentioned] VARCHAR(3) NOT NULL,
	[WasMotherProgramConducted] VARCHAR(3) NOT NULL,
    [MothersParticipationCount] SMALLINT NOT NULL,
    [WereFilmsUsedInMothersProgram] VARCHAR(3) NOT NULL,
	[WasFathersProgramConducted] VARCHAR(3) NOT NULL,
    [FathersParticipationCount] SMALLINT NOT NULL,
    [WereFilmsUsedInFathersProgram] VARCHAR(3) NOT NULL,
    [TotalParticipationCount] SMALLINT NOT NULL,
    [DidTeamMeetSarpanch] VARCHAR(3) NOT NULL,
	[DidTeamMeetPolice] VARCHAR(3) NOT NULL,
    [DidTeamMeetSchoolStaff] VARCHAR(3) NOT NULL,
    [DidTeamMeetAnganwadiHead] VARCHAR(3) NOT NULL,
    [DidTeamVisitedSchoolOnSecondDay] VARCHAR(3) NOT NULL,
    [SchoolChildrenFeedback] VARCHAR(500) NOT NULL,
    [StakeholdersFeedback] VARCHAR(500) NOT NULL,
    [WasRakshakIdentified] VARCHAR(3) NOT NULL,
    [WasRakshakRegistrationDone] VARCHAR(3) NOT NULL,
    [PreviousAwarenessDesc] VARCHAR(500) NOT NULL,
    [CVCStatus] VARCHAR(50) NOT NULL,
    [WasCertificateGivenToSchool] VARCHAR(3) NOT NULL,
    [FieldWorkerNames] VARCHAR(200) NOT NULL,
    [Summary] VARCHAR(500) NOT NULL,
    [CreatedDateTime] DATETIME NOT NULL,
	[CreatedBy] VARCHAR(50) NOT NULL
)