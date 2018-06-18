using NexGenRedAlert.ViewModels;
using Syncfusion.SfPicker.XForms;
using System;
using System.Collections;
using System.Collections.Generic;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace NexGenRedAlert.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class RakshakMonthlyReportFormPage : ContentPage
	{
        RakshakMonthlyReportViewModel rakshakMonthlyReportViewModel;
        private List<string> YesNoList = new List<string>();

        public RakshakMonthlyReportFormPage()
        {
            InitializeComponent();
            BindingContext = rakshakMonthlyReportViewModel = new RakshakMonthlyReportViewModel();
            RakshakMonthlyReportMonthAndYearPicker.OkButtonClicked += MonthAndYearPicker_OkButtonClicked;
            YesNoList.Add("Yes");
            YesNoList.Add("No");

            WasCommunityMeetingHelpfulPicker.ItemsSource = YesNoList;
            WasProblemsReportedPicker.ItemsSource = YesNoList;
            WasRakshakActiveListPicker.ItemsSource = YesNoList;
            WasRakshakReportableListPicker.ItemsSource = YesNoList;
            WasSchoolDropoutsReportedPicker.ItemsSource = YesNoList;
        }

        async void OnResetClicked(object sender, EventArgs evt)
        {
            await Navigation.PushAsync(new RakshakMonthlyReportFormPage());
        }

        public void OnRakshakMonthlyReportMonthAndYearEntryFocused(object sender, EventArgs evt)
        {
            RakshakMonthlyReportMonthAndYearPicker.IsOpen = true;
        }

        private void MonthAndYearPicker_OkButtonClicked(object sender, SelectionChangedEventArgs e)
        {
            string MonthAndYear = "";
            if (e.NewValue is IEnumerable selectedValue)
            {
                foreach (object element in selectedValue)
                    MonthAndYear += element + ", ";
            }
            if (!String.IsNullOrEmpty(MonthAndYear))
                RakshakMonthlyReportMonthAndYearEntry.Text = MonthAndYear.Remove(MonthAndYear.Length - 2);
            RakshakMonthlyReportMonthAndYearEntry.Unfocus();
        }
    }
}