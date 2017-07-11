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

        public IQueryable<CaseHeader> GetFilteredData(int pageNumber, int offset, IDictionary<string, string> dictionary)
        {
            string caseNumberFilterString = dictionary["CaseNumber"];
            string clientNameFilterString = dictionary["ClientName"];
            string caseStatusFilterString = dictionary["CaseStatus"];
            string centerTitleFilterString = dictionary["CenterTitle"];
            string peaceMakerFilterString = dictionary["PeaceMaker"];
            string counselorFilterString = dictionary["Counselor"];
            string mobileNumberFilterString = dictionary["MobileNumber"];

            return
                this.caseDataAccess.GetAllCases().
                Where(
                    s => s.CaseNumber.Contains(caseNumberFilterString) &&
                    s.ClientName.Contains(clientNameFilterString) &&
                    s.CaseStatus.Contains(caseStatusFilterString) &&
                    s.CenterTitle.Contains(centerTitleFilterString) &&
                    s.PeaceMaker.Contains(peaceMakerFilterString) &&
                    s.Counselor.Contains(counselorFilterString) &&
                    s.MobileNumber.Contains(mobileNumberFilterString));
        }


        public List<CaseHeader> GetFilteredCases(int pageNumber, int offset, IDictionary<string, string> dictionary)
        {
            return 
                this.GetFilteredData(pageNumber, offset, dictionary).
                Skip((pageNumber - 1) * 10).
                Take(offset).
                ToList();
        }

        public int GetCasesCount()
        {
            return this.caseDataAccess.GetAllCases().Count();
        }

        public int GetFilteredCasesCount(int pageNumber, int offset, IDictionary<string, string> dictionary)
        {
            return this.GetFilteredData(pageNumber, offset, dictionary).Count();
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
