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
    class SvpViewModel : BaseViewModel
    {
        public ICommand SubmitPostSvpForm { get; }
        public string svpNumber;
        public string AlertMessage = "Submitted Succesfully!\nSvpNumber is :";

        public SvpViewModel()
        {
            SubmitPostSvpForm = new Command(async () => {
                IsLoading = true;
                this.svpNumber=await App.SvpServices.PostAsyncSaveSvpForm(PostSvp);
                IsLoading = false;
                if (string.IsNullOrEmpty(this.svpNumber))
                {
                    this.AlertMessage = "Form Submission failed ! Retry later";
                }

                await Application.Current.MainPage.DisplayAlert("Submission Status", this.AlertMessage + this.svpNumber, "Ok");
                await Application.Current.MainPage.Navigation.PopToRootAsync(); 
            });
        }

        private SvpForm _PostSvp = new SvpForm();
        public SvpForm PostSvp
        {
            get { return _PostSvp; }
            set { SetProperty(ref _PostSvp, value); }
        }

        private bool _isLoading;
        public bool IsLoading
        {
            get { return _isLoading; }
            set { SetProperty(ref _isLoading, value); }
        }
    }
}
