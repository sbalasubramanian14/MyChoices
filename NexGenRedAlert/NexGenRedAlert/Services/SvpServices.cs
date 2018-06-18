using NexGenRedAlert.Models;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using NexGenRedAlert.contracts;
using Xamarin.Forms;

[assembly: Xamarin.Forms.Dependency(typeof(NexGenRedAlert.Services.SvpServices))]
namespace NexGenRedAlert.Services
{
    public class SvpServices
    {
        HttpClient Client;
        private const string WebServiceUrl = "https://mcptstaging.azurewebsites.net/api/redalert/forms/";

        public SvpServices(HttpClient client)
        {
            Client = client;
        }

        public SvpServices()
        {
            Client = new HttpClient();
        }

        public async Task<string> PostAsyncSaveProgrammePlanningForm(ProgrammePlanningForm programmePlanningForm)
        {
            try
            {
                var httpClient = new HttpClient();
                programmePlanningForm.CreatedBy = DependencyService.Get<ICredentialService>().UserCode;

                var json = JsonConvert.SerializeObject(programmePlanningForm);
                HttpContent httpContent = new StringContent(json);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                var result = await httpClient.PostAsync(WebServiceUrl + "SaveProgrammePlanningForm", httpContent);
                string PlanningFormNumber = await result.Content.ReadAsStringAsync();
                return PlanningFormNumber;
            }

            catch (HttpRequestException ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }

        public async Task<string> PostAsyncSavePreSvpForm(PreSvpForm preSvpForm)
        {
            try
            {
                var httpClient = new HttpClient();

                // IpCode Detail is Obtained from AccountStore object
                preSvpForm.CreatedBy = DependencyService.Get<ICredentialService>().UserCode;

                var json = JsonConvert.SerializeObject(preSvpForm);
                HttpContent httpContent = new StringContent(json);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                var result = await httpClient.PostAsync(WebServiceUrl + "SavePreSvpForm", httpContent); 
                string preSvpNumber = await result.Content.ReadAsStringAsync();
                return preSvpNumber;
            }

            catch (HttpRequestException ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return ex.Message;
            }
        }

        public async Task<string> PostAsyncSaveSvpForm(SvpForm svpForm)
        {
            try
            {
                var httpClient = new HttpClient();
                svpForm.CreatedBy = DependencyService.Get<ICredentialService>().UserCode;

                var json = JsonConvert.SerializeObject(svpForm);
                HttpContent httpContent = new StringContent(json);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                var result = await httpClient.PostAsync(WebServiceUrl + "SaveSvpForm", httpContent);
                string SvpFormNumber = await result.Content.ReadAsStringAsync();
                return SvpFormNumber;
            }

            catch (HttpRequestException ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }

        public async Task<string> PostAsyncSaveRevisitForm(RevisitForm revisitForm)
        {
            try
            {
                var httpClient = new HttpClient();
                revisitForm.CreatedBy = DependencyService.Get<ICredentialService>().UserCode;

                var json = JsonConvert.SerializeObject(revisitForm);
                HttpContent httpContent = new StringContent(json);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                var result = await httpClient.PostAsync(WebServiceUrl + "SaveRevisitForm", httpContent);
                string RevisitFormNumber = await result.Content.ReadAsStringAsync();
                return RevisitFormNumber;
            }

            catch (HttpRequestException ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }

        public async Task<string> PostAsyncSavePreSvpQCForm(PreSvpQCForm preSvpQCForm)
        {
            try
            {
                var httpClient = new HttpClient();
                preSvpQCForm.CreatedBy = DependencyService.Get<ICredentialService>().UserCode;

                var json = JsonConvert.SerializeObject(preSvpQCForm);
                HttpContent httpContent = new StringContent(json);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                var result = await httpClient.PostAsync(WebServiceUrl + "SavePreSvpQCForm", httpContent);
                string preSvpQCFormNumber = await result.Content.ReadAsStringAsync();
                return preSvpQCFormNumber;
            }

            catch (HttpRequestException ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }

        public async Task<string> PostAsyncSaveSvpQCForm(SvpQCForm svpQCForm)
        {
            try
            {
                var httpClient = new HttpClient();
                svpQCForm.CreatedBy = DependencyService.Get<ICredentialService>().UserCode;

                var json = JsonConvert.SerializeObject(svpQCForm);
                HttpContent httpContent = new StringContent(json);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                var result = await httpClient.PostAsync(WebServiceUrl + "SaveSvpQCForm", httpContent);
                string svpQCFormNumber = await result.Content.ReadAsStringAsync();
                return svpQCFormNumber;
            }

            catch (HttpRequestException ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }

        public async Task<string> PostAsyncSavePostSvpQCForm(PostSvpQCForm postSvpQCForm)
        {
            try
            {
                var httpClient = new HttpClient();
                postSvpQCForm.CreatedBy = DependencyService.Get<ICredentialService>().UserCode;

                var json = JsonConvert.SerializeObject(postSvpQCForm);
                HttpContent httpContent = new StringContent(json);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                var result = await httpClient.PostAsync(WebServiceUrl + "SavePostSvpQCForm", httpContent);
                string postSvpQCFormNumber = await result.Content.ReadAsStringAsync();
                return postSvpQCFormNumber;
            }

            catch (HttpRequestException ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }

        public async Task<string> PostAsyncSaveRakshakRegistrationForm(RakshakRegistrationForm rakshakRegistrationForm)
        {
            try
            {
                var httpClient = new HttpClient();
                rakshakRegistrationForm.CreatedBy = DependencyService.Get<ICredentialService>().UserCode;

                var json = JsonConvert.SerializeObject(rakshakRegistrationForm);
                HttpContent httpContent = new StringContent(json);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                var result = await httpClient.PostAsync(WebServiceUrl + "SaveRakshakRegistrationForm", httpContent);
                string rakshakRegistrationFormNumber = await result.Content.ReadAsStringAsync();
                return rakshakRegistrationFormNumber;
            }

            catch (HttpRequestException ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }

        public async Task<string> PostAsyncSaveRakshakMonthlyReportForm(RakshakMonthlyReportForm rakshakMonthlyReportForm)
        {
            try
            {
                var httpClient = new HttpClient();
                rakshakMonthlyReportForm.CreatedBy = DependencyService.Get<ICredentialService>().UserCode;

                var json = JsonConvert.SerializeObject(rakshakMonthlyReportForm);
                HttpContent httpContent = new StringContent(json);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                var result = await httpClient.PostAsync(WebServiceUrl + "SaveRakshakMonthlyReportForm", httpContent);
                string rakshakMonthlyReportNumber = await result.Content.ReadAsStringAsync();
                return rakshakMonthlyReportNumber;
            }

            catch (HttpRequestException ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }
    }
}
