using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "dmnLookup", Schema = "Core")]
    public class Lookup
    {
        [Key]
        public int LookupId { get; set; }
        public string Title { get; set; }
        public bool IsActive { get; set; }
        public bool IsReadOnly { get; set; }

        public int CreatedBy { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime ModifiedDatetime { get; set; }

        [NotMapped]
        public List<LookupDetail> LookupDetails { get; set; }
    }
}
