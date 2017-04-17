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

        public CaseHeader UpdateHouseHold(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateHouseHold(caseBook);
        }

        public CaseHeader UpdateSpouse(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateSpouse(caseBook);
        }

        public CaseHeader UpdatePhysicalHealth(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdatePhysicalHealth(caseBook);
        }

        public CaseHeader UpdateOffender(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateOffender(caseBook);
        }

        public CaseHeader UpdateAbuse(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateAbuse(caseBook);
        }

        public CaseHeader UpdateCase(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateCase(caseBook);
        }

        public CaseHeader UpdateMental(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateMental(caseBook);
        }

        public CaseHeader UpdateSessionLog(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateSessionLog(caseBook);
        }

        public CaseHeader UpdateFeedback(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateFeedback(caseBook);
        }
    }
}
