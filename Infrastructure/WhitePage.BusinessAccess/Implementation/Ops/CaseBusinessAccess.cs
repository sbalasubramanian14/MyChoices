using System.Collections.Generic;
using System.Linq;
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

        public List<CaseHeader> GetAllCases(int pageNumber, int offset)
        {
            return this.caseDataAccess.GetAllCases().Skip((pageNumber - 1) * 10).Take(offset).ToList();
        }

        public List<CaseHeader> GetFilteredCases(int pageNumber, int offset, IDictionary<string, string> dictionary)
        {
            return
                this.caseDataAccess.GetAllCases().
                Where(
                    s => s.CaseNumber.Contains(dictionary["CaseNumber"]) &&
                    s.ClientName.Contains(dictionary["ClientName"]) &&
                    s.CaseStatus.Contains(dictionary["CaseStatus"]) &&
                    s.CenterTitle.Contains(dictionary["CenterTitle"]) &&
                    s.PeaceMaker.Contains(dictionary["PeaceMaker"]) &&
                    s.Counselor.Contains(dictionary["Counselor"]) &&
                    s.MobileNumber.Contains(dictionary["MobileNumber"])).
                Skip((pageNumber - 1) * 10).
                Take(offset).
                ToList();
        }

        public int GetCasesCount()
        {
            return this.caseDataAccess.GetCasesCount();
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

        public CaseHeader UpdateLegal(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateLegal(caseBook);
        }

        public CaseHeader UpdateCaseStatus(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateCaseStatus(caseBook);
        }
    }
}
