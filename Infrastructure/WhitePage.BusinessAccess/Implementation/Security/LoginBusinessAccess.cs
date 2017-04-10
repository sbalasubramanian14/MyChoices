using System.Collections.Generic;
using WhitePage.BusinessAccess.Contracts.Security;
using WhitePage.Entities.Security;
using WhitePage.ResourceAccess.Contracts.Security;
using WhitePage.Utilities.Security;

namespace WhitePage.BusinessAccess.Implementation.Security
{
    public class LoginBusinessAccess : ILoginBusinessAccess
    {
        private ILoginDataAccess loginDataAccess;

        public LoginBusinessAccess(ILoginDataAccess loginDataAccess)
        {
            this.loginDataAccess = loginDataAccess;
        }        

        public List<Claim> ValidateUser(string userName, string password, string ipAddress)
        {
            return this.loginDataAccess.ValidateUser(userName, EncryptionManager.Encrypt(password), ipAddress);
        }
    }
}
