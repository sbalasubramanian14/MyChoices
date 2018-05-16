using Microsoft.AspNetCore.Mvc;
using System;
using WhitePage.BusinessAccess.Contracts.Ops;
using WhitePage.Entities.RedAlert;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WhitePage.MyWeb.UI.Controllers
{    
    [Route("api/redalert/[controller]")]
    public class FormsController : WhitePageController
    {
        private ISvpBusinessAccess _svpBusinessAccess;

        public FormsController(ISvpBusinessAccess svpBusinessAccess)
        {
            this._svpBusinessAccess = svpBusinessAccess;
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SavePreSvpForm([FromBody] PreSvp preSvpForm)
        {
            preSvpForm.CreatedDateTime = DateTime.UtcNow.AddHours(5.5); 

            var updatedForm = this._svpBusinessAccess.SavePreSvpForm(preSvpForm);
            return Ok(updatedForm);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SaveSvpForm([FromBody] Svp postSvpForm)
        {
            postSvpForm.CreatedDateTime = DateTime.UtcNow.AddHours(5.5);

            var updatedForm = this._svpBusinessAccess.SaveSvpForm(postSvpForm);
            return Ok(updatedForm);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SaveProgrammePlanningForm([FromBody] ProgrammePlanning programmePlanningForm)
        {
            programmePlanningForm.CreatedDateTime = DateTime.UtcNow.AddHours(5.5);

            var updatedForm = this._svpBusinessAccess.SaveProgrammePlanningForm(programmePlanningForm);
            return Ok(updatedForm);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SaveRevisitForm([FromBody] Revisit revisitForm)
        {
            revisitForm.CreatedDateTime = DateTime.UtcNow.AddHours(5.5);

            var updatedForm = this._svpBusinessAccess.SaveRevisitForm(revisitForm);
            return Ok(updatedForm);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SavePreSvpQCForm([FromBody] PreSvpQC preSvpQCForm)
        {
            preSvpQCForm.CreatedDateTime = DateTime.UtcNow.AddHours(5.5);

            var updatedForm = this._svpBusinessAccess.SavePreSvpQCForm(preSvpQCForm);
            return Ok(updatedForm);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SaveSvpQCForm([FromBody] SvpQC svpQCForm)
        {
            svpQCForm.CreatedDateTime = DateTime.UtcNow.AddHours(5.5);

            var updatedForm = this._svpBusinessAccess.SaveSvpQCForm(svpQCForm);
            return Ok(updatedForm);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SavePostSvpQCForm([FromBody] PostSvpQC postSvpQCForm)
        {
            postSvpQCForm.CreatedDateTime = DateTime.UtcNow.AddHours(5.5);

            var updatedForm = this._svpBusinessAccess.SavePostSvpQCForm(postSvpQCForm);
            return Ok(updatedForm);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SaveRakshakRegistrationForm([FromBody] RakshakRegistration rakshakRegistrationForm)
        {
            rakshakRegistrationForm.CreatedDateTime = DateTime.UtcNow.AddHours(5.5);

            var updatedForm = this._svpBusinessAccess.SaveRakshakRegistrationForm(rakshakRegistrationForm);
            return Ok(updatedForm);
        }

    }
}