CREATE TABLE [RedAlert].[trRakshakRegistration]
(
	[RakshakRegistrationId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,	
	[RakshakRegistrationNumber] VARCHAR(10) NOT NULL,
	[VillageCode] INT NOT NULL ,
	[Name] VARCHAR(50) NOT NULL,
	[Age] TINYINT NOT  NULL,
    [Gender] VARCHAR(6) NOT NULL,
	[EducationalQualification] VARCHAR(100) NOT NULL,
	[PhoneNumber] VARCHAR(15) NOT NULL,
    [AlternatePhoneNumber] VARCHAR(15) NOT NULL,
    [EmailId] VARCHAR(50) NULL,

	[CreatedDateTime] DATETIME NOT NULL,
	[CreatedBy] VARCHAR(50) NOT NULL
)
