using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.RedAlert
{
    [Table(name: "trRedAlertUser", Schema = "RedAlert")]
    public class RedAlertUser
    {
        [Key]
        public int RedAlertUserId { get; set; }
        public string UserName { get; set; }
        public string UserCode { get; set; }
        public string Organization { get; set; }
        public string PrimaryContact { get; set; }
        public string PrimaryContactNumber { get; set; }
        public int RoleId { get; set; }
        public int IsActive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
