using NexGenRedAlert.Models;
using System;
using System.Net.Http;
using System.Windows.Input;
using Xamarin.Forms;

namespace NexGenRedAlert.ViewModels
{
    public class ProgrammePlanningViewModel : BaseViewModel
    {
        public ICommand SubmitProgrammePlanningForm { get; }
        public string programmePlanningNumber;

        public ProgrammePlanningViewModel()
        {
            SubmitProgrammePlanningForm = new Command(async () => {

                try
                {
                    IsLoading = true;
                    this.programmePlanningNumber = await App.SvpServices.PostAsyncSaveProgrammePlanningForm(ProgrammePlanningForm);
                    IsLoading = false;
                    if (String.IsNullOrEmpty(this.programmePlanningNumber))
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", "Form Submission failed ! Check all fields and retry.", "Ok");
                    }
                    else
                    {
                        await Application.Current.MainPage.DisplayAlert("Submission Status", $"Submitted successfully !\nPlanning Number is :{this.programmePlanningNumber}", "Ok");
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

        private ProgrammePlanningForm _programmePlanning = new ProgrammePlanningForm();
        public ProgrammePlanningForm ProgrammePlanningForm
        {
            get { return _programmePlanning; }
            set { SetProperty(ref _programmePlanning, value); }
        }

        private bool _isLoading;
        public bool IsLoading
        {
            get { return _isLoading; }
            set { SetProperty(ref _isLoading, value); }
        }
    }
}
