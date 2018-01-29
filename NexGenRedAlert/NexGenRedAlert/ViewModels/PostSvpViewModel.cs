﻿using NexGenRedAlert.Models;
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
        private ObservableCollection<string> _ORAVisitedListList = new ObservableCollection<string>();

        public PostSvpViewModel()
        {
            SubmitPostSvpForm = new Command(async () => await App.SvpServices.PostAsyncSavePostSvpForm(PostSvp));
        }

        private PostSvp _PostSvp = new PostSvp();
        public PostSvp PostSvp
        {
            get { return _PostSvp; }
            set { SetProperty(ref _PostSvp, value); }
        }
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
