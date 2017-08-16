﻿using System.Collections.Generic;
using WhitePage.Entities.CaseManagement;

namespace WhitePage.BusinessAccess.Contracts.Ops
{
    public interface ICaseBusinessAccess
    {
        CaseHeader SavePrimaryCase(CaseBook caseBook);
        CaseHeader UpdatePrimaryInfo(CaseBook caseBook);
        CaseHeader UpdateAddress(CaseBook caseBook);
        vCaseChildren UpdateChildren(CaseBook caseBook);        
        List<CaseHeader> GetAllActiveCases(int pageNumber, int offset);
        List<CaseHeader> GetFilteredCases(int pageNumber, int offset, IDictionary<string, string> dictionary);        
        int GetCasesCount();
        int GetFilteredCasesCount(int pageNumber, int offset, IDictionary<string, string> dictionary);
        List<CaseHeader> GetSortedCasesDataAsc(int pageNumber, int offset, IDictionary<string, string> dictionary, string field);
        List<CaseHeader> GetSortedCasesDataDesc(int pageNumber, int offset, IDictionary<string, string> dictionary, string field);
        CaseBook GetCaseById(int caseId);
        CaseHeader UpdateHouseHold(CaseBook caseBook);
        CaseHeader UpdateSpouse(CaseBook caseBook);
        CaseHeader UpdatePhysicalHealth(CaseBook caseBook);
        CaseHeader UpdateOffender(CaseBook caseBook);
        CaseHeader UpdateAbuse(CaseBook caseBook);
        int UpdateCase(CaseBook caseBook);
        CaseHeader UpdateMental(CaseBook caseBook);
        CaseHeader UpdateSessionLog(CaseBook caseBook);
        CaseHeader UpdateFeedback(CaseBook caseBook);
        CaseHeader UpdateLegal(CaseBook caseBook);
        CaseHeader UpdateCaseStatus(CaseBook casebook);
        bool DeleteCase(int caseId);
    }
}
