using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "vCaseHeader", Schema = "Ops")]
    public class CaseHeader
    {
        [Key]
        public int CaseId { get; set; }
        public string CaseNumber { get; set; }
        public string ClientName { get; set; }
        public byte CaseStatusId { get; set; }
        public string CaseStatus { get; set; }
        public DateTime RegisterDate { get; set; }
        [NotMapped]
        public string RegisterDateString { get { return RegisterDate.ToString("dd-MMM-yyyy"); } }
        public string CenterTitle { get; set; }
        public string PeaceMaker { get; set; }
        public string MobileNumber { get; set; }
        public string Counselor { get; set; }
    }
}
