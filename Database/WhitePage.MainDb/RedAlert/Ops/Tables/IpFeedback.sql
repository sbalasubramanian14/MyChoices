CREATE TABLE [RedAlert].[trIpFeedback]
(
	[IpFeedbackId] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[IpFeedbackNumber] [varchar](11) NOT NULL,
	[WasDifferenceMadeBySVP] [varchar](3) NOT NULL,
	[DidStateCoordinatorGaveSatisfiedGuidance] [varchar](3) NOT NULL,
	[DidStateCoordinatorVisit] [varchar](3) NOT NULL,
	[WasStateCoordinatorHelpfulInFollowup] [varchar](3) NOT NULL,
	[StateCoordinatorRating] [int] NOT NULL,
	[AreasOfImprovementForStateCoordinatorDesc] [varchar](500) NULL,
	[AreasOfImprovementForProgramDesc] [varchar](500) NOT NULL,
	[CreatedDateTime] [datetime] NOT NULL,
	[CreatedBy] [varchar](5) NOT NULL
)
