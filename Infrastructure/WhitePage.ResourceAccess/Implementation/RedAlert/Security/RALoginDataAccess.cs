using System.Linq;
using WhitePage.Entities.RedAlert;
using WhitePage.ResourceAccess.Contracts.RedAlert.Security;

namespace WhitePage.ResourceAccess.Implementation.RedAlert.Security
{
    public class RALoginDataAccess : DataAccess, IRALoginDataAccess
    {
        public RALoginDataAccess(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public RedAlertUser ValidateUser(string userName)
        {
            return this.unitOfWork.DbContext.RedAlertUser.Where(User => User.UserName == userName).FirstOrDefault();
        }
    }
}
