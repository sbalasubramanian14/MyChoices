using NexGenRedAlert.Models;
using NexGenRedAlert.ViewModels;
using System;
using System.Collections.Generic;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace NexGenRedAlert.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SvpQCFormTabbedPage : TabbedPage
    {
        private SvpQCViewModel svpQCviewModel;
        private List<string> yesOrNoList = new List<string>();
        private List<string> CVCStatusList = new List<string>();

        public SvpQCFormTabbedPage ()
        {
            InitializeComponent();
            BindingContext = svpQCviewModel = new SvpQCViewModel();
            yesOrNoList.Add("Yes");
            yesOrNoList.Add("No");
            CVCStatusList.Add("Working well");
            CVCStatusList.Add("Needs strengthening");
            CVCStatusList.Add("Needs to be created");
            CVCStatusPicker.ItemsSource = CVCStatusList;
            InitYesOrNoPickers();

        }

        public void InitYesOrNoPickers()
        {
            AreStakeholdersAwarePicker.ItemsSource = yesOrNoList;
            WasStickersPutUpPicker.ItemsSource = yesOrNoList;
            WasProtocolFollowedPicker.ItemsSource = yesOrNoList;
            WereEquipmentsWorkingProperlyPicker.ItemsSource = yesOrNoList;
            WereAllProgramStartedInTimePicker.ItemsSource = yesOrNoList;
            WasGuardianGirlConductedPicker.ItemsSource = yesOrNoList;
            DidGirlsTakeOathPicker.ItemsSource = yesOrNoList;
            WasCoolBoysConductedPicker.ItemsSource = yesOrNoList;
            DidBoysTakeOathPicker.ItemsSource = yesOrNoList;
            WasSkitConductedPicker.ItemsSource = yesOrNoList;
            WereFilmsUsedInSchoolProgramPicker.ItemsSource = yesOrNoList;
            WasMyRightsMentionedPicker.ItemsSource = yesOrNoList;
            WasMotherProgramConductedPicker.ItemsSource = yesOrNoList;
            WereFilmsUsedInMothersProgramPicker.ItemsSource = yesOrNoList;
            WasFathersProgramConductedPicker.ItemsSource = yesOrNoList;
            WereFilmsUsedInFathersProgramPicker.ItemsSource = yesOrNoList;
            DidTeamMeetSarpanchPicker.ItemsSource = yesOrNoList;
            DidTeamMeetPolicePicker.ItemsSource = yesOrNoList;
            DidTeamMeetSchoolStaffPicker.ItemsSource = yesOrNoList;
            DidTeamMeetAnganwadiHeadPicker.ItemsSource = yesOrNoList;
            DidTeamVisitedSchoolOnSecondDayPicker.ItemsSource = yesOrNoList;
            WasRakshakIdentifiedPicker.ItemsSource = yesOrNoList;
            WasRakshakRegistrationDonePicker.ItemsSource = yesOrNoList;
            WasCertificateGivenToSchoolPicker.ItemsSource = yesOrNoList;

        }
        public void OnClickChangeTab(object sender, EventArgs evt)
        {
            Button nextButton = (Button)sender;
            var parentPage = PageOne.Parent as TabbedPage;
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