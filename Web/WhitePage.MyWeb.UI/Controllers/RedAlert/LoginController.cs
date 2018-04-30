using Microsoft.AspNetCore.Mvc;
using System;
using WhitePage.BusinessAccess.Contracts.Ops;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WhitePage.MyWeb.UI.Controllers
{
    [Route("api/redalert/[controller]")]
    public class LoginController : WhitePageController
    {
        private IRALoginBusinessAccess _raLoginBusinessAccess;

        public LoginController(IRALoginBusinessAccess raLoginBusinessAccess)
        {
            this._raLoginBusinessAccess = raLoginBusinessAccess;
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult ValidateUser([FromBody] String userName)
        {
            var redAlertUser = this._raLoginBusinessAccess.ValidateUser(userName);
            return Ok(redAlertUser);
        }
    }
}