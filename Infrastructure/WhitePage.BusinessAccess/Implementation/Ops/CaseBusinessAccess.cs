using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

        Func<IQueryable<CaseHeader>, int, int, List<CaseHeader>> returnCasesList = 
            (cases, pageNumber, offset) => cases.Skip((pageNumber - 1) * 10).Take(offset).ToList();

        Func<IQueryable<CaseHeader>, string, IEnumerable<CaseHeader>> returnDateSearchList =
            (cases, searchString) => cases.ToList().Where(s => s.RegisterDateString.ToUpper().Contains(searchString.ToUpper()));

        public List<CaseHeader> GetAllActiveCases(int pageNumber, int offset)
        {
            return returnCasesList(this.caseDataAccess.GetAllActiveCases(), pageNumber, offset);
        }

        public int GetCasesCount()
        {
            return this.caseDataAccess.GetAllActiveCases().Count();
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
                this.caseDataAccess.GetAllActiveCases().
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
                returnDateSearchList(this.GetFilteredData(pageNumber, offset, dictionary), dictionary["RegisterDateString"]).
                Skip((pageNumber - 1) * 10).
                Take(offset).
                ToList();
        }        

        public int GetFilteredCasesCount(int pageNumber, int offset, IDictionary<string, string> dictionary)
        {
            return returnDateSearchList(this.GetFilteredData(pageNumber, offset, dictionary), dictionary["RegisterDateString"]).Count();
        }

        public Expression<Func<CaseHeader, string>> returnObjectExpression(string field)
        {
            var itemParam = Expression.Parameter(typeof(CaseHeader), "ch");
            var entityAccess = Expression.MakeMemberAccess(itemParam, typeof(CaseHeader).GetMember(field).First());
            var lambda = Expression.Lambda<Func<CaseHeader, string>>(entityAccess, itemParam);

            return lambda;
        }

        public List<CaseHeader> GetSortedCasesDataAsc(int pageNumber, int offset, IDictionary<string, string> dictionary, string field)
        {
            if (field == "RegisterDateString")
            {
                return
                    returnDateSearchList(GetFilteredData(pageNumber, offset, dictionary).OrderBy(s => s.RegisterDate), dictionary["RegisterDateString"]).
                    Skip((pageNumber - 1) * 10).
                    Take(offset).
                    ToList();
            }

            return
                GetFilteredData(pageNumber, offset, dictionary).OrderBy(returnObjectExpression(field)).Skip((pageNumber - 1) * 10).Take(offset).ToList();
        }

        public List<CaseHeader> GetSortedCasesDataDesc(int pageNumber, int offset, IDictionary<string, string> dictionary, string field)
        {
            if (field == "RegisterDateString")
            {
                return GetFilteredCases(pageNumber, offset, dictionary);
            }

            return
                returnCasesList(GetFilteredData(pageNumber, offset, dictionary).OrderByDescending(returnObjectExpression(field)), pageNumber, offset);
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

        public vCaseChildren UpdateChildren(CaseBook caseBook)
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

        public vCaseOffender UpdateOffender(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateOffender(caseBook);
        }

        public CaseHeader UpdateAbuse(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateAbuse(caseBook);
        }

        public int UpdateCaseManagement(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateCaseManagement(caseBook);
        }

        public vCaseMental UpdateMental(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateMental(caseBook);
        }

        public vCaseSessionLog UpdateSessionLog(CaseBook caseBook)
        {
            return this.caseDataAccess.UpdateSessionLog(caseBook);
        }

        public vCaseFeedback UpdateFeedback(CaseBook caseBook)
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
        public bool DeleteCase(int caseId)
        {
            return this.caseDataAccess.DeleteCase(caseId);
        }
    }
}
