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
        public PostSvpFormTabbed ()
        {
            InitializeComponent();
            BindingContext = postSvpviewModel = new PostSvpViewModel();
        }

        public void onClickChangeTab(object sender, EventArgs evt)
        {
            var parentPage =  page2.Parent as TabbedPage;
            parentPage.CurrentPage = parentPage.Children[1];
        }


    }
}