using NexGenRedAlert.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;

namespace NexGenRedAlert.ViewModels
{
    class PreSvpViewModel : BaseViewModel
    {
        public PreSvp PreSvp { get; set; }
        private ObservableCollection<string> _previousAwarenessList = new ObservableCollection<string>();

        public PreSvpViewModel(PreSvp preSvp = null)
        {
            PreSvp = preSvp;
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
