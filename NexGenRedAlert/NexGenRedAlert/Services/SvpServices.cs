[assembly: Xamarin.Forms.Dependency(typeof(NexGenRedAlert.Services.SvpServices))]
namespace NexGenRedAlert.Services
{
    using NexGenRedAlert.Models;
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using Newtonsoft.Json;
    using System.Net.Http.Headers;
    using NexGenRedAlert.contracts;
    using Xamarin.Forms;

    public class SvpServices
    {
        HttpClient Client;
        private const string WebServiceUrl = "https://mychoicesredalert.azurewebsites.net/api/redalert/svpforms/";

        public SvpServices(HttpClient client)
        {
            Client = client;
        }

        public SvpServices()
        {
            Client = new HttpClient();
        }

        public async Task<string> PostAsyncSavePreSvpForm(PreSvpForm preSvpForm)
        {
            try
            {
                var httpClient = new HttpClient();

                // IpCode Detail is Obtained from AccountStore object
                preSvpForm.CreatedBy = DependencyService.Get<ICredentialService>().IpCode;

                var json = JsonConvert.SerializeObject(preSvpForm);
                HttpContent httpContent = new StringContent(json);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                var result = await httpClient.PostAsync(WebServiceUrl + "SavePreSvpForm", httpContent); 
                string preSvpNumber = await result.Content.ReadAsStringAsync();
                return preSvpNumber;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }

        public async Task<string> PostAsyncSaveSvpForm(SvpForm svpForm)
        {
            try
            {
                var httpClient = new HttpClient();
                svpForm.CreatedBy = DependencyService.Get<ICredentialService>().IpCode;

                var json = JsonConvert.SerializeObject(svpForm);
                HttpContent httpContent = new StringContent(json);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                var result = await httpClient.PostAsync(WebServiceUrl + "SaveSvpForm", httpContent);
                string SvpFormNumber = await result.Content.ReadAsStringAsync();
                return SvpFormNumber;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }
    }
}
