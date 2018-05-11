using NexGenRedAlert.Models;
using NexGenRedAlert.ViewModels;
using System;
using System.Collections.Generic;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace NexGenRedAlert.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class PostSvpQCFormTabbedPage : TabbedPage
    {
        private PostSvpQCViewModel postSvpQCviewModel;
        private List<string> cvcStatusList = new List<string>();
        private List<string> yesOrNoList = new List<string>();
        public PostSvpQCFormTabbedPage ()
        {
            InitializeComponent();
            BindingContext = postSvpQCviewModel = new PostSvpQCViewModel();
            
            cvcStatusList.Add("Working Well");
            cvcStatusList.Add("Needs strengthening");
            cvcStatusList.Add("Needs to be created");

            yesOrNoList.Add("Yes");
            yesOrNoList.Add("No");

            CVCStatusPicker.ItemsSource = cvcStatusList;
            WasAnyAnotherClubFormedPicker.ItemsSource = yesOrNoList;
            WasVillageLeadershipProActivePicker.ItemsSource = yesOrNoList;
            DoVillagersRememberSVPPicker.ItemsSource = yesOrNoList;
            WasFollowUpDoneByNGOPicker.ItemsSource = yesOrNoList;
            AreInfoStickersIntactPicker.ItemsSource = yesOrNoList;
            IsVillageSafeForGirlsPicker.ItemsSource = yesOrNoList;
            DoPeopleRememberHelplinePicker.ItemsSource = yesOrNoList;
            WereIpFormsSubmittedPicker.ItemsSource = yesOrNoList;
        }

        public void OnClickChangeTab(object sender, EventArgs evt)
        {
            var parentPage = PageOne.Parent as TabbedPage;
            parentPage.CurrentPage = parentPage.Children[1];
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