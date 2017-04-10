using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WhitePage.Entities.Security;

namespace WhitePage.BusinessAccess.Contracts.Security
{
    public interface ILoginBusinessAccess
    {
        List<Claim> ValidateUser(string userName, string password, string ipAddress);
    }
}
