using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WhitePage.BusinessAccess.Contracts.Core;
using WhitePage.Entities.CaseManagement;
using WhitePage.ResourceAccess.Contracts.Core;
using WhitePage.ResourceAccess.Contracts.Ops;

namespace WhitePage.BusinessAccess.Implementation.Core
{
    public class CommonBusinessAccess : ICommonBusinessAccess
    {
        private ICommonDataAccess commonDataAccess;

        public CommonBusinessAccess(ICommonDataAccess commonDataAccess)
        {
            this.commonDataAccess = commonDataAccess;
        }

        public List<Center> GetAllCenters()
        {
            return this.commonDataAccess.GetAllCenters();
        }

        public List<Counselor> GetAllCounselors()
        {
            return this.commonDataAccess.GetAllCounselors();
        }

        public List<Lookup> GetAllLookups()
        {
            return this.commonDataAccess.GetAllLookups();
        }

        public List<PeaceMaker> GetAllPeaceMakers()
        {
            return this.commonDataAccess.GetAllPeaceMakers();
        }

        public List<State> GetAllStates()
        {
            return this.commonDataAccess.GetAllStates();
        }

        public List<KeyValuePair<string, KeyValuePair<string, int>>> GetCenterWiseChartObjectValues(int id)
        {
            return this.commonDataAccess.GetCenterWiseChartObjectValues(id);
        }

        public List<KeyValuePair<string, KeyValuePair<string, int>>> GetCounselorWiseChartObjectValues(int id)
        {
            return this.commonDataAccess.GetCounselorWiseChartObjectValues(id);
        }

        public List<KeyValuePair<string, KeyValuePair<string, int>>> GetPeacemakerWiseChartObjectValues(int id)
        {
            return this.commonDataAccess.GetPeacemakerWiseChartObjectValues(id);
        }
    }
}
