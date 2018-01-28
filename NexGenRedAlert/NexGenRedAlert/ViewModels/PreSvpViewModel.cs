using NexGenRedAlert.Models;
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
        public PreSvp PreSvp = new PreSvp();
        public ICommand SubmitPreSvpForm { get; }

        private ObservableCollection<string> _previousAwarenessList = new ObservableCollection<string>();

        public PreSvpViewModel()
        {
            SubmitPreSvpForm = new Command(async () => await App.SvpServices.PostAsyncSavePreSvpForm(PreSvp));
        }
        
        public ObservableCollection<string> PreviousAwarenessList
        {
            get
            {
                _previousAwarenessList.Add("Yes");
                _previousAwarenessList.Add("No");
                return _previousAwarenessList;
            }
            set { SetProperty(ref _previousAwarenessList, value); }
        }
    }
}
