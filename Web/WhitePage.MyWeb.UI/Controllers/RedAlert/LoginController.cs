using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using WhitePage.BusinessAccess.Contracts.Ops;
using WhitePage.Utilities.Extensions;
using Newtonsoft.Json.Linq;
using System.Data.Entity.Core;
using System.Data;
using WhitePage.Entities.RedAlert;
using WhitePage.BusinessAccess.Implementation.RedAlert.Security;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WhitePage.MyWeb.UI.Controllers
{
    [Route("api/redalert/[controller]")]
    public class LoginController : WhitePageController
    {
        private IRALoginBusinessAccess raLoginBusinessAccess;

        public LoginController(IRALoginBusinessAccess raLoginBusinessAccess)
        {
            this.raLoginBusinessAccess = raLoginBusinessAccess;
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult ValidateImplementingPartner([FromBody] String userName)
        {
            var implementingPartner = this.raLoginBusinessAccess.ValidateImplementingPartner(userName);
            return Ok(implementingPartner);
        }
    }
}