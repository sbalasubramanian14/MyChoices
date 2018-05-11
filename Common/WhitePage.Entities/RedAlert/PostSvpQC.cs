using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trPostSvpQC", Schema = "RedAlert")]
    public class PostSvpQC
    {
        [Key]
        public int PostSvpQCId { get; set; }
        public string PostSvpQCNumber { get; set; }
        public int VillageCode { get; set; }
        public DateTime PostSvpQCDate { get; set; }
        public string CVCStatus { get; set; }
        public string WasAnyAnotherClubFormed { get; set; }
        public string WasVillageLeadershipProActive { get; set; }
        public string DoVillagersRememberSVP { get; set; }
        public short TrafficCountBeforeSVP { get; set; }
        public short TrafficCountAfterSVP { get; set; }
        public short ChildMarriageCountBeforeSVP { get; set; }
        public short ChildMarriageCountAfterSVP { get; set; }
        public string WasFollowUpDoneByNGO { get; set; }
        public string AreInfoStickersIntact { get; set; }
        public string IsVillageSafeForGirls { get; set; }
        public string SuccessStory { get; set; }
        public string IsFollowUpSvpRequiredDesc { get; set; }
        public string DoPeopleRememberHelpline { get; set; }
        public string WereIpFormsSubmitted { get; set; }
        public string RakshakStatus { get; set; }
        public string FieldWorkerNames { get; set; }
        public string Summary { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
    }
}
