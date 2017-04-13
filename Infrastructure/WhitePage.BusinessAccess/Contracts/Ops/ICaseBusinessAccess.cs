using System.Collections.Generic;
using WhitePage.Entities.CaseManagement;

namespace WhitePage.BusinessAccess.Contracts.Ops
{
    public interface ICaseBusinessAccess
    {
        CaseHeader SavePrimaryCase(CaseBook caseBook);
        CaseHeader UpdatePrimaryInfo(CaseBook caseBook);
        CaseHeader UpdateAddress(CaseBook caseBook);
        CaseHeader UpdateChildren(CaseBook caseBook);
        
        List<CaseHeader> GetAllCases();
        CaseBook GetCaseById(int caseId);
        CaseHeader UpdateHouseHold(CaseBook caseBook);
    }
}
