﻿using NexGenRedAlert.contracts;
using NexGenRedAlert.Views;
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

                var confirmation = await Application.Current.MainPage.DisplayAlert("Logout Confirmation","Are you sure ?","Yes" ,"No");
                if(confirmation)
                {
                    DependencyService.Get<ICredentialService>().DeleteCredentials();
                    Application.Current.MainPage = new NavigationPage(new LoginPage());
                }                 
            });
        }
        
        public string WelcomeMessage
        {
            get
            {
                return $"Welcome {DependencyService.Get<ICredentialService>().NgoName} !";
            }
        }
    }
}