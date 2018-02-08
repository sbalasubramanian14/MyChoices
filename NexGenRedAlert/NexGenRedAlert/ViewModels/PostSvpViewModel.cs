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
    class PostSvpViewModel : BaseViewModel
    {
        public ICommand SubmitPostSvpForm { get; }
        public string svpNumber;
        public string AlertMessage = "Submitted Succesfully!\nSvpNumber is :";

        public PostSvpViewModel()
        {
            SubmitPostSvpForm = new Command(async () => {
                this.svpNumber=await App.SvpServices.PostAsyncSaveSvpForm(PostSvp);
                if (string.IsNullOrEmpty(this.svpNumber))
                {
                    this.AlertMessage = "Form Submission failed ! Retry later";
                }

                await Application.Current.MainPage.DisplayAlert("Submission Status", this.AlertMessage + this.svpNumber, "Ok");
                await Application.Current.MainPage.Navigation.PopAsync(); 
            });
        }

        private PostSvp _PostSvp = new PostSvp();
        public PostSvp PostSvp
        {
            get { return _PostSvp; }
            set { SetProperty(ref _PostSvp, value); }
        }
    }
}
