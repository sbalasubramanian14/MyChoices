using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "vCaseAddress", Schema = "Ops")]
    public class vCaseAddress
    {
        [Key]
        public int CaseAddressId { get; set; }
        public int CaseId { get; set; }
        public string Address { get; set; }
        public string Area { get; set; }
        public short CityId { get; set; }
        public short StateId { get; set; }
        public string PIN { get; set; }
        public bool IsPrimary { get; set; }

        public int CreatedBy { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime ModifiedDatetime { get; set; }

        public string City { get; set; }
        public string State { get; set; }
    }
}
