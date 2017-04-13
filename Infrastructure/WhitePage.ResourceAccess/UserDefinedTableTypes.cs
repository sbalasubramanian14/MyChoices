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


    }
}
