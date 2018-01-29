using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trPostSvp", Schema = "Ops")]
    public class PostSvp
    {
        [Key]
        public int FormId { get; set; }
        public string PostSvpNumber { get; set; }
        

        public int VillageCode { get; set; }
        public DateTime PostSvpDate { get; set; }

        public float TravelHours { get; set; }
        public float TotalCampaignHours { get; set; }
        public string FieldWorkerNames { get; set; }
        public String ORAVisited { get; set; }

        public byte ConfirmedChildAbuseCount { get; set; }
        public byte ConfirmedDomesticViolenceCasesCount { get; set; }
        public byte ConfirmedTraffickingCasesCount { get; set; }
        public byte ConfirmedMissingCasesCount { get; set; }
        public byte ConfirmedSchoolDropOutsCount { get; set; }
        public string NeighbouringTrafficProneDesc { get; set; }

        public short MothersParticipationCount { get; set; }
        public short FathersParticipationCount { get; set; }
        public short SchoolParticipationCount { get; set; }
        public short EldersParticipationCount { get; set; }
        public short MovieParticipationCount { get; set; }
        public short TotalParticipationCount { get; set; }

        public string MothersFeedback { get; set; }
        public string FathersFeedback { get; set; }
        public string SchoolFeedback { get; set; }
        public string EldersFeedback { get; set; }

        public string SchoolName { get; set; }
        public short ComicBooksCount { get; set; }
        public int TotalSvpCost { get; set; }
        public string Summary { get; set; }
        public string PositiveFeedback { get; set; }
        public string ChallengesDesc { get; set; }
        public string IsFollowUpRequiredDesc { get; set; }
        public string Recomendations { get; set; }

        public string ElderName { get; set; }
        public string ElderDesignation { get; set;}
        public string ElderContactNumber { get; set; }

        public string PoliceName { get; set; }
        public string PoliceDesignation { get; set; }
        public string PoliceContactNumber { get; set; }

        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
    }
}