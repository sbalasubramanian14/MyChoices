using NexGenRedAlert.Models;
using NexGenRedAlert.ViewModels;
using System;
using System.Collections.Generic;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace NexGenRedAlert.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class RakshakRegistrationFormPage : ContentPage
	{
        RakshakRegistrationViewModel rakshakRegistrationViewModel;
        private List<string> GenderList = new List<string>();
        public RakshakRegistrationFormPage ()
		{
			InitializeComponent ();
            BindingContext = rakshakRegistrationViewModel = new RakshakRegistrationViewModel();
            GenderList.Add("Male");
            GenderList.Add("Female");
            GenderList.Add("Other");
            GenderPicker.ItemsSource = GenderList;
		}

        async void OnResetClicked(object sender, EventArgs evt)
        {
            await Navigation.PushAsync(new PreSvpFormPage());
        }

        public async void OnUnfocusedVillageCodeEntryAsync(object sender, EventArgs evt)
        {
            VillageProfile villageProfile = await App.SQLiteDatabaseServices.GetVillageAsync(VillageCodeEntry.Text);

            if (villageProfile != null)
            {
                VillageProfileLabel.Text = $"Village: {villageProfile.VillageName} ,{villageProfile.DistrictName}";
            }
            else
            {
                VillageProfileLabel.Text = "Invalid Village code";
            }

            VillageProfileFrame.IsVisible = true;
        }
    }
}