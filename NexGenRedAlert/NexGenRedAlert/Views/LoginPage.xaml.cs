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
        LoginPageViewModel loginPageViewModel;
        public LoginPage()
        {
            InitializeComponent();
            BindingContext = loginPageViewModel = new LoginPageViewModel();
        }
    }
}