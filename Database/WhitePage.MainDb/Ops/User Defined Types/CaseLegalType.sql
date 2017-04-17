CREATE TYPE [Ops].[CaseLegalType] AS TABLE
(
	[CaseLegalId] INT,
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
