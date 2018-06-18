using NexGenRedAlert.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;

namespace NexGenRedAlert.ViewModels
{
    public class RakshakMonthlyReportViewModel : BaseViewModel
    {
        public ICommand SubmitRakshakMonthlyReportForm { get; }
        public string rakshakMonthlyReportNumber;
        public string alertMessage = "Submitted successfully !\nRakshak Registration Monthly Report Number is : ";

        public RakshakMonthlyReportViewModel()
        {
            SubmitRakshakMonthlyReportForm = new Command(async () => {

                try
                {
                    IsLoading = true;
                    this.rakshakMonthlyReportNumber = await App.SvpServices.PostAsyncSaveRakshakMonthlyReportForm(RakshakMonthlyReport);
                    IsLoading = false;
                    if (String.IsNullOrEmpty(this.rakshakMonthlyReportNumber))
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", "Form Submission failed ! Check all fields and retry.", "Ok");
                    }
                    else
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", this.alertMessage + this.rakshakMonthlyReportNumber, "Ok");
                        await Application.Current.MainPage.Navigation.PopToRootAsync();
                    }
                }
                catch (HttpRequestException ex)
                {
                    IsLoading = false;
                    await Application.Current.MainPage.DisplayAlert("Submission Status", "Network Issues, Try later !", "Ok");
                }
            });
        }

        private RakshakMonthlyReportForm _rakshakMonthlyReportForm = new RakshakMonthlyReportForm();
        public RakshakMonthlyReportForm RakshakMonthlyReport
        {
            get { return _rakshakMonthlyReportForm; }
            set { SetProperty(ref _rakshakMonthlyReportForm, value); }
        }

        private bool _isLoading;
        public bool IsLoading
        {
            get { return _isLoading; }
            set { SetProperty(ref _isLoading, value); }
        }
    }
}