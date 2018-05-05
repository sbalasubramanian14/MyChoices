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
        }

        async void OpenPlanningFormPage(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new ProgrammePlanningFormPage());
        }

        async void OpenPreSvpFormPage(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new PreSvpFormPage());
        }

        async void OpenSvpFormPage(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new SvpFormTabbedPage());
        }

        async void OpenRevisitFormPage(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new RevisitFormTabbedPage());
        }

        async void OpenPreSvpQCFormPage(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new PreSvpQCFormPage());
        }
    }
}