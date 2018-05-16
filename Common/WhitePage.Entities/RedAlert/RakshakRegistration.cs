using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trRakshakRegistration", Schema = "RedAlert")]
    public class RakshakRegistration
    {
        [Key]
        public int RakshakRegistrationId { get; set; }
        public string RakshakRegistrationNumber { get; set; }
        public int VillageCode { get; set; }

        public string Name { get; set; }
        public byte Age { get; set; }
        public string Gender { get; set; }
        public string EducationalQualification { get; set; }
        public string PhoneNumber { get; set; }
        public string AlternatePhoneNumber { get; set; }
        public string EmailId { get; set; }

        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
    }
}
