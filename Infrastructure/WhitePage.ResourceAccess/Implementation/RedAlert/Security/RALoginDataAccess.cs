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

        public ImplementingPartner ValidateImplementingPartner(string userName)
        {
            return this.unitOfWork.DbContext.ImplementingPartner.Where(IP => IP.UserName == userName).FirstOrDefault();
        }
    }
}
