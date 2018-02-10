using NexGenRedAlert.contracts;
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
    class PreSvpViewModel : BaseViewModel
    {        
        public ICommand SubmitPreSvpForm { get; }
        public string preSvpNumber;
        public string AlertMessage="Submitted Succesfully !\nPreSvpNumber is :";

        public PreSvpViewModel()
        {
            SubmitPreSvpForm = new Command(async () => {
                IsLoading = true;
                this.preSvpNumber = await App.SvpServices.PostAsyncSavePreSvpForm((Models.PreSvpForm)PreSvp);
                IsLoading = false;
                if (string.IsNullOrEmpty(this.preSvpNumber))
                {
                    this.AlertMessage = "Form Submission failed ! Retry later";
                }
                await Application.Current.MainPage.DisplayAlert("Submission Status", this.AlertMessage + this.preSvpNumber, "Ok");

                await Application.Current.MainPage.Navigation.PopToRootAsync();
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
