﻿using System;
using System.Windows.Input;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace NexGenRedAlert.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class MainPage : ContentPage
	{
        public MainPage()
        {
            InitializeComponent();
            activityIndicator.IsVisible = false;
        }

        async void OpenPreSvpPage(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new NavigationPage(new PreSvpForm()));
        }
    }
}