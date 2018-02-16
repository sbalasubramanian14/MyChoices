using NexGenRedAlert.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace NexGenRedAlert.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LoginPage : ContentPage
    {
        LoginPageViewModel loginPageViewModel;
        public LoginPage()
        {
            InitializeComponent();
            BindingContext = loginPageViewModel = new LoginPageViewModel();
        }
    }
}