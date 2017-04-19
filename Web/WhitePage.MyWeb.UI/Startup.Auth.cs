using System;
using System.Text;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using WhitePage.MyWeb.UI.Security;
using Microsoft.AspNetCore.Authentication;
using WhitePage.BusinessAccess.Contracts.Security;
using System.Linq;


namespace WhitePage.MyWeb.UI
{
    public partial class Startup
    {
        private void ConfigureAuth(IApplicationBuilder app)
        {
            var secretKey = "myKeyChoice7secureQuantium";
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));

            var tokenValidationParameters = new TokenValidationParameters
            {
                // The signing key must match!
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,
                // Validate the JWT Issuer (iss) claim
                ValidateIssuer = true,
                ValidIssuer = "MyChoicesIssuer",
                // Validate the JWT Audience (aud) claim
                ValidateAudience = true,
                ValidAudience = "MyChoicesAudience",
                // Validate the token expiry
                ValidateLifetime = true,
                // If you want to allow a certain amount of clock drift, set that here:
                ClockSkew = TimeSpan.Zero
            };

            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = tokenValidationParameters
            });



            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                AuthenticationScheme = "Cookie",
                CookieName = "authCookie",
                TicketDataFormat = new CustomJwtDataFormat(
                    SecurityAlgorithms.HmacSha256,
                    tokenValidationParameters)
            });

            var tokenProviderOptions = new TokenProviderOptions
            {
                Path = "/token",
                Audience = "MyChoicesAudience",
                Issuer = "MyChoicesIssuer",
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
                IdentityResolver = GetIdentity
            };

            app.UseMiddleware<TokenProviderMiddleware>(Options.Create(tokenProviderOptions));
        }

        private Task<ClaimsIdentity> GetIdentity(string username, string password)
        {
            var loginBusinessAccess = DIContainer.ServiceLocator.Instance.Get<ILoginBusinessAccess>();

            var ipAddress = "n/a";
            //if (string.IsNullOrWhiteSpace(ipAddress)) ipAddress = "Not Exists";
            //var url = context.Request.Host.HasValue ? context.Request.Host.Value.ToString() : string.Empty;

            var claims = loginBusinessAccess.ValidateUser(username, password, ipAddress);

            if (claims.Count > 0 && claims.Any(c => c.ClaimType == "Status" && c.ClaimValue == "Success"))
            {
                var processedClaims = claims.Where(c => c.ClaimType != "Status").Select(c => new Claim(c.ClaimType, c.ClaimValue)).ToList();                

                return Task.FromResult(new ClaimsIdentity(new GenericIdentity(username, "Token"), processedClaims));
            }            

            // Credentials are invalid, or account doesn't exist
            return Task.FromResult<ClaimsIdentity>(null);
        }
    }
}
