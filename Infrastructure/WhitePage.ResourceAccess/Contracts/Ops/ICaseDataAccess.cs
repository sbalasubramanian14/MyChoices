using System.Collections.Generic;
using System.Linq;
using WhitePage.Entities.CaseManagement;

namespace WhitePage.ResourceAccess.Contracts.Ops
{
    public interface ICaseDataAccess
    {
        CaseHeader SavePrimaryCase(CaseBook caseBook);
        IQueryable<CaseHeader> GetAllActiveCases();
        CaseBook GetCaseById(int caseId);
        CaseHeader UpdatePrimaryInfo(CaseBook caseBook);
        CaseHeader UpdateAddress(CaseBook caseBook);
        vCaseChildren UpdateChildren(CaseBook caseBook);
        CaseHeader UpdateHouseHold(CaseBook caseBook);
        CaseHeader UpdateSpouse(CaseBook caseBook);
        CaseHeader UpdatePhysicalHealth(CaseBook caseBook);
        vCaseOffender UpdateOffender(CaseBook caseBook);
        CaseHeader UpdateAbuse(CaseBook caseBook);
        int UpdateCase(CaseBook caseBook);
        vCaseMental UpdateMental(CaseBook caseBook);
        CaseHeader UpdateSessionLog(CaseBook caseBook);
        CaseHeader UpdateFeedback(CaseBook caseBook);
        CaseHeader UpdateLegal(CaseBook caseBook);
        CaseHeader UpdateCaseStatus(CaseBook caseBook);
        bool DeleteCase(int caseId);
    }
}
