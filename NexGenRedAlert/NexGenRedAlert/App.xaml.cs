using System;
using Newtonsoft.Json;
using NexGenRedAlert.Services;
using NexGenRedAlert.Views;
using Xamarin.Forms;

namespace NexGenRedAlert
{
	public partial class App : Application
	{
        static SvpServices SvpService;

        public App ()
		{
			InitializeComponent();

            MainPage = new NavigationPage(new MainPage());
        }

		protected override void OnStart ()
		{
			// Handle when your app starts
		}

		protected override void OnSleep ()
		{
			// Handle when your app sleeps
		}

		protected override void OnResume ()
		{
			// Handle when your app resumes
		}
        public static SvpServices SvpServices
        {
            get
            {
                if (SvpService == null)
                {
                    SvpService = new SvpServices();
                }
                return SvpService;
            }
        }

    }
}
