using WhitePage.BusinessAccess.Contracts.Ops;
using WhitePage.Entities.RedAlert;
using WhitePage.ResourceAccess.Contracts.RedAlert.Security;

namespace WhitePage.BusinessAccess.Implementation.RedAlert.Security
{
    public class RALoginBusinessAccess : IRALoginBusinessAccess
    {
        private IRALoginDataAccess raLoginDataAccess;

        public RALoginBusinessAccess(IRALoginDataAccess raLoginDataAccess)
        {
            this.raLoginDataAccess = raLoginDataAccess;
        }

        public RedAlertUser ValidateUser(string userName)
        {
            return this.raLoginDataAccess.ValidateUser(userName);
        }
    }
}
