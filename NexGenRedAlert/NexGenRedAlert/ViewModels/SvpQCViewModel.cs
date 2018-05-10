using NexGenRedAlert.Models;
using System;
using System.Net.Http;
using System.Windows.Input;
using Xamarin.Forms;

namespace NexGenRedAlert.ViewModels
{
    public class SvpQCViewModel : BaseViewModel
    {
        public ICommand SubmitSvpQCForm { get; }
        public string svpQCNumber;
        public string alertMessage = "Submitted successfully !\nSvpQCNumber is :";

        public SvpQCViewModel()
        {
            SubmitSvpQCForm = new Command(async () => {

                try
                {
                    IsLoading = true;
                    this.svpQCNumber = await App.SvpServices.PostAsyncSaveSvpQCForm(SvpQC);
                    IsLoading = false;
                    if (String.IsNullOrEmpty(this.svpQCNumber))
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", "Form Submission failed ! Check all fields and retry.", "Ok");
                    }
                    else
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", this.alertMessage + this.svpQCNumber, "Ok");
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

        private SvpQCForm _svpQC = new SvpQCForm();
        public SvpQCForm SvpQC
        {
            get { return _svpQC; }
            set { SetProperty(ref _svpQC, value); }
        }

        private bool _isLoading;
        public bool IsLoading
        {
            get { return _isLoading; }
            set { SetProperty(ref _isLoading, value); }
        }
    }
}
