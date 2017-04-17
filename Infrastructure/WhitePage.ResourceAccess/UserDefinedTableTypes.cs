using System.Data;

namespace WhitePage.ResourceAccess
{
    public static class UserDefinedTableTypes
    {
        public static DataTable Case
        {
            get
            {
                var result = new DataTable();
                var columnCollection = new DataColumnCollection();

                columnCollection
                    .AddColumn("CaseId", DbColumnType.Int)
                    .AddColumn("CaseNumber", DbColumnType.String)
                    .AddColumn("CenterId", DbColumnType.Short)
                    .AddColumn("CaseStausId", DbColumnType.Byte)
                    .AddColumn("CounselorId", DbColumnType.Int)
                    .AddColumn("PeaceMakerId", DbColumnType.Int)
                    .AddColumn("ClientFirstName", DbColumnType.String)
                    .AddColumn("ClientLastName", DbColumnType.String)
                    .AddColumn("Mi", DbColumnType.String)
                    .AddColumn("FatherName", DbColumnType.String)
                    .AddColumn("GenderLookupId", DbColumnType.Int)
                    .AddColumn("RequireAssistanceLookupId", DbColumnType.Int)
                    .AddColumn("MaritalStatusLookupId", DbColumnType.Int)
                    .AddColumn("Remarks", DbColumnType.String)
                    .AddColumn("RegisterDate", DbColumnType.DateTime)
                    .AddColumn("MobileNumber", DbColumnType.String)
                    .AddColumn("CreatedBy", DbColumnType.Int)
                    .AddColumn("CreatedDateTime", DbColumnType.DateTime)
                    .AddColumn("ModifiedBy", DbColumnType.Int)
                    .AddColumn("ModifiedDatetime", DbColumnType.DateTime);

                foreach (var item in columnCollection) result.Columns.Add(item);

                return result;
            }
        }

        public static DataTable CaseAddress
        {
            get
            {
                var result = new DataTable();
                var columnCollection = new DataColumnCollection();

                columnCollection
                    .AddColumn("CaseAddressId", DbColumnType.Int)
                    .AddColumn("CaseId", DbColumnType.Int)
                    .AddColumn("Address", DbColumnType.String)
                    .AddColumn("Area", DbColumnType.String)
                    .AddColumn("CityId", DbColumnType.Short)
                    .AddColumn("StateId", DbColumnType.Short)
                    .AddColumn("PIN", DbColumnType.String)
                    .AddColumn("CreatedBy", DbColumnType.Int)
                    .AddColumn("CreatedDateTime", DbColumnType.DateTime)
                    .AddColumn("ModifiedBy", DbColumnType.Int)
                    .AddColumn("ModifiedDatetime", DbColumnType.DateTime)
                    ;

                foreach (var item in columnCollection) result.Columns.Add(item);

                return result;
            }
        }

        public static DataTable CaseChildren
        {
            get
            {
                var result = new DataTable();
                var columnCollection = new DataColumnCollection();

                columnCollection
                    .AddColumn("CaseChildrenId", DbColumnType.Int)
                    .AddColumn("CaseId", DbColumnType.Int)
                    .AddColumn("Name", DbColumnType.String)
                    .AddColumn("Age", DbColumnType.Byte)
                    .AddColumn("GenderLookupId", DbColumnType.Int)
                    .AddColumn("RelationshipWithAbuserLookupId", DbColumnType.Int)

                    .AddColumn("CreatedBy", DbColumnType.Int)
                    .AddColumn("CreatedDateTime", DbColumnType.DateTime)
                    .AddColumn("ModifiedBy", DbColumnType.Int)
                    .AddColumn("ModifiedDatetime", DbColumnType.DateTime)
                    ;

                foreach (var item in columnCollection) result.Columns.Add(item);

                return result;
            }
        }

        public static DataTable HouseHold
        {
            get
            {
                var result = new DataTable();
                var columnCollection = new DataColumnCollection();

                columnCollection
                    .AddColumn("CaseFamilyHouseHoldId", DbColumnType.Int)
                    .AddColumn("CaseId", DbColumnType.Int)
                    .AddColumn("ChildrenDeceasedLookupId", DbColumnType.Int)
                    .AddColumn("HouseHoldIncomeLookupId", DbColumnType.Int)
                    .AddColumn("SoughtHelpYesNoLookupId", DbColumnType.Int)
                    .AddColumn("SoughtHelpDesc", DbColumnType.String)

                    .AddColumn("SoughtHelpOutPut", DbColumnType.String)
                    .AddColumn("PeacemakerAssistanceLookupId", DbColumnType.Int)
                    .AddColumn("PeacemakerAssistanceDesc", DbColumnType.String)
                    .AddColumn("PeacemakerFollowupYesNoLookupId", DbColumnType.Int)

                    .AddColumn("ClientSignedRegistrationFormYesNoLookupId", DbColumnType.Int)
                    .AddColumn("ClientEmailId", DbColumnType.String)
                    .AddColumn("ReligionLookupId", DbColumnType.Int)
                    .AddColumn("LevelOfEducationLookupId", DbColumnType.Int)
                    .AddColumn("VocationalSkillsLookupId", DbColumnType.Int)
                    .AddColumn("OccupationLookupId", DbColumnType.Int)
                    .AddColumn("OccupationDesc", DbColumnType.String)
                    .AddColumn("ClientIncomeLookupId", DbColumnType.Int)
                    .AddColumn("HouseHoldMembersLivingLookupId", DbColumnType.Int)
                    .AddColumn("YearOfMarriage", DbColumnType.Short)
                    .AddColumn("ClientAgeAtFirstChild", DbColumnType.Byte);

                foreach (var item in columnCollection) result.Columns.Add(item);

                return result;
            }
        }

        public static DataTable Spouse
        {
            get
            {
                var result = new DataTable();
                var columnCollection = new DataColumnCollection();

                columnCollection
                    .AddColumn("CaseSpouseId", DbColumnType.Int)
                    .AddColumn("CaseId", DbColumnType.Int)
                    .AddColumn("SpouseName", DbColumnType.String)
                    .AddColumn("SpouseDOB", DbColumnType.DateTime)
                    .AddColumn("SpouseHomePhone", DbColumnType.String)
                    .AddColumn("SpouseMobilePhone", DbColumnType.String)

                    .AddColumn("SpouseEducationLookupId", DbColumnType.Int)
                    .AddColumn("SpouseAddress", DbColumnType.String)
                    .AddColumn("Area", DbColumnType.String)
                    .AddColumn("CityLookupId", DbColumnType.Int)
                    .AddColumn("StateLookupId", DbColumnType.Int)
                    .AddColumn("PIN", DbColumnType.String)

                    .AddColumn("PrimaryEmergencyContactName", DbColumnType.String)
                    .AddColumn("PrimaryEmergencyRelationshipToClientLookupId", DbColumnType.Int)
                    .AddColumn("PrimaryEmergencyContactPhoneNumber", DbColumnType.String)
                    .AddColumn("PrimaryEmergencyContactAdress", DbColumnType.String)

                    .AddColumn("SecondaryEmergencyContactName", DbColumnType.String)
                    .AddColumn("SecondaryEmergencyRelationshipToClientLookupId", DbColumnType.Int)
                    .AddColumn("SecondaryEmergencyContactPhoneNumber", DbColumnType.String)
                    .AddColumn("SecondaryEmergencyContactAdress", DbColumnType.String);

                foreach (var item in columnCollection) result.Columns.Add(item);

                return result;
            }
        }

        public static DataTable PhysicalHealth
        {
            get
            {
                var result = new DataTable();
                var columnCollection = new DataColumnCollection();

                columnCollection
                    .AddColumn("CasePhysicalHealthId", DbColumnType.Int)
                    .AddColumn("CaseId", DbColumnType.Int)
                    .AddColumn("SufferingFromAnyMajorIllnessLookupId", DbColumnType.Int)
                    .AddColumn("SufferingFromAnyMajorIllnessDesc", DbColumnType.DateTime)

                    .AddColumn("DiagnosedPsychiatricIllnessLookupId", DbColumnType.Int)
                    .AddColumn("DiagnosedPsychiatricIllnessDesc", DbColumnType.String)

                    .AddColumn("SleepPerNightLookupId", DbColumnType.Int)
                    .AddColumn("AppetiteLookupId", DbColumnType.Int)
                    .AddColumn("ExerciseLookupId", DbColumnType.Int)


                    .AddColumn("AnyMedicationLookupId", DbColumnType.Int)
                    .AddColumn("AnyMedicationDesc", DbColumnType.String)

                    .AddColumn("AnySubstanceLookupId", DbColumnType.Int)
                    .AddColumn("AnySubstanceDesc", DbColumnType.String)

                    .AddColumn("CurrentlyPregnantLookup", DbColumnType.Int)
                    .AddColumn("CurrentlyPregnantDesc", DbColumnType.String)

                    .AddColumn("ReasonForSeekingHelpLookupId", DbColumnType.Int)
                    .AddColumn("WhoIsAbusingYouLookupId", DbColumnType.Int)
                    .AddColumn("WhoIsAbusingYouDesc", DbColumnType.String);

                foreach (var item in columnCollection) result.Columns.Add(item);

                return result;
            }
        }

        public static DataTable Offender
        {
            get
            {
                var result = new DataTable();
                var columnCollection = new DataColumnCollection();

                columnCollection
                    .AddColumn("CaseOffenderId", DbColumnType.Int)
                    .AddColumn("CaseId", DbColumnType.Int)
                    .AddColumn("Name", DbColumnType.String)
                    .AddColumn("Age", DbColumnType.Short)

                    .AddColumn("GenderLookupId", DbColumnType.Int)
                    .AddColumn("RelationshipWithVictimLookupId", DbColumnType.Int);

                foreach (var item in columnCollection) result.Columns.Add(item);

                return result;
            }
        }

        public static DataTable Abuse
        {
            get
            {
                var result = new DataTable();
                var columnCollection = new DataColumnCollection();

                columnCollection
                    .AddColumn("CaseAbuseId", DbColumnType.Int)
                    .AddColumn("CaseId", DbColumnType.Int)

                    .AddColumn("SufferingFromAbuseLookupId", DbColumnType.Int)
                    .AddColumn("SufferingFromAbuseDesc", DbColumnType.String)

                    .AddColumn("FeelAboutAbuseLookupId", DbColumnType.Int)
                    .AddColumn("ParentsFeelAboutAbuseLookupId", DbColumnType.Int)
                    .AddColumn("LawFeelAboutAbuseLookupId", DbColumnType.Int)
                    .AddColumn("SignsOfPhysicalAbuseLookupId", DbColumnType.Int)
                    .AddColumn("SignsOfPhysicalAbuseDesc", DbColumnType.String)

                    .AddColumn("WeaponsUsedLookupId", DbColumnType.Int)
                    .AddColumn("WeaponsUsedDesc", DbColumnType.String)

                    .AddColumn("TypesOfPhyscialAbuseLookupId", DbColumnType.Int)
                    .AddColumn("FrequencyOfPhyscialAbuseLookupId", DbColumnType.Int)
                    .AddColumn("NumberOfYearsOfPhyscialAbuse", DbColumnType.Byte)

                    .AddColumn("TypesOfEmotionalAbuseLookupId", DbColumnType.Int)
                    .AddColumn("FrequencyOfEmotionalAbuseLookupId", DbColumnType.Int)
                    .AddColumn("NumberOfYearsOfEmotionalAbuse", DbColumnType.Byte)

                    .AddColumn("TypesOfSexualAbuseLookupId", DbColumnType.Int)
                    .AddColumn("FrequencyOfSexualAbuseLookupId", DbColumnType.Int)
                    .AddColumn("NumberOfYearsOfSexualAbuse", DbColumnType.Byte)

                    .AddColumn("TypesOfEconomicAbuseLookupId", DbColumnType.Int)
                    .AddColumn("FrequencyOfEconomicAbuseLookupId", DbColumnType.Int)
                    .AddColumn("NumberOfYearsOfEconomicAbuse", DbColumnType.Byte)

                    .AddColumn("ReasonsForAbuseLookupId", DbColumnType.Int)
                    ;

                foreach (var item in columnCollection) result.Columns.Add(item);

                return result;
            }
        }

        public static DataTable Manage
        {
            get
            {
                var result = new DataTable();
                var columnCollection = new DataColumnCollection();

                columnCollection
                    .AddColumn("CaseManageId", DbColumnType.Int)
                    .AddColumn("CaseId", DbColumnType.Int)
                    .AddColumn("CaseStatusId", DbColumnType.Byte)

                    .AddColumn("SourceOfCaseLookupId", DbColumnType.Int)
                    .AddColumn("SourceOfCaseDesc", DbColumnType.String)

                    .AddColumn("ReasonForClosureStatus", DbColumnType.String)
                    .AddColumn("CaseSubject", DbColumnType.String)
                    .AddColumn("CaseDescription", DbColumnType.String)
                    .AddColumn("RelationshipWithPMLookupId", DbColumnType.Int)

                    .AddColumn("ResolutionLog", DbColumnType.String);

                foreach (var item in columnCollection) result.Columns.Add(item);

                return result;
            }
        }

        public static DataTable Mental
        {
            get
            {
                var result = new DataTable();
                var columnCollection = new DataColumnCollection();

                columnCollection
                    .AddColumn("CaseMentalId", DbColumnType.Int)
                    .AddColumn("CaseId", DbColumnType.Int)

                    .AddColumn("MentalDressLookupId", DbColumnType.Int)
                    .AddColumn("MentalHygieneLookupId", DbColumnType.Int)
                    .AddColumn("MentalBodyTypeLookupId", DbColumnType.Int)
                    .AddColumn("MentalExpressionLookupId", DbColumnType.Int)
                    .AddColumn("MentalMotorActivityLookupId", DbColumnType.Int)
                    .AddColumn("MentalVocabularyLookupId", DbColumnType.Int)
                    .AddColumn("MentalImpulseControlLookupId", DbColumnType.Int)
                    .AddColumn("MentalSpeechLookupId", DbColumnType.Int)
                    .AddColumn("MentalBehaviourLookupId", DbColumnType.Int)
                    .AddColumn("MentalContentLookupId", DbColumnType.Int)
                    .AddColumn("MentalFlowOfThoughtLookupId", DbColumnType.Int)
                    .AddColumn("MentalOrientationLookupId", DbColumnType.Int)
                    .AddColumn("MentalEstimatedIntellectLookupId", DbColumnType.Int)
                    .AddColumn("MentalAttentionLookupId", DbColumnType.Int)
                    .AddColumn("MentalInsightLookupId", DbColumnType.Int)
                    .AddColumn("MentalJudgementLookupId", DbColumnType.Int)
                    .AddColumn("MentalMemoryLookupId", DbColumnType.Int)
                    .AddColumn("MentalInformationLookupId", DbColumnType.Int)
                    .AddColumn("MentalAbstractionLookupId", DbColumnType.Int);

                foreach (var item in columnCollection) result.Columns.Add(item);

                return result;
            }
        }

        public static DataTable SessionLog
        {
            get
            {
                var result = new DataTable();
                var columnCollection = new DataColumnCollection();

                columnCollection
                    .AddColumn("CaseSessionLogId", DbColumnType.Int)
                    .AddColumn("CaseId", DbColumnType.Int)

                    .AddColumn("CounselingDate", DbColumnType.DateTime)
                    .AddColumn("TypeOfCounselingLookupId", DbColumnType.Int)
                    .AddColumn("TypeOfCounselingDesc", DbColumnType.String)

                    .AddColumn("DurationOfSessionMIn", DbColumnType.Short)
                    .AddColumn("NextSessionScheduled", DbColumnType.DateTime)
                    .AddColumn("SessionNotes", DbColumnType.String);

                foreach (var item in columnCollection) result.Columns.Add(item);

                return result;
            }
        }

        public static DataTable Feedback
        {
            get
            {
                var result = new DataTable();
                var columnCollection = new DataColumnCollection();

                columnCollection
                    .AddColumn("CaseFeedbackId", DbColumnType.Int)
                    .AddColumn("CaseId", DbColumnType.Int)

                    .AddColumn("RespectedDuringYourVisitLookupId", DbColumnType.Int)
                    .AddColumn("FeelSafeAndSecureLookupId", DbColumnType.Int)

                    .AddColumn("FeelThatCounsellingLookupId", DbColumnType.Int)
                    .AddColumn("AssistanceOfPeacemakerLookupId", DbColumnType.Int)

                    .AddColumn("RecommendFreeCounsellingLookupId", DbColumnType.Int)
                    .AddColumn("AbleToImproveLookupId", DbColumnType.Int)

                    .AddColumn("OPMTeamToFollowupLookupId", DbColumnType.Int)                    

                    .AddColumn("AnySuggestions", DbColumnType.String);

                foreach (var item in columnCollection) result.Columns.Add(item);

                return result;
            }
        }

        public static DataTable Legal
        {
            get
            {
                var result = new DataTable();
                var columnCollection = new DataColumnCollection();

                columnCollection
                    .AddColumn("CaseLegalId", DbColumnType.Int)
                    .AddColumn("CaseId", DbColumnType.Int)

                    .AddColumn("CaseNumber", DbColumnType.String)
                    .AddColumn("Court", DbColumnType.String)

                    .AddColumn("Prayer", DbColumnType.String)
                    .AddColumn("LegalRepresentative", DbColumnType.String)

                    .AddColumn("LegalConsentFormLookupId", DbColumnType.Int)
                    .AddColumn("LegalActionLookupId", DbColumnType.Int)

                    .AddColumn("OutcomeLookupId", DbColumnType.Int)
                    .AddColumn("DocumentsLookupId", DbColumnType.Int);

                foreach (var item in columnCollection) result.Columns.Add(item);

                return result;
            }
        }
    }
}
