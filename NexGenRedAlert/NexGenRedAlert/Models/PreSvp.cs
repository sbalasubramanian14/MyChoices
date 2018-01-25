using System;
using System.Collections.Generic;
using System.Text;

namespace NexGenRedAlert.Models
{
    public class PreSvp
    {
        public int FormId { get; set; }
        public string PreSvpNumber { get; set; }

        public int VillageCode { get; set; }
        public DateTime PreSvpDate { get; set; }

        public short DistanceToVillage { get; set; }
        public string LocationDesc { get; set; }
        public string MajorSourceOfIncome { get; set; }
        public string ActiveCommunityGroup { get; set; }


        public byte ChildAbuseCount { get; set; }
        public byte DomesticViolenceCasesCount { get; set; }
        public byte TraffickingCasesCount { get; set; }
        public byte MissingCasesCount { get; set; }
        public byte SchoolDropOutsCount { get; set; }

        public string NeighbouringTrafficProneDesc { get; set; }
        public string LocalIssuesDesc { get; set; }
        public string AwarenessDesc { get; set; }
        public string TraffickingCausesDesc { get; set; }
        public bool PreviousAwareness { get; set; }
        public string PreviousAwarenessDesc { get; set; }

        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
    }
}

