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


    }
}
