
using NexGenRedAlert.Models;
using System.Collections.Generic;

namespace NexGenRedAlert.Services
{
    public class MultipickerServices
    {
        private List<MultiselectItem> _majorSourceOfIncomeItems;
        private List<MultiselectItem> _localIssuesItems;

        public List<MultiselectItem> MajorSourceOfIncomeItems
        {
            get
            {
                _majorSourceOfIncomeItems = new List<MultiselectItem>
                {
                    new MultiselectItem { Name = "Agriculture" },
                    new MultiselectItem { Name = "Industrial" },
                    new MultiselectItem { Name = "Casual Labour" },
                    new MultiselectItem { Name = "Self-Employed" },
                    new MultiselectItem { Name = "Other" }
                };
                return _majorSourceOfIncomeItems;
            }
        }

        public List<MultiselectItem> LocalIssuesItems
        {
            get
            {
                _localIssuesItems = new List<MultiselectItem>
                {
                    new MultiselectItem { Name = "Prone to Natural calamities" },
                    new MultiselectItem { Name = "Lack of Livelihood options" },
                    new MultiselectItem { Name = "Civil and Political unrest" },
                    new MultiselectItem { Name = "Border Interstate" },
                    new MultiselectItem { Name = "Border International" }
                };
                return _localIssuesItems;
            }
        }
    }
}
