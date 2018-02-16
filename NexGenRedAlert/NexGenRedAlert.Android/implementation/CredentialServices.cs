using Android.App;
using NexGenRedAlert.contracts;
using NexGenRedAlert.Services;
using System.Collections.Generic;
using System.Linq;
using Xamarin.Auth;

[assembly: Xamarin.Forms.Dependency(typeof(CredentialServices))]
namespace NexGenRedAlert.Services
{
    public class CredentialServices : ICredentialService
    {
        private IEnumerable<Account> _accountStore = AccountStore.Create(Application.Context).FindAccountsForService(Application.Context.ApplicationInfo.Name);

        public string UserName
        {
            get
            {
                var account = _accountStore.FirstOrDefault();
                return (account != null) ? account.Username : null;
            }
        }

        public string IpCode
        {
            get
            {
                var account = _accountStore.FirstOrDefault();
                return (account != null) ? account.Properties["IpCode"] : null;
            }
        }
        public string NgoName
        {
            get
            {
                var account = _accountStore.FirstOrDefault();
                return (account != null) ? account.Properties["NgoName"] : null;
            }
        }

        public void DeleteCredentials()
        {
            var account = _accountStore.FirstOrDefault();
            if (account != null)
            {
                AccountStore.Create(Application.Context).Delete(account, Application.Context.ApplicationInfo.Name);
            }
        }

        public bool DoCredentialsExist()
        {
            return _accountStore.Any() ? true : false;
        }

        public void SaveCredentials(string userName, string ipCode , string ngoName)
        {
            if (!string.IsNullOrWhiteSpace(userName) && !string.IsNullOrWhiteSpace(ipCode) && !string.IsNullOrWhiteSpace(ngoName))
            {
                Account account = new Account
                {
                    Username = userName
                };
                account.Properties.Add("IpCode",ipCode);
                account.Properties.Add("NgoName", ngoName);
                AccountStore.Create(Application.Context).Save(account, Application.Context.ApplicationInfo.Name);
            }
        }
    }
}
