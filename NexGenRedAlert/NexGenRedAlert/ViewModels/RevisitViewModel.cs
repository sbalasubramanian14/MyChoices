
using NexGenRedAlert.Models;
using System;
using System.Net.Http;
using System.Windows.Input;
using Xamarin.Forms;

namespace NexGenRedAlert.ViewModels
{
    public class RevisitViewModel : BaseViewModel
    {
        public ICommand SubmitRevisitForm { get; }
        public string revisitNumber;
        public string alertMessage = "Submitted successfully!\nRevisitNumber is :";

        public RevisitViewModel ()
        {
            SubmitRevisitForm = new Command(async () => {

                try
                {
                    IsLoading = true;
                    this.revisitNumber = await App.SvpServices.PostAsyncSaveRevisitForm(Revisit);
                    IsLoading = false;
                    if (String.IsNullOrEmpty(this.revisitNumber))
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", "Form Submission failed ! Check all fields and retry.", "Ok");
                    }
                    else
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", this.alertMessage + this.revisitNumber, "Ok");
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
        private RevisitForm _revisit = new RevisitForm();
        public RevisitForm Revisit
        {
            get { return _revisit; }
            set { SetProperty(ref _revisit, value); }
        }

        private bool _isLoading;
        public bool IsLoading
        {
            get { return _isLoading; }
            set { SetProperty(ref _isLoading, value); }
        }
    }
}
