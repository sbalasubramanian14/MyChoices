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

        public PostSvpViewModel()
        {
            SubmitPostSvpForm = new Command(async () => {
                await App.SvpServices.PostAsyncSavePostSvpForm(PostSvp);
                await Application.Current.MainPage.Navigation.PushAsync(new MainPage());
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
