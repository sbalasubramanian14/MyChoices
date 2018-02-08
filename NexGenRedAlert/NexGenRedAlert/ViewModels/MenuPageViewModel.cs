using NexGenRedAlert.contracts;
using NexGenRedAlert.Views;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;

namespace NexGenRedAlert.ViewModels
{
    class MenuPageViewModel : BaseViewModel
    {
        public ICommand LogoutCurrentUser { get; }
        public MenuPageViewModel()
        {
            Title = "RedAlert";
            LogoutCurrentUser = new Command(async () => {
                DependencyService.Get<ICredentialService>().DeleteCredentials();
                await Application.Current.MainPage.Navigation.PopToRootAsync();
            });
        }
        public void OnLogoutClicked()
        {
            
        }
    }
}
