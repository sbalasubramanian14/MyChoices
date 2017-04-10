using System.Collections.Generic;
using System.Data;
using System.Linq;
using WhitePage.Entities.Security;
using WhitePage.ResourceAccess.Contracts.Security;

namespace WhitePage.ResourceAccess.Implementation.Security
{
    public sealed class LoginDataAccess : DataAccess, ILoginDataAccess
    {
        public LoginDataAccess(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {

        }

        public List<Claim> ValidateUser(string userName, string password, string ipAddress)
        {
            var parmsCollection = new ParmsCollection();
            return this.unitOfWork.DbContext.ExecuteStoredProcedure<Claim>("[Auth].[validateUserCredentials]",
                parmsCollection
                    .AddParm("@userName", SqlDbType.VarChar, userName)
                    .AddParm("@password", SqlDbType.VarChar, password)
                    .AddParm("@ipAddress", SqlDbType.VarChar, ipAddress)
                ).ToList();
        }
    }
}
