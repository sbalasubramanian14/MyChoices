using System.Collections.Generic;

namespace WhitePage.Entities.CaseManagement
{
    public class CaseBook
    {
        public Case Case { get; set; }
        public CaseHeader CaseHeader { get; set; }
        public List<CaseAddress> Addresses { get; set; }
        public List<vCaseAddress> vAddresses { get; set; }
        public CaseAddress SelectedAddress { get; set; }
    }
}
