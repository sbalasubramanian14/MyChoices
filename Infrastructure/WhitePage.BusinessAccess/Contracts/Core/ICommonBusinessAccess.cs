using System.Collections.Generic;
using WhitePage.Entities.CaseManagement;
using WhitePage.Entities.Security;

namespace WhitePage.BusinessAccess.Contracts.Core
{
    public interface ICommonBusinessAccess
    {
        List<Center> GetAllCenters();
        List<PeaceMaker> GetAllPeaceMakers();
        List<Counselor> GetAllCounselors();
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
        int GetUsersCount();
        List<User> GetAllActiveUsers(int pageNumber, int offset);
        List<User> GetSortedUsersDataAsc(int pageNumber, int offset, IDictionary<string, string> dictionary, string field);
        List<User> GetSortedUsersDataDesc(int pageNumber, int offset, IDictionary<string, string> dictionary, string field);
        List<User> GetFilteredUsers(int pageNumber, int offset, IDictionary<string, string> dictionary);
        int GetFilteredUsersCount(int pageNumber, int offset, IDictionary<string, string> dictionary);

    }
}
