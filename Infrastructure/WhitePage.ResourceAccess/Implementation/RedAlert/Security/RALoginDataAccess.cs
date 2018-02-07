using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
            return this.unitOfWork.DbContext.ImplementingPartner.Find(userName);            
        }
    }
}
