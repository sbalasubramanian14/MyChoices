using System;
using Android.App;
using Android.Content;
using Android.Content.PM;
using Android.OS;
using NexGenRedAlert.Auth;

namespace NexGenRedAlert.Droid.Auth
{
    [Activity(Label = "ActivityCustomUrlSchemeInterceptor", NoHistory = true, LaunchMode = LaunchMode.SingleTop)] 
    [
       IntentFilter
       (
           new[] { Intent.ActionView },
           Categories = new[]
                   {
                        Intent.CategoryDefault,
                        Intent.CategoryBrowsable
                   },
           DataSchemes = new[]
                   {
                        "com.googleusercontent.apps.604822021872-052g10g9q6qpkkr1nlk2p6r5kqk6f0ke",
                    },
           //DataHost = "localhost",
           DataPath = "/oauth2redirect"
       )
   ]
    class ActivityCustomUrlSchemeInterceptor : Activity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);

            /* global::Android.Net.Uri uri_android = Intent.Data;

            //#if DEBUG
            //  System.Text.StringBuilder sb = new System.Text.StringBuilder();
            //  sb.AppendLine("ActivityCustomUrlSchemeInterceptor.OnCreate()");
            //  sb.Append("     uri_android = ").AppendLine(uri_android.ToString());
            //  System.Diagnostics.Debug.WriteLine(sb.ToString());
            //#endif

            // Convert iOS NSUrl to C#/netxf/BCL System.Uri - common API
            Uri uri_netfx = new Uri(uri_android.ToString());

            // load redirect_url Page
            AuthenticationState.Authenticator.OnPageLoading(uri_netfx);*/

            var uri = new Uri(Intent.Data.ToString());

            // Load redirectUrl page
            AuthenticationState.Authenticator.OnPageLoading(uri);

            this.Finish();

            return;
        }
    }
}