CREATE PROCEDURE [Ops].[saveHouseHold]
	@caseHouseHoldType as [Ops].[CaseHouseHoldType] readonly
AS
BEGIn

	MERGE Ops.trCaseFamilyHouseHold T
	USING @caseHouseHoldType S ON T.CaseFamilyHouseHoldId = S.CaseFamilyHouseHoldId AND T.CaseId = S.CaseId
	WHEN NOT MATCHED THEN
		INSERT (CaseId, ChildrenDeceasedLookupId, HouseHoldIncomeLookupId, SoughtHelpYesNoLookupId,SoughtHelpDesc, SoughtHelpOutPut, PeacemakerAssistanceLookupId, PeacemakerAssistanceDesc,
			PeacemakerFollowupYesNoLookupId, ClientSignedRegistrationFormYesNoLookupId, ClientEmailId, ReligionLookupId, LevelOfEducationLookupId, VocationalSkillsLookupId, VocationalSkillsDesc,
			OccupationLookupId, OccupationDesc, ClientIncomeLookupId, HouseHoldMembersLivingLookupId, YearsOfMarriage, ClientAgeAtFirstChild)
		VALUES (S.CaseId, S.ChildrenDeceasedLookupId, S.HouseHoldIncomeLookupId, S.SoughtHelpYesNoLookupId, S.SoughtHelpDesc, S.SoughtHelpOutPut, S.PeacemakerAssistanceLookupId, S.PeacemakerAssistanceDesc,
			S.PeacemakerFollowupYesNoLookupId, S.ClientSignedRegistrationFormYesNoLookupId, S.ClientEmailId, S.ReligionLookupId, S.LevelOfEducationLookupId, S.VocationalSkillsLookupId, S.VocationalSkillsDesc,
			S.OccupationLookupId, S.OccupationDesc, S.ClientIncomeLookupId, S.HouseHoldMembersLivingLookupId, S.YearsOfMarriage, S.ClientAgeAtFirstChild)
	WHEN MATCHED THEN 
		UPDATE 
		SET 			
			T.ChildrenDeceasedLookupId = S.ChildrenDeceasedLookupId
			,T.HouseHoldIncomeLookupId = S.HouseHoldIncomeLookupId
			,T.SoughtHelpYesNoLookupId = S.SoughtHelpYesNoLookupId
			,T.SoughtHelpDesc = S.SoughtHelpDesc
			,T.SoughtHelpOutPut = S.SoughtHelpOutPut
			,T.PeacemakerAssistanceLookupId = S.PeacemakerAssistanceLookupId
			,T.PeacemakerAssistanceDesc = S.PeacemakerAssistanceDesc
			,T.PeacemakerFollowupYesNoLookupId = S.PeacemakerFollowupYesNoLookupId
			,T.ClientSignedRegistrationFormYesNoLookupId = S.ClientSignedRegistrationFormYesNoLookupId
			,T.ClientEmailId = S.ClientEmailId
			,T.ReligionLookupId = S.ReligionLookupId
			,T.LevelOfEducationLookupId = S.LevelOfEducationLookupId
			,T.VocationalSkillsLookupId = S.VocationalSkillsLookupId
			,T.VocationalSkillsDesc = S.VocationalSkillsDesc
			,T.OccupationLookupId = S.OccupationLookupId
			,T.OccupationDesc = S.OccupationDesc
			,T.ClientIncomeLookupId = S.ClientIncomeLookupId
			,T.HouseHoldMembersLivingLookupId = S.HouseHoldMembersLivingLookupId
			,T.YearsOfMarriage = S.YearsOfMarriage
			,T.ClientAgeAtFirstChild = S.ClientAgeAtFirstChild;

	declare @CaseId INT;
	select @CaseId = CaseId from @caseHouseHoldType;
	select * from [Ops].[vCaseHeader] where CaseId = @CaseId;
END
	