using Android.App;
using NexGenRedAlert.contracts;
using NexGenRedAlert.Services;
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

        public string IpCode
        {
            get
            {
                var account = AccountStore.Create(Application.Context).FindAccountsForService(Application.Context.ApplicationInfo.Name).FirstOrDefault();
                return (account != null) ? account.Properties["IpCode"] : null;
            }
        }
        public string NgoName
        {
            get
            {
                var account = AccountStore.Create(Application.Context).FindAccountsForService(Application.Context.ApplicationInfo.Name).FirstOrDefault();
                return (account != null) ? account.Properties["NgoName"] : null;
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

        public void SaveCredentials(string UserName, string IpCode , string NgoName)
        {
            if (!string.IsNullOrWhiteSpace(UserName) && !string.IsNullOrWhiteSpace(IpCode) && !string.IsNullOrWhiteSpace(NgoName))
            {
                Account account = new Account
                {
                    Username = UserName
                };
                account.Properties.Add("IpCode",IpCode);
                account.Properties.Add("NgoName", NgoName);
                AccountStore.Create(Application.Context).Save(account, Application.Context.ApplicationInfo.Name);
            }
        }
    }
}
