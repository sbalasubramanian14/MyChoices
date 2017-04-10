using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhitePage.Entities.CaseManagement
{
    [Table(name: "dmnCity", Schema = "Core")]
    public class City
    {
        [Key]
        public int CityId { get; set; }
        public string Title { get; set; }
        public short StateId { get; set; }
    }
}
