using System.Collections.Generic;
using WhitePage.Entities.CaseManagement;

namespace WhitePage.ResourceAccess.Contracts.Core
{
    public interface ICommonDataAccess
    {
        List<Center> GetAllCenters();
        List<PeaceMaker> GetAllPeaceMakers();
        List<Counselor> GetAllCounselors();
        List<CaseStatus> GetAllCaseStatuses();
        List<Lookup> GetAllLookups();
        List<State> GetAllStates();
        List<KeyValuePair<string, KeyValuePair<string, int>>> GetCenterWiseChartObjectValues(int id);
        List<KeyValuePair<string, KeyValuePair<string, int>>> GetCounselorWiseChartObjectValues(int id);
        List<KeyValuePair<string, KeyValuePair<string, int>>> GetPeacemakerWiseChartObjectValues(int id);
        List<KeyValuePair<string, KeyValuePair<string, double>>> GetCenterWiseChartObjectValues(string column);
        List<KeyValuePair<string, KeyValuePair<string, double>>> GetCounselorWiseChartObjectValues(string column);
        List<KeyValuePair<string, KeyValuePair<string, double>>> GetPeacemakerWiseChartObjectValues(string column);
        List<KeyValuePair<string, KeyValuePair<string, float>>> GetCenterWiseAvgChartObjectValues(string column);
        List<KeyValuePair<string, KeyValuePair<string, float>>> GetCounselorWiseAvgChartObjectValues(string column);
        List<KeyValuePair<string, KeyValuePair<string, float>>> GetPeacemakerWiseAvgChartObjectValues(string column);
    }
}
