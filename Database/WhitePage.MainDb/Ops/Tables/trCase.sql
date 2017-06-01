CREATE TABLE [Ops].[trCase]
(
	[CaseId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	CaseNumber varchar(200),
	[CenterId] SMALLINT NOT NULL,
	CaseStausId TINYINT NOT NULL DEFAULT(1),
	[CounselorId] INT NOT NULL,
	[PeaceMakerId] INT NOT NULL,
	ClientFirstName VARCHAR(200) NOT NULL,
	ClientLastName VARCHAR(200) NOT NULL,
	Mi VARCHAR(2000) NULL,
	FatherName VARCHAR(200) NOT NULL,
	GenderLookupId int NOT NULL,
	RequireAssistanceLookupId int NOT NULL,	
	MaritalStatusLookupId int NOT NULL,
	Remarks VARCHAR(300) NULL,
	RegisterDate DateTime NULL,
	MobileNumber VARCHAR(20) NULL,

	[CreatedBy] int not null,
	[CreatedDateTime] datetime not null,
	[ModifiedBy] int not null,
	[ModifiedDatetime] datetime not null
)
