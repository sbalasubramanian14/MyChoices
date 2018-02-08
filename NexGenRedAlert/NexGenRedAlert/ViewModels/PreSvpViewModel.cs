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
        public string AlertMessage="Submitted Succesfully!\nPreSvpNumber is :";

        public PreSvpViewModel()
        {
            SubmitPreSvpForm = new Command(async () => {
            this.preSvpNumber =await App.SvpServices.PostAsyncSavePreSvpForm(PreSvp);
                if (string.IsNullOrEmpty(this.preSvpNumber))
                {
                    this.AlertMessage = "Form Submission failed ! Retry later";
                }                   

            await Application.Current.MainPage.DisplayAlert("Submission Status", this.AlertMessage+this.preSvpNumber, "Ok");

            await Application.Current.MainPage.Navigation.PopAsync();
            });
        }

        private PreSvp _PreSvp = new PreSvp();
        public PreSvp PreSvp
        {
            get { return _PreSvp; }
            set { SetProperty(ref _PreSvp, value); }
        }
    }
}
