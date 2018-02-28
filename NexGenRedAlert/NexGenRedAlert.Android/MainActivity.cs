using Android.App;
using Android.Content.PM;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;
using NexGenRedAlert.Droid.implementation;
using System.IO;

namespace NexGenRedAlert.Droid
{
    [Activity(Label = "NeXGen RedAlert", Icon = "@drawable/icon", Theme = "@style/MainTheme", MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsAppCompatActivity
    {

        protected override void OnCreate(Bundle bundle)
        {
            TabLayoutResource = Resource.Layout.Tabbar;
            ToolbarResource = Resource.Layout.Toolbar;

            base.OnCreate(bundle);
            InitLocalDB();
            global::Xamarin.Forms.Forms.Init(this, bundle);
            global::Xamarin.Auth.Presenters.XamarinAndroid.AuthenticationConfiguration.Init(this, bundle);
            
            LoadApplication(new App());
        }

        private void InitLocalDB()
        {
            string dbFileName = "NeXGenDB.db3";
            string folderPath = System.Environment.GetFolderPath(System.Environment.SpecialFolder.Personal);
            string dbPath = Path.Combine(folderPath, dbFileName);

            if (!System.IO.File.Exists(dbPath))
            {
                using (BinaryReader br = new BinaryReader(Assets.Open(dbFileName)))
                {
                    using (BinaryWriter bw = new BinaryWriter(new FileStream(dbPath, FileMode.Create)))
                    {
                        byte[] buffer = new byte[2048];
                        int len = 0;
                        while ((len = br.Read(buffer, 0, buffer.Length)) > 0)
                        {
                            bw.Write(buffer, 0, len);
                        }
                    }
                }
            }
        }
    }
}

