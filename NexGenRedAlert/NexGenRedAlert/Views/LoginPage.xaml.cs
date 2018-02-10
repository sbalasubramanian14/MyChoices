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
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NexGenRedAlert.Models;
using NexGenRedAlert.contracts;

namespace NexGenRedAlert.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LoginPage : ContentPage
    {
        private ICredentialService credentialService;

        public static readonly string ClientId = "604822021872-052g10g9q6qpkkr1nlk2p6r5kqk6f0ke.apps.googleusercontent.com";
        public static readonly string GMAIL_REQUESTURL = "https://www.googleapis.com/oauth2/v2/userinfo";
        Xamarin.Auth.OAuth2Authenticator authenticator = null;

        public LoginPage()
        {
            this.credentialService = DependencyService.Get<ICredentialService>();
           
            InitializeComponent();
        }
       

        public void GoogleAuth(object sender, EventArgs evt) 
        {
            LoginActivityIndicator.IsVisible = true;
            authenticator
                 = new Xamarin.Auth.OAuth2Authenticator
                 (
                     clientId: ClientId,
                     clientSecret: null,
                     authorizeUrl: new Uri("https://accounts.google.com/o/oauth2/v2/auth"),
                     redirectUrl: new Uri("com.googleusercontent.apps.604822021872-052g10g9q6qpkkr1nlk2p6r5kqk6f0ke:/oauth2redirect"),
                     scope: "email",
                     accessTokenUrl: new Uri("https://www.googleapis.com/oauth2/v4/token"),
                     getUsernameAsync: null,
                     isUsingNativeUI: true
                 )
                 {
                     AllowCancel = true,
                 };

            authenticator.Completed += OnAuthCompletedAsync;
            authenticator.Error += OnAuthError;

            AuthenticationState.Authenticator = authenticator;
            var presenter = new Xamarin.Auth.Presenters.OAuthLoginPresenter();
            presenter.Login(authenticator);

            return;
        }

         async void OnAuthCompletedAsync(object sender, AuthenticatorCompletedEventArgs e)
        {
            var authenticator = sender as OAuth2Authenticator;
            ImplementingPartner implementingPartner;

            if (e.IsAuthenticated)
            {
                string userEmail="";
                var request = new OAuth2Request
                                (
                                    "GET",
                                    new Uri(GMAIL_REQUESTURL),
                                    null,
                                    e.Account
                                );
                var response = await request.GetResponseAsync();

                if (response != null)
                {
                    //Get the user data here
                    var userData = JObject.Parse(response.GetResponseText());
                    userEmail=userData["email"].ToString();
                }


                implementingPartner = await App.AuthServices.PostAsyncValidateImplementingPartner(userEmail);

                LoginActivityIndicator.IsVisible = false;

                if(implementingPartner != null)
                {
                    await DisplayAlert("Authentication", "Successfully Logged in: "+ implementingPartner.NgoName, "ok");
                    this.credentialService.SaveCredentials(implementingPartner.UserName, implementingPartner.IpCode);
                    Application.Current.MainPage = new NavigationPage(new MenuPage());
                }
                else
                {
                    await DisplayAlert("Authentication", "Failed", "ok");
                }
                
            }
            else
            {
                LoginActivityIndicator.IsVisible = true;
               await DisplayAlert("Authentication", "Failed", "ok");
            }
        }

        void OnAuthError(object sender, AuthenticatorErrorEventArgs e)
        {
            var authenticator = sender as OAuth2Authenticator;

            DisplayAlert("Authentication error", e.Message, "ok");
        }
    }
}