using System.Collections.Generic;
using WhitePage.Entities.CaseManagement;

namespace WhitePage.BusinessAccess.Contracts.Ops
{
    public interface ICaseBusinessAccess
    {
        CaseHeader SavePrimaryCase(CaseBook caseBook);
        List<CaseHeader> GetAllCases();
    }
}
