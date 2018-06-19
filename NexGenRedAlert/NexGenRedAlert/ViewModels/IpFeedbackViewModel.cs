using NexGenRedAlert.Models;
using System;
using System.Net.Http;
using System.Windows.Input;
using Xamarin.Forms;

namespace NexGenRedAlert.ViewModels
{
    class IpFeedbackViewModel: BaseViewModel
    {
        public ICommand SubmitIpFeedbackForm { get; }
        public string ipFeedbackNumber;
        public string alertMessage = "Submitted successfully !\nIP Feedback Number is : ";

        public IpFeedbackViewModel()
        {
            SubmitIpFeedbackForm = new Command(async () => {

                try
                {
                    IsLoading = true;
                    this.ipFeedbackNumber = await App.SvpServices.PostAsyncIpFeedbackForm(IpFeedback);
                    IsLoading = false;
                    if (String.IsNullOrEmpty(this.ipFeedbackNumber))
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", "Form Submission failed ! Check all fields and retry.", "Ok");
                    }
                    else
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", this.alertMessage + this.ipFeedbackNumber, "Ok");
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

        private IpFeedbackForm _ipFeedbackForm = new IpFeedbackForm();
        public IpFeedbackForm IpFeedback
        {
            get { return _ipFeedbackForm; }
            set { SetProperty(ref _ipFeedbackForm, value); }
        }

        private bool _isLoading;
        public bool IsLoading
        {
            get { return _isLoading; }
            set { SetProperty(ref _isLoading, value); }
        }
    }
}

