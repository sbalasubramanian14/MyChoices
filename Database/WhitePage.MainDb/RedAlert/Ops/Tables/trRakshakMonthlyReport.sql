CREATE TABLE [RedAlert].[trRakshakMonthlyReport]
(
	[RakshakMonthlyReportId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,	
	[RakshakMonthlyReportNumber] VARCHAR(200) NOT NULL,
	[MonthAndYear] VARCHAR(50) NOT NULL,
	[ActiveRakshakCount] INT NOT NULL,
	[DroppedRakshakCount] INT NOT NULL,
	[RegisteredRakshakCount] INT NOT NULL,
	[WasRakshakActive] VARCHAR(3) NOT NULL,
	[WasRakshakReportable] VARCHAR(3) NOT NULL,
	[CommunityMeetingCount] INT NOT NULL,
	[WasCommunityMeetingHelpful] VARCHAR(3) NOT NULL,
	[CommunityMeetingParticipationCount] INT NOT NULL,
	[WorkHoursSpent] INT NOT NULL,
	[WasSchoolDropoutsReported] VARCHAR(3) NOT NULL,
	[WasProblemsReported] VARCHAR(3) NOT NULL,
	[RakshakEffectivenessDesc] VARCHAR(100) NOT NULL,
	[ChallengesInManagingRakshakDesc] VARCHAR(100) NOT NULL,
	[RakshakStoryDesc] VARCHAR(100) NOT NULL,
	[TopPerformingRakshakDesc] VARCHAR(100) NOT NULL,
	[CreatedDateTime] DATETIME NOT NULL,
	[CreatedBy] VARCHAR(50) NOT NULL
)