using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "trCounselor", Schema = "Ops")]
    public class Counselor
    {
        [Key]
        public int CounselorId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public short? CenterId { get; set; }
        public bool IsGlobal { get; set; }
        public bool IsActive { get; set; }
    }
}
