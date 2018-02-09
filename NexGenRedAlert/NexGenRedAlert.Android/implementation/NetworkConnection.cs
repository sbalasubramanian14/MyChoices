using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.Net;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using NexGenRedAlert;
using NexGenRedAlert.contracts;
using NexGenRedAlert.Droid.implementation;
using Xamarin.Forms;

[assembly: Dependency(typeof(NetworkConnection))]
namespace NexGenRedAlert.Droid.implementation
{
    public class NetworkConnection : INetworkConnection
    {
        public bool IsConnected { get; set; }
        public void CheckNetworkConnection()
        {
            // TODO: To be refactored later to inject via constructor injection
            var connectivityManager = (ConnectivityManager)Android.App.Application.Context.ApplicationContext.GetSystemService(Context.ConnectivityService);
            IsConnected = connectivityManager.IsDefaultNetworkActive;
        }
    }
}