using NexGenRedAlert.Models;
using NexGenRedAlert.ViewModels;
using System;
using System.Collections;
using System.Collections.Generic;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace NexGenRedAlert.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class PreSvpFormPage: ContentPage
	{
        PreSvpViewModel preSvpviewModel;
        private List<string> PreviousAwarenessList =new List<string>();
        private MultipickerPage<MultiselectItem> multipickerSourceOfIncomePage;
        private MultipickerPage<MultiselectItem> multipickerLocalIssuesPage;

        public PreSvpFormPage()
		{
			InitializeComponent ();
            BindingContext = preSvpviewModel = new PreSvpViewModel();
            PreSvpDatePicker.Date = DateTime.Now;
            PreviousAwarenessList.Add("Yes");
            PreviousAwarenessList.Add("No");
            PreviousAwarenessPicker.ItemsSource = PreviousAwarenessList;
        }

        async void OnResetClicked(object sender , EventArgs evt)
        {
            await Navigation.PushAsync( new PreSvpFormPage());
        }


        async void OnFocusedMajorEmploymentEntry(Object sender, EventArgs evt)
        {
            var selectedItemList = new List<MultiselectItem>
            {
                new MultiselectItem { Name = "Agriculture" },
                new MultiselectItem { Name = "Industrial" },
                new MultiselectItem { Name = "Casual Labour" },
                new MultiselectItem { Name = "Self-Employed" },
                new MultiselectItem { Name = "Other" }
            };
            if (multipickerSourceOfIncomePage == null)
            {
                multipickerSourceOfIncomePage = new MultipickerPage<MultiselectItem>(selectedItemList) { Title = "Choose Applicable" };
            }
            await Navigation.PushAsync(multipickerSourceOfIncomePage);
        }

        async void OnFocusedLocalIssuesEntry(object sender, EventArgs evt)
        {
            var selectedItemList = new List<MultiselectItem>
            {
                new MultiselectItem { Name = "Prone to Natural calamities" },
                new MultiselectItem { Name = "Lack of Livelihood options" },
                new MultiselectItem { Name = "Civil and Political unrest" },
                new MultiselectItem { Name = "Border Interstate" },
                new MultiselectItem { Name = "Border International" }
            };
            if (multipickerLocalIssuesPage == null)
            {
                multipickerLocalIssuesPage = new MultipickerPage<MultiselectItem>(selectedItemList) { Title = "Choose Applicable" };
            }
            await Navigation.PushAsync(multipickerLocalIssuesPage);

        }


        protected override void OnAppearing()
        {
            base.OnAppearing();

            if(multipickerSourceOfIncomePage != null)
            {
                MajorEmploymentEntry.Text = "";

                IList<MultiselectItem> selection = multipickerSourceOfIncomePage.GetSelection();
                string selectionString="";
                if (selection.Count != 0)
                {
                    foreach (var x in selection)
                    {
                        selectionString += x.Name + ", ";
                    }
                    MajorEmploymentEntry.Text = selectionString.Remove(selectionString.Length - 2);
                }
                else
                {
                    MajorEmploymentEntry.Text = "Choose Source of Income > ";
                }
            }

            if (multipickerLocalIssuesPage != null)
            {
                LocalIssuesEntry.Text = "";

                IList<MultiselectItem> selection = multipickerLocalIssuesPage.GetSelection();
                string selectionString = "";
                if (selection.Count != 0)
                {
                    foreach (var x in selection)
                    {
                        selectionString += x.Name + ", ";
                    }
                    LocalIssuesEntry.Text = selectionString.Remove(selectionString.Length - 2);
                }
                else
                {
                    LocalIssuesEntry.Text = "Choose Local Issues > ";
                }
            }

        }
    }
}