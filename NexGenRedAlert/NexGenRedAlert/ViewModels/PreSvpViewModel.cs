using NexGenRedAlert.contracts;
using NexGenRedAlert.Models;
using NexGenRedAlert.Views;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;

namespace NexGenRedAlert.ViewModels
{
    class PreSvpViewModel : BaseViewModel
    {
        public string result;
        public ICommand SubmitPreSvpForm { get; }

        public PreSvpViewModel()
        {
            SubmitPreSvpForm = new Command(async () => {
            this.result =await App.SvpServices.PostAsyncSavePreSvpForm(PreSvp);

            DependencyService.Get<ToastMessage>().ShortAlert("Submission Successful");

            await Application.Current.MainPage.Navigation.PushAsync(new MainPage());
            });
        }

        private PreSvp _PreSvp = new PreSvp();
        public PreSvp PreSvp
        {
            get { return _PreSvp; }
            set { SetProperty(ref _PreSvp, value); }
        }
    }
}
