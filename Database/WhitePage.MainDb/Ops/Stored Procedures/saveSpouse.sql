CREATE PROCEDURE [Ops].[saveSpouse]
	@caseSpouseType as [Ops].[CaseSpouseType] readonly
AS
BEGIN

	MERGE Ops.trCaseSpouse T
	USING @caseSpouseType S ON T.CaseSpouseId = S.CaseSpouseId AND T.CaseId = S.CaseId
	WHEN NOT MATCHED THEN
		INSERT (CaseId, SpouseName, SpouseDOB, SpouseHomePhone, SpouseMobilePhone, SpouseOccupation, SpouseEducationLookupId, SpouseAddress, Area, CityLookupId, StateLookupId, PIN,
				PrimaryEmergencyContactName, PrimaryEmergencyRelationshipToClientLookupId, PrimaryEmergencyContactPhoneNumber, PrimaryEmergencyContactAdress, SecondaryEmergencyContactName, SecondaryEmergencyRelationshipToClientLookupId,
				SecondaryEmergencyContactPhoneNumber, SecondaryEmergencyContactAdress)
		VALUES (S.CaseId, S.SpouseName, S.SpouseDOB, S.SpouseHomePhone, S.SpouseMobilePhone, S.SpouseOccupation, S.SpouseEducationLookupId, S.SpouseAddress, S.Area, S.CityLookupId, S.StateLookupId, S.PIN,
				S.PrimaryEmergencyContactName, S.PrimaryEmergencyRelationshipToClientLookupId, S.PrimaryEmergencyContactPhoneNumber, S.PrimaryEmergencyContactAdress, S.SecondaryEmergencyContactName, S.SecondaryEmergencyRelationshipToClientLookupId,
				S.SecondaryEmergencyContactPhoneNumber, S.SecondaryEmergencyContactAdress)
	WHEN MATCHED THEN 
		UPDATE 
		SET 			
			T.SpouseName = S.SpouseName
			,T.SpouseDOB = S.SpouseDOB
			,T.SpouseHomePhone = S.SpouseHomePhone
			,T.SpouseMobilePhone = S.SpouseMobilePhone
			,T.SpouseOccupation = S.SpouseOccupation
			,T.SpouseEducationLookupId = S.SpouseEducationLookupId
			,T.SpouseAddress = S.SpouseAddress
			,T.Area = S.Area
			,T.CityLookupId = S.CityLookupId
			,T.StateLookupId = S.StateLookupId
			,T.PIN = S.PIN
			,T.PrimaryEmergencyContactName = S.PrimaryEmergencyContactName
			,T.PrimaryEmergencyRelationshipToClientLookupId = S.PrimaryEmergencyRelationshipToClientLookupId
			,T.PrimaryEmergencyContactPhoneNumber = S.PrimaryEmergencyContactPhoneNumber
			,T.PrimaryEmergencyContactAdress = S.PrimaryEmergencyContactAdress
			,T.SecondaryEmergencyContactName = S.SecondaryEmergencyContactName
			,T.SecondaryEmergencyRelationshipToClientLookupId = S.SecondaryEmergencyRelationshipToClientLookupId
			,T.SecondaryEmergencyContactPhoneNumber = S.SecondaryEmergencyContactPhoneNumber
			,T.SecondaryEmergencyContactAdress = S.SecondaryEmergencyContactAdress;

declare @CaseId INT;
	select @CaseId = CaseId from @caseSpouseType;
	select * from [Ops].[vCaseHeader] where CaseId = @CaseId;
END
	