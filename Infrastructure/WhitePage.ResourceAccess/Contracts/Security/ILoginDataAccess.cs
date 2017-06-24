using System.Collections.Generic;
using WhitePage.Entities.CaseManagement;
using WhitePage.Entities.Security;

namespace WhitePage.ResourceAccess.Contracts.Security
{
    public interface ILoginDataAccess
    {
        List<Claim> ValidateUser(string userName, string password, string ipAddress);
        List<UserRole> GetUserRoles();
        void AddPeaceMaker(PeaceMaker peaceMaker);
        void AddCounselor(Counselor counselor);
        void AddNewUserLogin(string userName, int roleId, string firstName, string lastName);
    }
}
