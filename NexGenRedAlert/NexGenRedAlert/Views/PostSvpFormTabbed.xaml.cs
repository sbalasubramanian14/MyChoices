using NexGenRedAlert.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace NexGenRedAlert.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class PostSvpFormTabbed : TabbedPage
    {
        PostSvpViewModel postSvpviewModel;
        private List<string> OraVisitedList = new List<string>();
        public PostSvpFormTabbed ()
        {
            InitializeComponent();
            BindingContext = postSvpviewModel = new PostSvpViewModel();

            SvpDatePicker.Date = DateTime.Now;

            OraVisitedList.Add("Yes");
            OraVisitedList.Add("No");
            ORAVisitedEntry.ItemsSource = OraVisitedList;
        }

        public void onClickChangeTab(object sender, EventArgs evt)
        {
            var parentPage =  pageTwo.Parent as TabbedPage;
            parentPage.CurrentPage = parentPage.Children[1];
        }

        async void OnResetClicked(object sender, EventArgs evt)
        {
            await Navigation.PushAsync(new PostSvpFormTabbed());
        }


    }
}