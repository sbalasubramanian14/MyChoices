using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace WhitePage.Entities.Security
{
    [Table(name: "trUser", Schema = "Auth")]
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DoB { get; set; }
        public string MobileNumber { get; set; }
        public short FailureAttempts { get; set; }
        public Boolean IsLocked { get; set; }
        public DateTime? LockedDate { get; set; }
        public Boolean IsSuspended { get; set; }
        public DateTime? SuspendedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int IsActive { get; set; }

    }

}

