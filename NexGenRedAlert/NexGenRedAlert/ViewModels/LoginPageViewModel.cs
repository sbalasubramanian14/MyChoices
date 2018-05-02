using Newtonsoft.Json.Linq;
using NexGenRedAlert.Auth;
using NexGenRedAlert.contracts;
using NexGenRedAlert.Models;
using NexGenRedAlert.Views;
using System;
using System.Windows.Input;
using Xamarin.Auth;
using Xamarin.Forms;

namespace NexGenRedAlert.ViewModels
{
    public class LoginPageViewModel : BaseViewModel
    {
        public ICommand AuthenticateUser { get; }
        private ICredentialService credentialService;

        public static readonly string ClientId = "604822021872-052g10g9q6qpkkr1nlk2p6r5kqk6f0ke.apps.googleusercontent.com";
        public static readonly string GMAIL_REQUESTURL = "https://www.googleapis.com/oauth2/v2/userinfo";
        Xamarin.Auth.OAuth2Authenticator authenticator = null;

        public LoginPageViewModel()
        {
            this.credentialService = DependencyService.Get<ICredentialService>();
            AuthenticateUser = new Command(() => GoogleAuthentication());
        }

        private bool _isLoading;
        public bool IsLoading
        {
            get { return _isLoading; }
            set { SetProperty(ref _isLoading, value); }
        }

        public void GoogleAuthentication()
        {
            IsLoading = true;
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
            RedAlertUser redAlertUser;

            if (e.IsAuthenticated)
            {
                string userEmail = "";
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
                    userEmail = userData["email"].ToString();
                }
                
                redAlertUser = await App.AuthServices.PostAsyncValidateUser(userEmail);

                IsLoading = false;

                if (redAlertUser != null)
                {
                    this.credentialService.SaveCredentials(redAlertUser.UserName, redAlertUser.UserCode, redAlertUser.Organization,redAlertUser.RoleId);
                    Application.Current.MainPage = new NavigationPage(new MenuPage());
                }
                else
                {
                    await Application.Current.MainPage.DisplayAlert("Authentication", "Failed ! Contact your Admin.", "ok");
                }

            }
            else
            {
                IsLoading = false;
                await Application.Current.MainPage.DisplayAlert("Authentication", "Failed", "ok");
            }
        }

        void OnAuthError(object sender, AuthenticatorErrorEventArgs e)
        {
            var authenticator = sender as OAuth2Authenticator;

            Application.Current.MainPage.DisplayAlert("Authentication error", e.Message, "ok");
        }
    }
}
