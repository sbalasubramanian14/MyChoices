using NexGenRedAlert.Models;
using System;
using System.Net.Http;
using System.Windows.Input;
using Xamarin.Forms;

namespace NexGenRedAlert.ViewModels
{
    public class RakshakRegistrationViewModel : BaseViewModel
    {
        public ICommand SubmitRakshakRegistrationForm { get; }
        public string rakshakRegistrationNumber;
        public string alertMessage = "Submitted successfully !\nRakshak Registration Number is : ";

        public RakshakRegistrationViewModel()
        {
            SubmitRakshakRegistrationForm = new Command(async () => {

                try
                {
                    IsLoading = true;
                    this.rakshakRegistrationNumber = await App.SvpServices.PostAsyncSaveRakshakRegistrationForm(RakshakRegistration);
                    IsLoading = false;
                    if (String.IsNullOrEmpty(this.rakshakRegistrationNumber))
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", "Form Submission failed ! Check all fields and retry.", "Ok");
                    }
                    else
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", this.alertMessage + this.rakshakRegistrationNumber, "Ok");
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

        private RakshakRegistrationForm _rakshakRegistrationForm = new RakshakRegistrationForm();
        public RakshakRegistrationForm RakshakRegistration
        {
            get { return _rakshakRegistrationForm; }
            set { SetProperty(ref _rakshakRegistrationForm, value); }
        }

        private bool _isLoading;
        public bool IsLoading
        {
            get { return _isLoading; }
            set { SetProperty(ref _isLoading, value); }
        }
    }
}
