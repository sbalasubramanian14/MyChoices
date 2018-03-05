using NexGenRedAlert.Models;
using System;
using System.Net.Http;
using System.Windows.Input;
using Xamarin.Forms;

namespace NexGenRedAlert.ViewModels
{
    class PreSvpViewModel : BaseViewModel
    {        
        public ICommand SubmitPreSvpForm { get; }
        public string preSvpNumber;
        public string alertMessage="Submitted succesfully !\nPreSvpNumber is :";

        public PreSvpViewModel()
        {
            SubmitPreSvpForm = new Command(async () => {

                try
                {
                    IsLoading = true;
                    this.preSvpNumber = await App.SvpServices.PostAsyncSavePreSvpForm(PreSvp);
                    IsLoading = false;
                    if(String.IsNullOrEmpty(this.preSvpNumber))
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", "Form Submission failed ! Check all fields and retry.", "Ok");
                    }
                    else
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", this.alertMessage + this.preSvpNumber, "Ok");
                        await Application.Current.MainPage.Navigation.PopToRootAsync();
                    }                    
                }
                catch(HttpRequestException ex)
                {
                    IsLoading = false;
                    await Application.Current.MainPage.DisplayAlert("Submission Status","Network Issues, Try later !", "Ok");
                }
            });
        }

        private Models.PreSvpForm _PreSvp = new Models.PreSvpForm();
        public PreSvpForm PreSvp
        {
            get { return _PreSvp; }
            set { SetProperty(ref _PreSvp, value); }
        }

        private bool _isLoading;
        public bool IsLoading
        {
            get { return _isLoading; }
            set { SetProperty(ref _isLoading, value); }
        }
    }
}
