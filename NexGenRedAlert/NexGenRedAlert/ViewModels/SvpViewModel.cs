using NexGenRedAlert.Models;
using System;
using System.Net.Http;
using System.Windows.Input;
using Xamarin.Forms;

namespace NexGenRedAlert.ViewModels
{
    class SvpViewModel : BaseViewModel
    {
        public ICommand SubmitSvpForm { get; }
        public string svpNumber;
        public string alertMessage = "Submitted succesfully!\nSvpNumber is :";

        public SvpViewModel()
        {
            SubmitSvpForm = new Command(async () => {
                try
                {
                    IsLoading = true;
                    this.svpNumber = await App.SvpServices.PostAsyncSaveSvpForm(Svp);
                    IsLoading = false;
                    if (String.IsNullOrEmpty(this.svpNumber))
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", "Form Submission failed ! Check all fields and retry.", "Ok");
                    }
                    else
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", this.alertMessage + this.svpNumber, "Ok");
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

        private SvpForm _Svp = new SvpForm();
        public SvpForm Svp
        {
            get { return _Svp; }
            set { SetProperty(ref _Svp, value); }
        }

        private bool _isLoading;
        public bool IsLoading
        {
            get { return _isLoading; }
            set { SetProperty(ref _isLoading, value); }
        }
    }
}
