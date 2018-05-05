using NexGenRedAlert.Models;
using System;
using System.Net.Http;
using System.Windows.Input;
using Xamarin.Forms;

namespace NexGenRedAlert.ViewModels
{
    public class PreSvpQCViewModel :BaseViewModel
    {
        public ICommand SubmitPreSvpQCForm { get; }
        public string preSvpQCNumber;
        public string alertMessage = "Submitted successfully !\nPreSvpQCNumber is :";

        public PreSvpQCViewModel()
        {
            SubmitPreSvpQCForm = new Command(async () => {

                try
                {
                    IsLoading = true;
                    this.preSvpQCNumber = await App.SvpServices.PostAsyncSavePreSvpQCForm(PreSvpQC);
                    IsLoading = false;
                    if (String.IsNullOrEmpty(this.preSvpQCNumber))
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", "Form Submission failed ! Check all fields and retry.", "Ok");
                    }
                    else
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", this.alertMessage + this.preSvpQCNumber, "Ok");
                        await Application.Current.MainPage.Navigation.PopToRootAsync();
                    }
                }
                catch (HttpRequestException ex)
                {
                    IsLoading = false;
                    await Application.Current.MainPage.DisplayAlert("Submission Status", "Network Issues, Try later !", "Ok");
                }
            });
        }

        private PreSvpQCForm _preSvpQC = new PreSvpQCForm();
        public PreSvpQCForm PreSvpQC
        {
            get { return _preSvpQC; }
            set { SetProperty(ref _preSvpQC, value); }
        }

        private bool _isLoading;
        public bool IsLoading
        {
            get { return _isLoading; }
            set { SetProperty(ref _isLoading, value); }
        }
    }
}
