using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using WhitePage.BusinessAccess.Contracts.Security;
using System.Linq;
using Microsoft.AspNetCore.Http.Features;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;

namespace WhitePage.MyWeb.UI.Security
{
    public class WhitePageTokenProvider
    {
        private readonly RequestDelegate _next;
        private readonly TokenProviderOptions _options;

        public WhitePageTokenProvider(
            RequestDelegate next,
            IOptions<TokenProviderOptions> options)
        {
            _next = next;
            _options = options.Value;
        }

        public Task Invoke(HttpContext context)
        {
            // If the request path doesn't match, skip
            if (!context.Request.Path.Equals(_options.Path, StringComparison.Ordinal))
            {
                return _next(context);
            }

            // Request must be POST with Content-Type: application/x-www-form-urlencoded
            if (!context.Request.Method.Equals("POST")
               || !context.Request.HasFormContentType)
            {
                context.Response.StatusCode = 400;
                return context.Response.WriteAsync("Bad request.");
            }

            return GenerateToken(context);
        }

        private async Task GenerateToken(HttpContext context)
        {
            var username = context.Request.Form["username"];
            var password = context.Request.Form["password"];

            var ipAddress = context.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString();
            if (string.IsNullOrWhiteSpace(ipAddress)) ipAddress = "Not Exists";
            var url = context.Request.Host.HasValue ? context.Request.Host.Value.ToString() : string.Empty;

            var identity = await GetIdentity(username, password, ipAddress);
            if (identity == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Invalid username or password.");
                return;
            }

            var now = DateTime.UtcNow;

            string roleId = string.Empty;

            foreach (var claim in identity.Claims)
            {
                if (claim.Type == "RoleId")
                {
                    roleId = claim.Value;
                }
            }

            // Specifically add the jti (random nonce), iat (issued timestamp), and sub (subject/user) claims.
            // You can add other claims here, if you want:
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Typ, roleId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(now).ToString(), ClaimValueTypes.Integer64)
            };

            foreach (var item in identity.Claims)
            {
                claims.Add(new Claim(item.Type, item.Value));
            }

            // Create the JWT and write it to a string
            var jwt = new JwtSecurityToken(
                issuer: _options.Issuer,
                audience: _options.Audience,
                claims: claims,
                notBefore: now,
                expires: now.Add(_options.Expiration),
                signingCredentials: _options.SigningCredentials);
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                expires_in = (int)_options.Expiration.TotalSeconds
            };

            // Serialize and return the response
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }

        private Task<ClaimsIdentity> GetIdentity(string username, string password, string ipAddress)
        {
            var loginBusinessAccess = DIContainer.ServiceLocator.Instance.Get<ILoginBusinessAccess>();
            var claims = loginBusinessAccess.ValidateUser(username, password, ipAddress);

            if (claims.Count > 0 && claims.Any(c => c.ClaimType == "Status" && c.ClaimValue == "Success"))
            {
                var processedClaims = claims.Where(c => c.ClaimType != "Status").Select(c => new Claim(c.ClaimType, c.ClaimValue)).ToList();
                processedClaims.Add(new Claim ("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name", "admin"));

                return Task.FromResult(new ClaimsIdentity(new System.Security.Principal.GenericIdentity(username, "Token"), processedClaims));
            }

            // Credentials are invalid, or account doesn't exist
            return Task.FromResult<ClaimsIdentity>(null);
        }

        public static long ToUnixEpochDate(DateTime date) => new DateTimeOffset(date).ToUniversalTime().ToUnixTimeSeconds();

    }
}
