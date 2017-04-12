using System.Collections.Generic;

namespace WhitePage.Entities.CaseManagement
{
    public class CaseBook
    {
        public Case Case { get; set; }
        public CaseHeader CaseHeader { get; set; }        
        public List<vCaseAddress> vAddresses { get; set; }
        public List<vCaseChildren> vChildren { get; set; }
        public CaseAddress SelectedAddress { get; set; }
        public CaseChildren SelectedChildren { get; set; }
    }
}
