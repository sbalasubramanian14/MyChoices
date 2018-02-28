using NexGenRedAlert.contracts;
using NexGenRedAlert.Droid.Implementation;
using System;
using System.IO;
using Xamarin.Forms;

[assembly: Dependency(typeof(FileHelper))]
namespace NexGenRedAlert.Droid.Implementation
{
    public class FileHelper : IFilehelper
    {
        public string GetLocalFilePath(string filename)
        {
            string path = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
            return Path.Combine(path, filename);
        }
    }
}