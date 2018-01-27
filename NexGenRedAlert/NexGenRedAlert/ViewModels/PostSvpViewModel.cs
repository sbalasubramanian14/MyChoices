using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;

namespace NexGenRedAlert.ViewModels
{
    

    class PostSvpViewModel : BaseViewModel
    {
        private ObservableCollection<string> _ORAVisitedListList = new ObservableCollection<string>();
        public ObservableCollection<string> ORAVisitedList
        {
            get
            {
                _ORAVisitedListList.Add("Yes");
                _ORAVisitedListList.Add("No");
                return _ORAVisitedListList;
            }
            set { SetProperty(ref _ORAVisitedListList, value); }
        }
    }
    

    
}
