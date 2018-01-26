using NexGenRedAlert.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace NexGenRedAlert.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class PreSvpForm : ContentPage
	{
        PreSvpViewModel preSvpviewModel;
        private List<string> PreviousAwarenessList =new List<string>();
        public PreSvpForm ()
		{
			InitializeComponent ();
            BindingContext = preSvpviewModel = new PreSvpViewModel();
		}

        async void OnResetClicked(object sender , EventArgs evt)
        {
            await Navigation.PushAsync(new NavigationPage( new PreSvpForm()));
        }
    }
}