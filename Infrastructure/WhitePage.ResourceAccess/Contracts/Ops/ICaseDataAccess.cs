using System.Collections.Generic;
using WhitePage.Entities.CaseManagement;

namespace WhitePage.ResourceAccess.Contracts.Ops
{
    public interface ICaseDataAccess
    {
        CaseHeader SavePrimaryCase(CaseBook caseBook);
        List<CaseHeader> GetAllCases();
        CaseBook GetCaseById(int caseId);
        CaseHeader UpdatePrimaryInfo(CaseBook caseBook);
        CaseHeader UpdateAddress(CaseBook caseBook);
        CaseHeader UpdateChildren(CaseBook caseBook);
        CaseHeader UpdateHouseHold(CaseBook caseBook);
        CaseHeader UpdateSpouse(CaseBook caseBook);
        CaseHeader UpdatePhysicalHealth(CaseBook caseBook);
        CaseHeader UpdateOffender(CaseBook caseBook);
    }
}
