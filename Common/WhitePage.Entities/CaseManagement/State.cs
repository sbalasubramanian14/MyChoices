using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "dmnState", Schema = "Core")]
    public class State
    {
        [Key]
        public short StateId { get; set; }
        public string Title { get; set; }

        [NotMapped]
        public List<City> Cities { get; set; }
    }
}
