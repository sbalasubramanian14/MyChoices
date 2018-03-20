using Newtonsoft.Json;
using NexGenRedAlert.Models;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace NexGenRedAlert.Services
{
    public class AuthServices
    {
        HttpClient Client;
        private const string WebServiceUrl = "https://mcptstaging.azurewebsites.net/api/redalert/login/";

        public AuthServices(HttpClient client)
        {
            Client = client;
        }

        public AuthServices()
        {
            Client = new HttpClient();
        }

        public async Task<ImplementingPartner> PostAsyncValidateImplementingPartner(string userName)
        {
            try
            {
                var httpClient = new HttpClient();
                var json = JsonConvert.SerializeObject(userName);
                HttpContent httpContent = new StringContent(json);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                var result = await httpClient.PostAsync(WebServiceUrl + "ValidateImplementingPartner", httpContent);
                ImplementingPartner implementingPartnerData =JsonConvert.DeserializeObject<ImplementingPartner>(await result.Content.ReadAsStringAsync());

                return implementingPartnerData;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }
    }
}
