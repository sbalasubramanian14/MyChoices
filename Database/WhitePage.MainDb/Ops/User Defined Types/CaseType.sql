CREATE TYPE [Ops].[CaseType] AS TABLE
(
	CaseId INT ,
	CaseNumber varchar(200),
	CenterId SMALLINT ,
	CaseStausId TINYINT  DEFAULT(1),
	CounselorId INT ,
	PeaceMakerId INT ,
	ClientFirstName VARCHAR(200) ,
	ClientLastName VARCHAR(200) ,
	Mi VARCHAR(MAX) NULL,
	FatherName VARCHAR(200) ,
	GenderLookupId int ,
	RequireAssistanceLookupId int ,	
	MaritalStatusLookupId int ,
	Remarks VARCHAR(MAX) NULL,
	RegisterDate DateTime NULL,
	MobileNumber VARCHAR(20) NULL,

	CreatedBy int ,
	CreatedDateTime datetime ,
	ModifiedBy int ,
	ModifiedDatetime datetime 
)
