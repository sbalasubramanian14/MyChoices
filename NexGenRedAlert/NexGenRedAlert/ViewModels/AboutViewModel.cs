using System;
using System.Windows.Input;

using Xamarin.Forms;

namespace NexGenRedAlert.ViewModels
{
    public class AboutViewModel : BaseViewModel
    {
        public AboutViewModel()
        {
            Title = "About";

            OpenWebCommand = new Command(() => Device.OpenUri(new Uri("http://mychoicesfoundation.org/")));
        }

        public ICommand OpenWebCommand { get; }
    }
}