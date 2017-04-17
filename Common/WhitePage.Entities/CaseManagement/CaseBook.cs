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

        public CaseFamilyHouseHold FamilyHouseHold { get; set; }
        public CaseSpouse Spouse { get; set; }
        public CasePhysicalHealth PhysicalHealth { get; set; }

        public List<vCaseOffender> vOffender { get; set; }
        public CaseOffender SelectedOffender { get; set; }

        public CaseAbuse Abuse { get; set; }
        public CaseManage Manage { get; set; }

        public List<vCaseMental> vMental { get; set; }
        public CaseMental SelectedMental { get; set; }

        public List<CaseSessionLog> SessionLog { get; set; }
        public CaseSessionLog SelectedSessionLog { get; set; }

        public List<vCaseFeedback> FeedBack { get; set; }
        public CaseFeedback SelectedFeedback { get; set; }

        public CaseLegal Legal { get; set; }
    }
}
