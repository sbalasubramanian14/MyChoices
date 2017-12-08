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
        vCaseAddress UpdateAddress(CaseBook caseBook);
        vCaseChildren UpdateChildren(CaseBook caseBook);
        int UpdateHouseHold(CaseBook caseBook);
        int UpdateSpouse(CaseBook caseBook);
        int UpdatePhysicalHealth(CaseBook caseBook);
        vCaseOffender UpdateOffender(CaseBook caseBook);
        int UpdateAbuse(CaseBook caseBook);
        int UpdateCaseManagement(CaseBook caseBook);
        vCaseMental UpdateMental(CaseBook caseBook);
        vCaseSessionLog UpdateSessionLog(CaseBook caseBook);
        vCaseFeedback UpdateFeedback(CaseBook caseBook);
        CaseHeader UpdateLegal(CaseBook caseBook);
        bool DeleteCase(int caseId);
    }
}
