using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "trCaseSpouse", Schema = "Ops")]
    public class CaseSpouse
    {
        [Key]
        public int CaseSpouseId { get; set; }
        public int CaseId { get; set; }
        public string SpouseName { get; set; }
        public DateTime? SpouseDOB { get; set; }
        public string SpouseHomePhone { get; set; }
        public string SpouseMobilePhone { get; set; }
        public string SpouseOccupation { get; set; }
        public int? SpouseEducationLookupId { get; set; }
        public string SpouseAddress { get; set; }
        public string Area { get; set; }
        public int? CityLookupId { get; set; }
        public int? StateLookupId { get; set; }
        public string PIN { get; set; }

        public string PrimaryEmergencyContactName { get; set; }
        public int? PrimaryEmergencyRelationshipToClientLookupId { get; set; }
        public string PrimaryEmergencyContactPhoneNumber { get; set; }
        public string PrimaryEmergencyContactAdress { get; set; }

        public string SecondaryEmergencyContactName { get; set; }
        public int? SecondaryEmergencyRelationshipToClientLookupId { get; set; }
        public string SecondaryEmergencyContactPhoneNumber { get; set; }
        public string SecondaryEmergencyContactAdress { get; set; }
    }
}
