using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trPreSvp", Schema = "RedAlert")]
    public class PreSvp
    {
        [Key]
        public int PreSVPId { get; set; }
        public string PreSvpNumber { get; set; }

        public int VillageCode { get; set; }
        public DateTime PreSvpDate { get; set; }

        public short DistanceToVillageInKms { get; set; }
        public string LocationDesc { get; set; }
        public string MajorSourceOfIncome { get; set; }
        public string ActiveCommunityGroup { get; set; }

        public byte ChildAbuseCount { get; set; }
        public byte DomesticViolenceCasesCount { get; set; }
        public byte TraffickingCasesCount { get; set; }
        public byte MissingCasesCount { get; set; }
        public byte SchoolDropoutsCount { get; set; }

        public string NeighbouringTrafficProneDesc { get; set; }
        public string LocalIssuesDesc { get; set; }
        public string AwarenessDesc { get; set; }
        public string TraffickingCausesDesc { get; set; }
        public string PreviousAwareness { get; set; }
        public string PreviousAwarenessDesc { get; set; }

        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
    }
}
