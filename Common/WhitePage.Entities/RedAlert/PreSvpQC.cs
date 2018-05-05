using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trPreSvpQC", Schema = "RedAlert")]
    public class PreSvpQC
    {
        [Key]
        public int PreSvpQCId { get; set; }
        public string PreSvpQCNumber { get; set; }
        public int VillageCode { get; set; }
        public string StakeholdersDescription { get; set; }
        public string IpFacilitatorCommunicationSkillLevel { get; set; }
        public string CVCStatus { get; set; }
        public string WasLogisticArrangementsMade { get; set; }
        public string AreVillagersInterested { get; set; }
        public string Summary { get; set; }

        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
    }
}
