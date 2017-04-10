using System.Collections.Generic;
using WhitePage.BusinessAccess.Contracts.Ops;
using WhitePage.Entities.CaseManagement;
using WhitePage.ResourceAccess.Contracts.Ops;

namespace WhitePage.BusinessAccess.Implementation.Ops
{
    public class CaseBusinessAccess : ICaseBusinessAccess
    {
        private ICaseDataAccess caseDataAccess;

        public CaseBusinessAccess(ICaseDataAccess caseDataAccess)
        {
            this.caseDataAccess = caseDataAccess;
        }

        public List<CaseHeader> GetAllCases()
        {
            return this.caseDataAccess.GetAllCases();
        }

        public CaseHeader SavePrimaryCase(CaseBook caseBook)
        {
            return this.caseDataAccess.SavePrimaryCase(caseBook);
        }
    }
}
