CREATE TABLE [RedAlert].[trProgrammePlanning]
(
	[ProgrammePlanningId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[PlanningNumber] VARCHAR(10) NOT NULL,
	[VillageCode] INT,
	[PlanningMonthAndYear] VARCHAR(50) NOT NULL,
	[PlanningCategory] VARCHAR(10) NOT NULL,
	[PlannedPreSvpDate] DATETIME NOT NULL,
	[PlannedSvpDate] DATETIME NOT NULL,
	[CreatedDateTime] DATETIME NOT NULL,
	[CreatedBy] VARCHAR(5) NOT NULL
)
