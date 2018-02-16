using NexGenRedAlert.ViewModels;
using System;
using System.Collections.Generic;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace NexGenRedAlert.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SvpFormTabbedPage : TabbedPage
    {
        SvpViewModel svpViewModel;
        private List<string> OraVisitedList = new List<string>();
        public SvpFormTabbedPage ()
        {
            InitializeComponent();
            BindingContext = svpViewModel = new SvpViewModel();

            SvpDatePicker.Date = DateTime.Now;

            OraVisitedList.Add("Yes");
            OraVisitedList.Add("No");
            ORAVisitedEntry.ItemsSource = OraVisitedList;
        }

        public void onClickChangeTab(object sender, EventArgs evt)
        {
            var parentPage =  pageTwo.Parent as TabbedPage;
            parentPage.CurrentPage = parentPage.Children[1];
        }

        async void OnResetClicked(object sender, EventArgs evt)
        {
            await Navigation.PushAsync(new SvpFormTabbedPage());
        }
    }
}