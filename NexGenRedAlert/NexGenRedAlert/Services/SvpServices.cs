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
        private const string WebServiceUrl = "https://mychoicesredalert.azurewebsites.net/api/svp/";

        public SvpServices(HttpClient client)
        {
            Client = client;
        }

        public SvpServices()
        {
            Client = new HttpClient();
        }

        public async Task<string> PostAsyncSavePreSvpForm(PreSvp PreSvpForm)
        {
            try
            {
                var httpClient = new HttpClient();
                PreSvpForm.CreatedBy = PreSvpForm.CreatedBy.ToUpper();

                var json = JsonConvert.SerializeObject(PreSvpForm);
                HttpContent httpContent = new StringContent(json);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                var result = await httpClient.PostAsync(WebServiceUrl + "SavePreSvp", httpContent);

                return result.Content.ToString();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }

        public async Task<string> PostAsyncSavePostSvpForm(PostSvp PostSvpForm)
        {
            var httpClient = new HttpClient();
            PostSvpForm.CreatedBy = PostSvpForm.CreatedBy.ToUpper();

            var json = JsonConvert.SerializeObject(PostSvpForm);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var result = await httpClient.PostAsync(WebServiceUrl + "SavePostSvp", httpContent);

            return result.Content.ToString();
        }
    }
}
