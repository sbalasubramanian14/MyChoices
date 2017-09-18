using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WhitePage.BusinessAccess.Contracts.Core;
using WhitePage.Entities.CaseManagement;
using WhitePage.ResourceAccess.Contracts.Core;
using WhitePage.Entities.Security;
using System.Linq.Expressions;
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

        public List<KeyValuePair<string, KeyValuePair<string, double>>> GetCenterWiseChartObjectValues(string column)
        {
            return this.commonDataAccess.GetCenterWiseChartObjectValues(column);
        }

        public List<KeyValuePair<string, KeyValuePair<string, double>>> GetCounselorWiseChartObjectValues(string column)
        {
            return this.commonDataAccess.GetCounselorWiseChartObjectValues(column);
        }

        public List<KeyValuePair<string, KeyValuePair<string, double>>> GetPeacemakerWiseChartObjectValues(string column)
        {
            return this.commonDataAccess.GetPeacemakerWiseChartObjectValues(column);
        }

        public List<KeyValuePair<string, KeyValuePair<string, float>>> GetCenterWiseAvgChartObjectValues(string column)
        {
            return this.commonDataAccess.GetCenterWiseAvgChartObjectValues(column);
        }

        public List<KeyValuePair<string, KeyValuePair<string, float>>> GetCounselorWiseAvgChartObjectValues(string column)
        {
            return this.commonDataAccess.GetCounselorWiseAvgChartObjectValues(column);
        }

        public List<KeyValuePair<string, KeyValuePair<string, float>>> GetPeacemakerWiseAvgChartObjectValues(string column)
        {
            return this.commonDataAccess.GetPeacemakerWiseAvgChartObjectValues(column);
        }        
        public int GetUsersCount()
        {
            return this.commonDataAccess.GetAllActiveUsers().Count();
        }
        public int GetNonAdminUsersCount()
        {
            return this.commonDataAccess.GetAllActiveUsers().Where(user => user.UserName != "admin").Count();
        }
        public List<User> GetAllActiveUsers(int pageNumber, int offset)
        {
            return returnUsersList(this.commonDataAccess.GetAllActiveUsers(), pageNumber, offset);
        }
        public List<User> GetActiveNonAdminUsers( int pageNumber, int offset)
        {
            IQueryable<User> queryableUserList = this.commonDataAccess.GetAllActiveUsers();
            queryableUserList = queryableUserList.Where(user => user.UserName != "admin");
            return returnUsersList(queryableUserList, pageNumber, offset);
        }
        public List<User> GetSortedUsersDataAsc(int pageNumber, int offset, IDictionary<string, string> dictionary, string field)
        {
           return
                GetFilteredData(pageNumber, offset, dictionary).OrderBy(returnObjectExpression(field)).Skip((pageNumber - 1) * 10).Take(offset).ToList();
        }

        public List<User> GetSortedUsersDataDesc(int pageNumber, int offset, IDictionary<string, string> dictionary, string field)
        {
            return
                returnUsersList(GetFilteredData(pageNumber, offset, dictionary).OrderByDescending(returnObjectExpression(field)), pageNumber, offset);
        }
        public List<User> GetFilteredUsers(int pageNumber, int offset, IDictionary<string, string> dictionary)
        {
            return
                this.GetFilteredData(pageNumber, offset, dictionary).
                Skip((pageNumber - 1) * 10).
                Take(offset).
                ToList();
        }

        public int GetFilteredUsersCount(int pageNumber, int offset, IDictionary<string, string> dictionary)
        {
            return this.GetFilteredData(pageNumber, offset, dictionary).Count();
        }

        Func<IQueryable<User>, int, int, List<User>> returnUsersList =
            (users, pageNumber, offset) => users.Skip((pageNumber - 1) * 10).Take(offset).ToList();

        public Expression<Func<User, string>> returnObjectExpression(string field)
        {
            var itemParam = Expression.Parameter(typeof(User), "ch");
            var entityAccess = Expression.MakeMemberAccess(itemParam, typeof(User).GetMember(field).First());
            var lambda = Expression.Lambda<Func<User, string>>(entityAccess, itemParam);

            return lambda;
        }
        public IQueryable<User> GetFilteredData(int pageNumber, int offset, IDictionary<string, string> dictionary)
        {
            string firstNameFilterString = dictionary["FirstName"];
            string lastNameFilterString = dictionary["LastName"];
            string userNameFilterString = dictionary["UserName"];

            return
                this.commonDataAccess.GetAllActiveUsers().
                Where(
                    user => user.UserName != "admin" && user.FirstName.Contains(firstNameFilterString) &&
                    user.LastName.Contains(lastNameFilterString) &&
                    user.UserName.Contains(userNameFilterString));
        }
        
    }
}
