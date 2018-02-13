using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using WhitePage.BusinessAccess.Contracts.Ops;
using WhitePage.Entities.CaseManagement;
using WhitePage.ResourceAccess.Contracts.Core;
using WhitePage.Utilities.Extensions;
using Newtonsoft.Json.Linq;
using System.Data.Entity.Core;
using System.Data;
using WhitePage.Entities.RedAlert;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WhitePage.MyWeb.UI.Controllers
{    
    [Route("api/redalert/[controller]")]
    public class SvpFormsController : WhitePageController
    {
        private ISvpBusinessAccess svpBusinessAccess;

        public SvpFormsController(ISvpBusinessAccess svpBusinessAccess)
        {
            this.svpBusinessAccess = svpBusinessAccess;
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SavePreSvpForm([FromBody] PreSvp PreSvpForm)
        {
            PreSvpForm.CreatedDateTime = DateTime.UtcNow.AddHours(5.5); 

            var updatedForm = this.svpBusinessAccess.SavePreSvpForm(PreSvpForm);
            return Ok(updatedForm);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SaveSvpForm([FromBody] Svp PostSvpForm)
        {
            PostSvpForm.CreatedDateTime = DateTime.UtcNow.AddHours(5.5);

            var updatedForm = this.svpBusinessAccess.SaveSvpForm(PostSvpForm);
            return Ok(updatedForm);
        }

    }
}