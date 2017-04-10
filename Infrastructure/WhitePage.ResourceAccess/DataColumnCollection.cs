using System;
using System.Collections.Generic;
using System.Data;

namespace WhitePage.ResourceAccess
{
    public class DataColumnCollection : List<DataColumn>
    {
        public DataColumnCollection AddColumn(string columnName, DbColumnType dataType)
        {
            var parmeter = default(DataColumn);
            switch (dataType)
            {
                case DbColumnType.Int:
                    parmeter = new DataColumn(columnName, typeof(int));
                    break;
                case DbColumnType.Short:
                    parmeter = new DataColumn(columnName, typeof(short));
                    break;
                case DbColumnType.Byte:
                    parmeter = new DataColumn(columnName, typeof(byte));
                    break;
                case DbColumnType.Decimal:
                    parmeter = new DataColumn(columnName, typeof(decimal));
                    break;
                case DbColumnType.String:
                    parmeter = new DataColumn(columnName, typeof(string));
                    break;
                case DbColumnType.Bool:
                    parmeter = new DataColumn(columnName, typeof(bool));
                    break;
                case DbColumnType.DateTime:
                    parmeter = new DataColumn(columnName, typeof(DateTime));
                    break;
                default:
                    break;
            }
            this.Add(parmeter);
            return this;
        }
    }

    public enum DbColumnType
    {
        Int,
        Short,
        Byte,
        Decimal,
        String,
        Bool,
        DateTime
    }
}
