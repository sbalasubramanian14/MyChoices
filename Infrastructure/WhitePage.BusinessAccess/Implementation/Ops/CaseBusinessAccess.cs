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

        public CaseBook GetCaseById(int caseId)
        {
            return this.caseDataAccess.GetCaseById(caseId);
        }

        public CaseHeader UpdatePrimaryInfo(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdatePrimaryInfo(caseBook);
        }
        public CaseHeader UpdateAddress(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateAddress(caseBook);
        }

        public CaseHeader UpdateChildren(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateChildren(caseBook);
        }

    }
}
