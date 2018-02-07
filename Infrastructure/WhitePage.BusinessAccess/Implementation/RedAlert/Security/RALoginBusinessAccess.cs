using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        public ImplementingPartner ValidateImplementingPartner(string userName)
        {
            return this.raLoginDataAccess.ValidateImplementingPartner(userName);
        }
    }
}
