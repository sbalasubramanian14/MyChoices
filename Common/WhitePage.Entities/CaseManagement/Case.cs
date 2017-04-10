using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "trCase", Schema = "Ops")]
    public class Case
    {
        [Key]
        public int CaseId { get; set; }
        public string CaseNumber { get; set; }
        public byte CaseStausId { get; set; }

        public short CenterId { get; set; }
        public int CounselorId { get; set; }
        public int PeaceMakerId { get; set; }

        public string ClientFirstName { get; set; }
        public string ClientLastName { get; set; }
        public string Mi { get; set; }
        public string FatherName { get; set; }
        public int? GenderLookupId { get; set; }

        public int? RequireAssistanceLookupId { get; set; }

        public string Address { get; set; }
        public string Area { get; set; }
        public short CityId { get; set; }
        public short StateId { get; set; }
        public string PIN { get; set; }
        public string Mobile { get; set; }
        public int MaritalStatusLookupId { get; set; }
        public string Remarks { get; set; }
        public DateTime RegisterDate { get; set; }
        public string MobileNumber { get; set; }

        public int CreatedBy { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime ModifiedDatetime { get; set; }
    }
}
