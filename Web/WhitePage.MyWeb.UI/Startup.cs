using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using System.Text;
using WhitePage.MyWeb.UI.Security;
using WhitePage.Utilities.Constants;

namespace WhitePage.MyWeb.UI
{
    public partial class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
               .SetBasePath(env.ContentRootPath)
               .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
               .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
               .AddEnvironmentVariables();
            Configuration = builder.Build();

            ConnectionStrings.MAIN_CONNECTION_STRING = Configuration.GetSection("Data")["WhitePageConnectionString:ConnectionString"];
        }

        public IConfigurationRoot Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {           
            //Invoke DI
            DIContainer.ServiceLocator.Instance.LoadContainer(services);

            services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());
        }
        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseExceptionHandler("/session/error");

            app.UseCors("AllowAllOrigins");

            var defaultFilesOptions = new DefaultFilesOptions();
            defaultFilesOptions.DefaultFileNames.Clear();
            defaultFilesOptions.DefaultFileNames.Add("index.html");

            ConfigureAuth(app);

            app.Use(async (context, next) =>
            {
                await next();

                //if (context.Response.StatusCode == 404 && !System.IO.Path.HasExtension(context.Request.Path.Value))
                //{
                //    context.Request.Path = "/index.html";
                //    await next();
                //}
            })
            .UseCors("AllowAll")
            .UseMvc()
            .UseDefaultFiles(defaultFilesOptions)
            .UseStaticFiles();

            //// Add JWT generation endpoint:
            //var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
            //var tokenProviderOptions = new TokenProviderOptions
            //{
            //    Audience = "MyChoicesAudience",
            //    Issuer = "MyChoicesIssuer",
            //    SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
            //};

            //app.UseMiddleware<WhitePageTokenProvider>(Options.Create(tokenProviderOptions));            

            app.UseMvc(routes =>
            {                
                routes.MapRoute(
                    name: "areaRoute",
                    template: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "" });
            });
        }        

    }
}
