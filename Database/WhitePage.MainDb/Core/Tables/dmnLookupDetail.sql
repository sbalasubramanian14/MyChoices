CREATE TABLE [Core].[dmnLookupDetail]
(
	[LookupDetailId] INT NOT NULL PRIMARY KEY,
	[LookupId] INT NOT NULL,
	[Value] VARCHAR(150) NOT NULL,
	[SortId] SMALLINT NOT NULL,
	[IsAcitve] BIT NOT NULL DEFAULT(1),	

	CONSTRAINT FK_dmnLookupDetail_dmnLookup FOREIGN KEY([LookupId]) REFERENCES Core.dmnLookup([LookupId])
)
