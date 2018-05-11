using NexGenRedAlert.Models;
using System;
using System.Net.Http;
using System.Windows.Input;
using Xamarin.Forms;

namespace NexGenRedAlert.ViewModels
{
    public class PostSvpQCViewModel : BaseViewModel
    {
        public ICommand SubmitPostSvpQCForm { get; }
        public string postSvpQCNumber;
        public string alertMessage = "Submitted successfully !\nPostSvpQCNumber is :";

        public PostSvpQCViewModel()
        {
            SubmitPostSvpQCForm = new Command(async () => {

                try
                {
                    IsLoading = true;
                    this.postSvpQCNumber = await App.SvpServices.PostAsyncSavePostSvpQCForm(PostSvpQC);
                    IsLoading = false;
                    if (String.IsNullOrEmpty(this.postSvpQCNumber))
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", "Form Submission failed ! Check all fields and retry.", "Ok");
                    }
                    else
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", this.alertMessage + this.postSvpQCNumber, "Ok");
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

        private PostSvpQCForm _postSvpQC = new PostSvpQCForm();
        public PostSvpQCForm PostSvpQC
        {
            get { return _postSvpQC; }
            set { SetProperty(ref _postSvpQC, value); }
        }

        private bool _isLoading;
        public bool IsLoading
        {
            get { return _isLoading; }
            set { SetProperty(ref _isLoading, value); }
        }
    }
}
