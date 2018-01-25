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
    
    [Route("api/[controller]")]
    public class SvpController : WhitePageController
    {
        private ISvpBusinessAccess svpBusinessAccess;

        public SvpController(ISvpBusinessAccess svpBusinessAccess)
        {
            this.svpBusinessAccess = svpBusinessAccess;
        }

        [Route("[action]/{id:int}")]
        [HttpGet]
        public IActionResult GetSvpById(int id)
        {
            //var selectedCase = this.caseBusinessAccess.GetCaseById(id);
            return Ok("hi");
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SavePreSvp([FromBody] PreSvp PreSvpForm)
        {

            PreSvpForm.CreatedDateTime = DateTime.Now;

            var updatedForm = this.svpBusinessAccess.SavePreSvpForm(PreSvpForm);
            return Ok(updatedForm);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SavePostSvp([FromBody] PostSvp PostSvpForm)
        {

            PostSvpForm.CreatedDateTime = DateTime.Now;

            var updatedForm = this.svpBusinessAccess.SavePostSvpForm(PostSvpForm);
            return Ok(updatedForm);
        }

    }
}