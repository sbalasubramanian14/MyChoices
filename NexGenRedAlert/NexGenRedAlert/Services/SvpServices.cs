using NexGenRedAlert.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net.Http.Headers;

[assembly: Xamarin.Forms.Dependency(typeof(NexGenRedAlert.Services.SvpServices))]
namespace NexGenRedAlert.Services
{
    public class SvpServices
    {
        HttpClient Client;
        private const string WebServiceUrl = "http://localhost:58841/api/";

        public SvpServices(HttpClient client)
        {
            Client = client;
        }

        public SvpServices()
        {
            Client = new HttpClient();
        }

        public string PostAsyncSavePreSvpForm(PreSvp PreSvpForm)
        {
            var httpClient = new HttpClient();

            var json = JsonConvert.SerializeObject(PreSvpForm);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var result =  httpClient.PostAsync(WebServiceUrl+ "SavePreSvp", httpContent).Result;

            return result.Content.ToString();
        }

        public async Task<string> PostAsyncSavePostSvpForm(PostSvp PostSvpForm)
        {
            var httpClient = new HttpClient();

            var json = JsonConvert.SerializeObject(PostSvpForm);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var result = await httpClient.PostAsync(WebServiceUrl + "SavePostSvp", httpContent);

            return result.Content.ToString();
        }
    }
}
