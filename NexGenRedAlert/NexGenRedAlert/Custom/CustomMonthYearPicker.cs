using Syncfusion.SfPicker.XForms;
using System;
using System.Collections.ObjectModel;
using System.Globalization;
using Xamarin.Forms;

namespace NexGenRedAlert.Custom
{
    public class CustomMonthYearPicker: SfPicker
    {
        #region
        internal ObservableCollection<Object> Month { get; set; }
        internal ObservableCollection<object> Year { get; set; }
        internal ObservableCollection<object> MonthAndYear { get; set; }
        public ObservableCollection<string> Headers { get; set; }
        #endregion

        public CustomMonthYearPicker()
        {
            MonthAndYear = new ObservableCollection<object>();
            Month = new ObservableCollection<object>();
            Year = new ObservableCollection<object>();
            Headers = new ObservableCollection<string>();

            PopulateMonthAndYear();

            // Formatting the Picker
            Headers.Add("Month");
            Headers.Add("Year");
            SelectedItemTextColor = Color.Black;
            UnSelectedItemTextColor = Color.Navy;
            this.ItemsSource = MonthAndYear;
            HeaderText = "Month and Year";
            ShowHeader = true;
            ShowColumnHeader = false;
            ShowFooter = true;
        }

        private void PopulateMonthAndYear()
        {
            // Populate Year
            for (int i=2018; i<2100; i++)
            {
                Year.Add(i.ToString());
            }

            // Populate Month
            for( int i=1; i<13; i++)
            {
               Month.Add(DateTimeFormatInfo.CurrentInfo.GetMonthName(i));
            }
            MonthAndYear.Add(Month);
            MonthAndYear.Add(Year);
        }
    }
}