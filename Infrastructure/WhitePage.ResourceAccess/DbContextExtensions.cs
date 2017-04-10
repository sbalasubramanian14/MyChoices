using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace WhitePage.ResourceAccess
{
    public static class DbContextExtensions
    {
        /// <summary>
        /// Execute stored procedure which returns result set
        /// </summary>
        /// <typeparam name="T">Result Type</typeparam>
        /// <param name="procedureName">Stored procedure name</param>
        /// <param name="parms">SQL parameters</param>
        /// <returns></returns>
        public static IList<T> ExecuteStoredProcedure<T>(this DbContext db, string procedureName, List<SqlParameter> parms)
        {
            var result = default(IList<T>);

            var sqlQuery = new StringBuilder(string.Format("EXECUTE {0} ", procedureName));
            var parmArray = default(SqlParameter[]);

            if (parms != null && parms.Count > 0)
            {
                for (int i = 0; i < parms.ToArray().Length; i++)
                {
                    sqlQuery.Append(string.Format("{0} {1},", parms[i].ParameterName, parms[i].Direction == ParameterDirection.Input ? string.Empty : "out"));
                }
                sqlQuery = sqlQuery.Remove(sqlQuery.Length - 1, 1);
            }

            if (parms == null || parms.Count == 0)
            {
                result = db.Database.SqlQuery<T>(sqlQuery.ToString()).ToList();
            }
            else
            {
                parmArray = parms.ToArray();
                result = db.Database.SqlQuery<T>(sqlQuery.ToString(), parmArray).ToList();
            }

            if (null != parmArray) parms = parmArray.ToList();

            return result;
        }

        /// <summary>
        /// Execute stored procedure which doesn't return any result set
        /// </summary>
        /// <param name="procedureName">Stored procedure name</param>
        /// <param name="parms">SQL parameters</param>
        /// <returns></returns>
        public static int ExecuteStoredProcedure(this DbContext db, string procedureName, List<SqlParameter> parms)
        {
            var result = default(int);

            var parmArray = default(SqlParameter[]);
            var sqlQuery = new StringBuilder(string.Format("EXECUTE {0} ", procedureName));
            if (parms != null && parms.Count > 0)
            {
                for (int i = 0; i < parms.ToArray().Length; i++)
                {
                    sqlQuery.Append(string.Format("{0} {1},", parms[i].ParameterName, parms[i].Direction == ParameterDirection.Input ? string.Empty : "out"));
                }
                sqlQuery = sqlQuery.Remove(sqlQuery.Length - 1, 1);
            }

            if (parms == null || parms.Count == 0)
            {
                result = db.Database.ExecuteSqlCommand(sqlQuery.ToString(), null);
            }
            else
            {
                parmArray = parms.ToArray();
                result = db.Database.ExecuteSqlCommand(sqlQuery.ToString(), parmArray);
            }

            if (null != parmArray) parms = parmArray.ToList();

            return result;
        }

        /// <summary>
        /// Returns data table from the given query
        /// </summary>
        /// <param name="db">Db Context</param>
        /// <param name="query">SQL Server</param>
        /// <returns></returns>
        public static DataTable ExecuteQuery(this DbContext db, string query)
        {
            var resultSet = new DataSet();

            using (var conn = new SqlConnection(db.Database.Connection.ConnectionString))
            {
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = query;
                    cmd.CommandType = CommandType.Text;

                    using (var adapter = new SqlDataAdapter(cmd))
                    {
                        adapter.Fill(resultSet);
                    }
                }
            }

            return resultSet.Tables[0];
        }

    }
}
