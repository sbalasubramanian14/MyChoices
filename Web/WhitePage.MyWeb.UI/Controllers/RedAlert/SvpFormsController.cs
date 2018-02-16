using Microsoft.AspNetCore.Mvc;
using System;
using WhitePage.BusinessAccess.Contracts.Ops;
using WhitePage.Entities.RedAlert;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WhitePage.MyWeb.UI.Controllers
{    
    [Route("api/redalert/[controller]")]
    public class SvpFormsController : WhitePageController
    {
        private ISvpBusinessAccess _svpBusinessAccess;

        public SvpFormsController(ISvpBusinessAccess svpBusinessAccess)
        {
            this._svpBusinessAccess = svpBusinessAccess;
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SavePreSvpForm([FromBody] PreSvp PreSvpForm)
        {
            PreSvpForm.CreatedDateTime = DateTime.UtcNow.AddHours(5.5); 

            var updatedForm = this._svpBusinessAccess.SavePreSvpForm(PreSvpForm);
            return Ok(updatedForm);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SaveSvpForm([FromBody] Svp PostSvpForm)
        {
            PostSvpForm.CreatedDateTime = DateTime.UtcNow.AddHours(5.5);

            var updatedForm = this._svpBusinessAccess.SaveSvpForm(PostSvpForm);
            return Ok(updatedForm);
        }

    }
}