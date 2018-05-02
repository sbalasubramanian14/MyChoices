using Android.App;
using NexGenRedAlert.contracts;
using NexGenRedAlert.Services;
using System;
using System.Linq;
using Xamarin.Auth;


[assembly: Xamarin.Forms.Dependency(typeof(CredentialServices))]
namespace NexGenRedAlert.Services
{
    public class CredentialServices : ICredentialService
    {
        public string UserName
        {
            get
            {
                var account = AccountStore.Create(Application.Context).FindAccountsForService(Application.Context.ApplicationInfo.Name).FirstOrDefault();
                return (account != null) ? account.Username : null;
            }
        }

        public string UserCode
        {
            get
            {
                var account = AccountStore.Create(Application.Context).FindAccountsForService(Application.Context.ApplicationInfo.Name).FirstOrDefault();
                return (account != null) ? account.Properties["UserCode"] : null;
            }
        }
        public string Organization
        {
            get
            {
                var account = AccountStore.Create(Application.Context).FindAccountsForService(Application.Context.ApplicationInfo.Name).FirstOrDefault();
                return (account != null) ? account.Properties["Organization"] : null;
            }
        }

        public int RoleId
        {
            get
            {
                var account = AccountStore.Create(Application.Context).FindAccountsForService(Application.Context.ApplicationInfo.Name).FirstOrDefault();
                return (account != null) ? Convert.ToInt32(account.Properties["RoleId"]) : 0;
            }
        }

        public void DeleteCredentials()
        {
            var account = AccountStore.Create(Application.Context).FindAccountsForService(Application.Context.ApplicationInfo.Name).FirstOrDefault();
            if (account != null)
            {
                AccountStore.Create(Application.Context).Delete(account, Application.Context.ApplicationInfo.Name);
            }
        }

        public bool DoCredentialsExist()
        {
            return AccountStore.Create(Application.Context).FindAccountsForService(Application.Context.ApplicationInfo.Name).Any() ? true : false;
        }

        public void SaveCredentials(string userName, string userCode , string organization, int roleId)
        {
            if (!string.IsNullOrWhiteSpace(userName) && !string.IsNullOrWhiteSpace(userCode) && !string.IsNullOrWhiteSpace(organization))
            {
                Account account = new Account
                {
                    Username = userName
                };
                account.Properties.Add("UserCode",userCode);
                account.Properties.Add("Organization", organization);
                account.Properties.Add("RoleId", roleId.ToString());
                AccountStore.Create(Application.Context).Save(account, Application.Context.ApplicationInfo.Name);
            }
        }
    }
}
