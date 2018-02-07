using NexGenRedAlert.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Auth;
using Xamarin.Forms.Xaml;
using NexGenRedAlert.Auth;

namespace NexGenRedAlert.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LoginPage : ContentPage
    {
        public LoginPage()
        {
            InitializeComponent();
        }
        public static readonly string ClientId = "604822021872-052g10g9q6qpkkr1nlk2p6r5kqk6f0ke.apps.googleusercontent.com";
        Xamarin.Auth.OAuth2Authenticator authenticator = null;

        public void GoogleAuth(object sender, EventArgs evt) 
        {
            authenticator
                 = new Xamarin.Auth.OAuth2Authenticator
                 (
                     clientId: ClientId,
                     clientSecret: null,
                     authorizeUrl: new Uri("https://accounts.google.com/o/oauth2/v2/auth"),
                     redirectUrl: new Uri("com.googleusercontent.apps.604822021872-052g10g9q6qpkkr1nlk2p6r5kqk6f0ke:/oauth2redirect"),
                     scope: "profile",
                     accessTokenUrl: new Uri("https://www.googleapis.com/oauth2/v4/token"),
                     getUsernameAsync: null,
                     isUsingNativeUI: true
                 )
                 {
                     AllowCancel = true,
                 };

            authenticator.Completed += OnAuthCompleted;
            authenticator.Error += OnAuthError;

            AuthenticationState.Authenticator = authenticator;
            var presenter = new Xamarin.Auth.Presenters.OAuthLoginPresenter();
            presenter.Login(authenticator);

            return;
        }

        void OnAuthCompleted(object sender, AuthenticatorCompletedEventArgs e)
        {
            var authenticator = sender as OAuth2Authenticator;

            if (authenticator != null)
            {
                authenticator.Completed -= OnAuthCompleted;
                authenticator.Error -= OnAuthError;
            }

            if (e.IsAuthenticated)
            {
                DisplayAlert("Authentication", "Success", "ok");
            }
            else
            {
                DisplayAlert("Authentication", "Failed", "ok");
            }
        }

        void OnAuthError(object sender, AuthenticatorErrorEventArgs e)
        {
            var authenticator = sender as OAuth2Authenticator;

            if (authenticator != null)
            {
                authenticator.Completed -= OnAuthCompleted;
                authenticator.Error -= OnAuthError;
            }

            DisplayAlert("Authentication error", e.Message, "ok");
        }
    }
}