CREATE PROCEDURE [Ops].[saveAbuse]
	@caseAbuseType as [Ops].[CaseAbuseType] readonly
AS
BEGIN

	MERGE Ops.trCaseAbuse T
	USING @caseAbuseType S ON T.CaseAbuseId = S.CaseAbuseId AND T.CaseId = S.CaseId
	WHEN NOT MATCHED THEN
		INSERT (CaseId, SufferingFromAbuseLookupId, SufferingFromAbuseDesc, FeelAboutAbuseLookupId, ParentsFeelAboutAbuseLookupId, LawFeelAboutAbuseLookupId, SignsOfPhysicalAbuseLookupId, SignsOfPhysicalAbuseDesc,
				WeaponsUsedLookupId, WeaponsUsedDesc, TypesOfPhyscialAbuseLookupId, FrequencyOfPhyscialAbuseLookupId, NumberOfYearsOfPhyscialAbuse, TypesOfEmotionalAbuseLookupId, FrequencyOfEmotionalAbuseLookupId,
				NumberOfYearsOfEmotionalAbuse, TypesOfSexualAbuseLookupId, FrequencyOfSexualAbuseLookupId, NumberOfYearsOfSexualAbuse, TypesOfEconomicAbuseLookupId, FrequencyOfEconomicAbuseLookupId, NumberOfYearsOfEconomicAbuse,
				ReasonsForAbuseLookupId, ReasonForAbuseDesc)
		VALUES (S.CaseId, S.SufferingFromAbuseLookupId, S.SufferingFromAbuseDesc, S.FeelAboutAbuseLookupId, S.ParentsFeelAboutAbuseLookupId, S.LawFeelAboutAbuseLookupId, S.SignsOfPhysicalAbuseLookupId, S.SignsOfPhysicalAbuseDesc,
				S.WeaponsUsedLookupId, S.WeaponsUsedDesc, S.TypesOfPhyscialAbuseLookupId, S.FrequencyOfPhyscialAbuseLookupId, S.NumberOfYearsOfPhyscialAbuse, S.TypesOfEmotionalAbuseLookupId, S.FrequencyOfEmotionalAbuseLookupId,
				S.NumberOfYearsOfEmotionalAbuse, S.TypesOfSexualAbuseLookupId, S.FrequencyOfSexualAbuseLookupId, S.NumberOfYearsOfSexualAbuse, S.TypesOfEconomicAbuseLookupId, S.FrequencyOfEconomicAbuseLookupId, S.NumberOfYearsOfEconomicAbuse,
				S.ReasonsForAbuseLookupId, S.ReasonForAbuseDesc)
	WHEN MATCHED THEN 
		UPDATE 
		SET 			
			T.SufferingFromAbuseLookupId = S.SufferingFromAbuseLookupId
			,T.SufferingFromAbuseDesc = S.SufferingFromAbuseDesc
			,T.FeelAboutAbuseLookupId = S.FeelAboutAbuseLookupId
			,T.ParentsFeelAboutAbuseLookupId = S.ParentsFeelAboutAbuseLookupId
			,T.LawFeelAboutAbuseLookupId = S.LawFeelAboutAbuseLookupId
			,T.SignsOfPhysicalAbuseLookupId = S.SignsOfPhysicalAbuseLookupId
			,T.SignsOfPhysicalAbuseDesc = S.SignsOfPhysicalAbuseDesc
			,T.WeaponsUsedLookupId = S.WeaponsUsedLookupId
			,T.WeaponsUsedDesc = S.WeaponsUsedDesc
			,T.TypesOfPhyscialAbuseLookupId = S.TypesOfPhyscialAbuseLookupId
			,T.FrequencyOfPhyscialAbuseLookupId = S.FrequencyOfPhyscialAbuseLookupId
			,T.NumberOfYearsOfPhyscialAbuse = S.NumberOfYearsOfPhyscialAbuse
			,T.TypesOfEmotionalAbuseLookupId = S.TypesOfEmotionalAbuseLookupId
			,T.FrequencyOfEmotionalAbuseLookupId = S.FrequencyOfEmotionalAbuseLookupId
			,T.NumberOfYearsOfEmotionalAbuse = S.NumberOfYearsOfEmotionalAbuse
			,T.TypesOfSexualAbuseLookupId = S.TypesOfSexualAbuseLookupId
			,T.FrequencyOfSexualAbuseLookupId = S.FrequencyOfSexualAbuseLookupId
			,T.NumberOfYearsOfSexualAbuse = S.NumberOfYearsOfSexualAbuse
			,T.TypesOfEconomicAbuseLookupId = S.TypesOfEconomicAbuseLookupId
			,T.FrequencyOfEconomicAbuseLookupId = S.FrequencyOfEconomicAbuseLookupId
			,T.NumberOfYearsOfEconomicAbuse = S.NumberOfYearsOfEconomicAbuse
			,T.ReasonsForAbuseLookupId = S.ReasonsForAbuseLookupId
			,T.ReasonForAbuseDesc = S.ReasonForAbuseDesc;

declare @CaseId INT;
	select @CaseId = CaseId from @caseAbuseType;
	select * from [Ops].[vCaseHeader] where CaseId = @CaseId;
END
	