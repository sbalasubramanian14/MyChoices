CREATE TABLE [Ops].[trCaseLegal]
(
	[CaseLegalId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	CaseId int,
	CaseNumber varchar(200),
	Court varchar(200),
	Prayer varchar(200),
	LegalRepresentative varchar(200),

	LegalConsentFormLookupId INT,
	LegalActionLookupId INT,
	OutcomeLookupId INT,
	DocumentsLookupId INT
)
