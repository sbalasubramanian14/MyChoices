using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trProgrammePlanning", Schema = "RedAlert")]
    public class ProgrammePlanning
    {
        [Key]
        public int ProgrammePlanningId { get; set; }
        public string PlanningNumber { get; set; }
        public int VillageCode { get; set; }

        public string PlanningMonthAndYear { get; set; }
        public string PlanningCategory { get; set; }
        public DateTime PlannedPreSvpDate { get; set; }
        public DateTime PlannedSvpDate { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
    }
}
