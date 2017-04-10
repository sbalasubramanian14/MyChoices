using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "trPeaceMaker", Schema = "Ops")]
    public class PeaceMaker
    {
        [Key]
        public int PeaceMakerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public short? CenterId { get; set; }
        public bool IsActive { get; set; }
    }
}
