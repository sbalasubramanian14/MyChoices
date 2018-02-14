using NexGenRedAlert.ViewModels;
using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace NexGenRedAlert.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MenuPage : ContentPage
    {
        MenuPageViewModel menuPageViewModel;

        public MenuPage()
        {
            InitializeComponent();
            BindingContext = menuPageViewModel = new MenuPageViewModel();
            activityIndicator.IsVisible = false;
        }

        async void OpenPreSvpPage(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new PreSvpFormPage());
        }

        async void OpenPostSvpPage(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new SvpFormTabbedPage());
        }

        async void OpenAboutPage(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new AboutPage());
        }
    }
}