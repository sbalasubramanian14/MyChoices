CREATE TYPE [Ops].[CaseSpouseType] AS TABLE
(
	CaseSpouseId INT,
	CaseId INT,
	SpouseName varchar(200),
	SpouseDOB datetime,
	SpouseHomePhone varchar(200),
	SpouseMobilePhone varchar(200),
	SpouseOccupation varchar(200),
	SpouseEducationLookupId INT,
	SpouseAddress varchar(200),
	Area varchar(200),
	CityLookupId INT,
	StateLookupId INT,
	PIN varchar(20),
	
	PrimaryEmergencyContactName varchar(200),
	PrimaryEmergencyRelationshipToClientLookupId INT,
	PrimaryEmergencyContactPhoneNumber varchar(200),
	PrimaryEmergencyContactAdress varchar(200),

	SecondaryEmergencyContactName varchar(200),
	SecondaryEmergencyRelationshipToClientLookupId INT,
	SecondaryEmergencyContactPhoneNumber varchar(200),
	SecondaryEmergencyContactAdress varchar(200)
)
