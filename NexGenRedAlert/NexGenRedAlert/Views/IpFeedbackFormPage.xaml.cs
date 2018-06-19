using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using NexGenRedAlert.ViewModels;

namespace NexGenRedAlert.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class IpFeedbackFormPage : ContentPage
	{
        private IpFeedbackViewModel ipFeedbackViewModel;
        private List<string> YesOrNoList = new List<string>()
        {
            "Yes",
            "No"
        };

		public IpFeedbackFormPage ()
		{
			InitializeComponent ();

            WasDifferenceMadeBySVPpicker.ItemsSource = YesOrNoList;
            DidStateCoordinatorGaveSatisfiedGuidancePicker.ItemsSource = YesOrNoList;
            WasStateCoordinatorHelpfulInFollowupPicker.ItemsSource = YesOrNoList;
            DidStateCoordinatorVisitPicker.ItemsSource = YesOrNoList;

            BindingContext = ipFeedbackViewModel = new IpFeedbackViewModel();
        }
   
        async void OnResetClicked(object sender, EventArgs evt)
        {
            await Navigation.PushAsync(new ProgrammePlanningFormPage());
        }
    }
}