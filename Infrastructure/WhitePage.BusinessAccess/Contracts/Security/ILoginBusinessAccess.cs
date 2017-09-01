using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WhitePage.Entities.CaseManagement;
using WhitePage.Entities.Security;

namespace WhitePage.BusinessAccess.Contracts.Security
{
    public interface ILoginBusinessAccess
    {
        List<Claim> ValidateUser(string userName, string password, string ipAddress);
        List<UserRole> GetUserRoles();
        void AddPeaceMaker(PeaceMaker peaceMaker);
        void AddCounselor(Counselor counselor);
        void AddNewUserLogin(string userName, int roleId, string firstName, string lastName);
        int DeactivateUser(int userId);
    }
}
