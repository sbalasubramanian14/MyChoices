using Android;
using NexGenRedAlert.Models;
using NexGenRedAlert.ViewModels;
using System;
using System.Collections.Generic;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace NexGenRedAlert.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class RevisitFormTabbedPage : TabbedPage
    {

        RevisitViewModel revisitViewModel;
        private List<string> DropdownList = new List<string>();

        public RevisitFormTabbedPage ()
        {
            InitializeComponent();
            BindingContext = revisitViewModel = new RevisitViewModel();
            DropdownList.Add("Yes");
            DropdownList.Add("No");
            IsStrategicNetworkingHelpfulPicker.ItemsSource = DropdownList;
            IsVillageLeadershipHelpfulPicker.ItemsSource = DropdownList;
            IsCVCActivePicker.ItemsSource = DropdownList;
            DoFathersRememberSVPPicker.ItemsSource = DropdownList;
            DoMothersRememberSVPPicker.ItemsSource = DropdownList;
            DoGirlsRememberSVPPicker.ItemsSource = DropdownList;
            DoBoysRememberSVPPicker.ItemsSource = DropdownList;
            DoVillageEldersRememberSVPPicker.ItemsSource = DropdownList;
            DoPoliceRememberSVPPicker.ItemsSource = DropdownList;
            DoSchoolStaffRememberSVPPicker.ItemsSource = DropdownList;
            WasSkitConductedPicker.ItemsSource = DropdownList;
            WereCallsMadeToORAHelplinePicker.ItemsSource = DropdownList;
            IsAnotherSVPRequiredPicker.ItemsSource = DropdownList;
            WasHelplineNumberMentionedPicker.ItemsSource = DropdownList;
        }

        public void OnClickChangeTab(object sender, EventArgs evt)
        {
            Button nextButton = (Button)sender;
            var parentPage = pageOne.Parent as TabbedPage;
            switch (nextButton.ClassId)
            {
                case "Page1":
                    CurrentPage = parentPage.Children[1];
                    break;
                case "Page2":
                    CurrentPage = parentPage.Children[2];
                    break;
                case "Page3":
                    CurrentPage = parentPage.Children[3];
                    break;
            }
        }

        async void OnResetClicked(object sender, EventArgs evt)
        {
            await Navigation.PushAsync(new SvpFormTabbedPage());
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