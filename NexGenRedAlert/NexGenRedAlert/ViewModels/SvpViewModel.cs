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
        public ICommand SubmitSvpForm { get; }
        public string svpNumber;
        public string AlertMessage = "Submitted Succesfully!\nSvpNumber is :";

        public SvpViewModel()
        {
            SubmitSvpForm = new Command(async () => {
                IsLoading = true;
                this.svpNumber=await App.SvpServices.PostAsyncSaveSvpForm(Svp);
                IsLoading = false;
                if (string.IsNullOrEmpty(this.svpNumber))
                {
                    this.AlertMessage = "Form Submission failed ! Retry later";
                }

                await Application.Current.MainPage.DisplayAlert("Submission Status", this.AlertMessage + this.svpNumber, "Ok");
                await Application.Current.MainPage.Navigation.PopToRootAsync(); 
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
