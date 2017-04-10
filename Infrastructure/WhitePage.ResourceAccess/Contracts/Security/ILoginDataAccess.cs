using System.Collections.Generic;
using WhitePage.Entities.Security;

namespace WhitePage.ResourceAccess.Contracts.Security
{
    public interface ILoginDataAccess
    {
        List<Claim> ValidateUser(string userName, string password, string ipAddress);
    }
}
