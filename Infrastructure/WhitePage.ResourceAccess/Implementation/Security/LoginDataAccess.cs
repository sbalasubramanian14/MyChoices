using System.Collections.Generic;
using System.Data;
using System.Linq;
using WhitePage.Entities.CaseManagement;
using WhitePage.Entities.Security;
using WhitePage.ResourceAccess.Contracts.Security;

namespace WhitePage.ResourceAccess.Implementation.Security
{
    public sealed class LoginDataAccess : DataAccess, ILoginDataAccess
    {
        public LoginDataAccess(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }

        public List<Claim> ValidateUser(string userName, string password, string ipAddress)
        {
            var parmsCollection = new ParmsCollection();
            return this.unitOfWork.DbContext.ExecuteStoredProcedure<Claim>("[Auth].[validateUserCredentials]",
                parmsCollection
                    .AddParm("@userName", SqlDbType.VarChar, userName)
                    .AddParm("@password", SqlDbType.VarChar, password)
                    .AddParm("@ipAddress", SqlDbType.VarChar, ipAddress)
                ).ToList();
        }

        public List<UserRole> GetUserRoles()
        {
            var parmsCollection = new ParmsCollection();
            return this.unitOfWork.DbContext.ExecuteStoredProcedure<UserRole>("[Ops].[getUserRoles]", null).ToList();
        }

        public void AddPeaceMaker(PeaceMaker peaceMaker)
        {
            var parmsCollection = new ParmsCollection();
            this.unitOfWork.DbContext.PeaceMakers.Add(peaceMaker);
            this.unitOfWork.DbContext.SaveChanges();
        }

        public void AddCounselor(Counselor counselor)
        {
            var parmsCollection = new ParmsCollection();
            this.unitOfWork.DbContext.Counselors.Add(counselor);
            this.unitOfWork.DbContext.SaveChanges();
        }

        public void AddNewUserLogin(string userName, int roleId, string firstName, string lastName)
        {
            var parmsCollection = new ParmsCollection();
            this.unitOfWork.DbContext.ExecuteStoredProcedure<Claim>("[Auth].[AddNewUserLogin]",
                parmsCollection
                    .AddParm("@userEmail", SqlDbType.VarChar, userName)
                    .AddParm("@roleId", SqlDbType.Int, roleId)
                    .AddParm("@firstName", SqlDbType.VarChar, firstName)
                    .AddParm("@lastName", SqlDbType.VarChar, lastName)
                ).ToList();
        }
        public int DeactivateUser(int userId)
        {
            var caseObj = this.unitOfWork.DbContext.User.Find(userId);
            caseObj.IsActive =0;
            int flag = this.unitOfWork.DbContext.SaveChanges();
            return 1;
        }
    }
}
