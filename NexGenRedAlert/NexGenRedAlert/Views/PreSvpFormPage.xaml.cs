using NexGenRedAlert.ViewModels;
using System;
using System.Collections.Generic;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace NexGenRedAlert.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class PreSvpFormPage: ContentPage
	{
        PreSvpViewModel preSvpviewModel;
        private List<string> PreviousAwarenessList =new List<string>();
        public PreSvpFormPage()
		{
			InitializeComponent ();
            BindingContext = preSvpviewModel = new PreSvpViewModel();
            PreSvpDatePicker.Date = DateTime.Now;
            PreviousAwarenessList.Add("Yes");
            PreviousAwarenessList.Add("No");
            PreviousAwarenessPicker.ItemsSource = PreviousAwarenessList;
        }

        async void OnResetClicked(object sender , EventArgs evt)
        {
            await Navigation.PushAsync( new PreSvpFormPage());
        }
    }
}