CREATE PROCEDURE [Ops].[savePhysicalHealth]
	@casePhysicalHealthType as [Ops].[CasePhysicalHealthType] readonly
AS
BEGIN

	MERGE Ops.trCasePhysicalHealth T
	USING @casePhysicalHealthType S ON T.CasePhysicalHealthId = S.CasePhysicalHealthId AND T.CaseId = S.CaseId
	WHEN NOT MATCHED THEN
		INSERT (CaseId, SufferingFromAnyMajorIllnessLookupId, SufferingFromAnyMajorIllnessDesc, DiagnosedPsychiatricIllnessLookupId, DiagnosedPsychiatricIllnessDesc, SleepPerNightLookupId, AppetiteLookupId,
				ExerciseLookupId, AnyMedicationLookupId, AnyMedicationDesc, AnySubstanceLookupId, AnySubstanceDesc, CurrentlyPregnantLookup, CurrentlyPregnantDesc, ReasonForSeekingHelpLookupId,
				WhoIsAbusingYouLookupId, WhoIsAbusingYouDesc)
		VALUES (S.CaseId, S.SufferingFromAnyMajorIllnessLookupId, S.SufferingFromAnyMajorIllnessDesc, S.DiagnosedPsychiatricIllnessLookupId, S.DiagnosedPsychiatricIllnessDesc, S.SleepPerNightLookupId, S.AppetiteLookupId,
				S.ExerciseLookupId, S.AnyMedicationLookupId, S.AnyMedicationDesc, S.AnySubstanceLookupId, S.AnySubstanceDesc, S.CurrentlyPregnantLookup, S.CurrentlyPregnantDesc, S.ReasonForSeekingHelpLookupId,
				S.WhoIsAbusingYouLookupId, S.WhoIsAbusingYouDesc)
	WHEN MATCHED THEN 
		UPDATE 
		SET 			
			T.SufferingFromAnyMajorIllnessLookupId = S.SufferingFromAnyMajorIllnessLookupId
			,T.SufferingFromAnyMajorIllnessDesc = S.SufferingFromAnyMajorIllnessDesc
			,T.DiagnosedPsychiatricIllnessLookupId = S.DiagnosedPsychiatricIllnessLookupId
			,T.DiagnosedPsychiatricIllnessDesc = S.DiagnosedPsychiatricIllnessDesc
			,T.SleepPerNightLookupId = S.SleepPerNightLookupId
			,T.AppetiteLookupId = S.AppetiteLookupId
			,T.ExerciseLookupId = S.ExerciseLookupId
			,T.AnyMedicationLookupId = S.AnyMedicationLookupId
			,T.AnyMedicationDesc = S.AnyMedicationDesc
			,T.AnySubstanceLookupId = S.AnySubstanceLookupId
			,T.AnySubstanceDesc = S.AnySubstanceDesc
			,T.CurrentlyPregnantLookup = S.CurrentlyPregnantLookup
			,T.CurrentlyPregnantDesc = S.CurrentlyPregnantDesc
			,T.ReasonForSeekingHelpLookupId = S.ReasonForSeekingHelpLookupId
			,T.WhoIsAbusingYouLookupId = S.WhoIsAbusingYouLookupId
			,T.WhoIsAbusingYouDesc = S.WhoIsAbusingYouDesc;

declare @CaseId INT;
	select @CaseId = CaseId from @casePhysicalHealthType;
	select * from [Ops].[vCaseHeader] where CaseId = @CaseId;
END
	