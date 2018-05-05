using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using NexGenRedAlert.Models;
using NexGenRedAlert.ViewModels;
using System.Collections.Generic;

namespace NexGenRedAlert.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class PreSvpQCFormPage : ContentPage
	{
        private PreSvpQCViewModel preSvpQCviewModel;
        private List<string> CommunicationLevelList = new List<string>();
        private List<string> CVCStatusList = new List<string>();
        private List<string> YesOrNoList = new List<string>();

        public PreSvpQCFormPage ()
		{
			InitializeComponent ();
            BindingContext = preSvpQCviewModel = new PreSvpQCViewModel();

            CommunicationLevelList.Add("Good");
            CommunicationLevelList.Add("Average");
            CommunicationLevelList.Add("Needs improvement");

            CVCStatusList.Add("Working Well");
            CVCStatusList.Add("Needs strengthening");
            CVCStatusList.Add("Needs to be created");

            YesOrNoList.Add("Yes");
            YesOrNoList.Add("No");

            IpFacilitatorCommunicationSkillLevelPicker.ItemsSource = CommunicationLevelList;
            CVCStatusPicker.ItemsSource = CVCStatusList;
            WasLogisticArrangementsMadePicker.ItemsSource = YesOrNoList;
            AreVillagersInterestedPicker.ItemsSource = YesOrNoList;
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

        async void OnResetClicked(object sender, EventArgs evt)
        {
            await Navigation.PushAsync(new PreSvpFormPage());
        }
    }
}