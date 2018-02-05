using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using NexGenRedAlert.contracts;
using NexGenRedAlert.Droid.implementation;
using Xamarin.Forms;

[assembly: Dependency(typeof(NexGenRedAlert.Droid.implementation.ToastMessage))]
namespace NexGenRedAlert.Droid.implementation
{
    public class ToastMessage
    {
        public void LongAlert(string message)
        {
            Toast.MakeText(Android.App.Application.Context, message, ToastLength.Long).Show();
        }

        public void ShortAlert(string message)
        {
            Toast.MakeText(Android.App.Application.Context, message, ToastLength.Short).Show();
        }
    }
}