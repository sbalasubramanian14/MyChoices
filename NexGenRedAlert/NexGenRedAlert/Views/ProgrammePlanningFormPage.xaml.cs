using NexGenRedAlert.Models;
using NexGenRedAlert.ViewModels;
using System;
using System.Collections;
using System.Collections.Generic;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace NexGenRedAlert.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class ProgrammePlanningFormPage : ContentPage
	{
        private List<string> ProgrammeTypeList = new List<string>();
        private ProgrammePlanningViewModel programPlanningViewModel;
        public ProgrammePlanningFormPage()
		{
			InitializeComponent ();
            BindingContext = programPlanningViewModel = new ProgrammePlanningViewModel();
            PlannedPreSvpDatePicker.Date = DateTime.Now;
            PlannedSvpDatePicker.Date = DateTime.Now;
            ProgrammeTypeList.Add("SVP");
            ProgrammeTypeList.Add("Revisit");
            PlanningTypePicker.ItemsSource = ProgrammeTypeList;
            PlanningMonthAndYearPicker.OkButtonClicked += Month_OkButtonClicked;
        }

        public void OnPlanningMonthAndYearEntryFocused(object sender, EventArgs evt)
        {
            PlanningMonthAndYearPicker.IsOpen = true;
        }

        private void Month_OkButtonClicked(object sender, Syncfusion.SfPicker.XForms.SelectionChangedEventArgs e)
        {
            string MonthAndYear = "";
            if (e.NewValue is IEnumerable selectedValue)
            {
                foreach (object element in selectedValue)
                    MonthAndYear += element + ", ";
            }
            PlanningMonthAndYearEntry.Text = MonthAndYear.Remove(MonthAndYear.Length-2);
            VillageCodeEntry.Focus();
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
            await Navigation.PushAsync(new ProgrammePlanningFormPage());
        }
    }
}