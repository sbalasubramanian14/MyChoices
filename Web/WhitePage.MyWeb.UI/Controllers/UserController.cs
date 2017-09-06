using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WhitePage.BusinessAccess.Contracts.Security;
using WhitePage.Entities.CaseManagement;
using WhitePage.Entities.Security;
using WhitePage.ResourceAccess.Contracts.Core;

namespace WhitePage.MyWeb.UI.Controllers
{
    [Route("api/[controller]/[action]")]
    //[Authorize]
    public class UserController : WhitePageController
    {
        private ICommonDataAccess commonDataAccess;
        private ILoginBusinessAccess loginBusinessAccess;

        public UserController(ICommonDataAccess commonDataAccess, ILoginBusinessAccess loginBusinessAccess)
        {
            this.commonDataAccess = commonDataAccess;
            this.loginBusinessAccess = loginBusinessAccess;
        }

        [HttpGet]
        public IActionResult GetAllRoles()
        {
            var userRoles = this.loginBusinessAccess.GetUserRoles();
            return Ok(userRoles);
        }

        [HttpPost]
        public IActionResult AddPeaceMaker([FromBody] PeaceMaker peaceMaker)
        {
            this.loginBusinessAccess.AddPeaceMaker(peaceMaker);
            return Ok(peaceMaker);
        }

        [HttpPost]
        public IActionResult AddCounselor([FromBody] Counselor counselor)
        {
            this.loginBusinessAccess.AddCounselor(counselor);
            return Ok(counselor);
        }

        [HttpPost]
        public IActionResult AddNewUserLogin([FromBody] object userInfo)
        {
            var definition = new { username = string.Empty, roleId = 0, firstName = string.Empty, lastName = string.Empty };

            var userdata = JsonConvert.DeserializeAnonymousType(userInfo.ToString(), definition);
            this.loginBusinessAccess.AddNewUserLogin(userdata.username, userdata.roleId, userdata.firstName, userdata.lastName);
            return Ok();
        }
        [HttpPost]
        public IActionResult DeactivateUser([FromBody] int userId)
        {
            var userRoles = this.loginBusinessAccess.DeactivateUser(userId);
            return Ok(userRoles);
        }
       
        //[HttpGet]
        //public IActionResult GetAllPeaceMakers()
        //{
        //    var centers = this.commonDataAccess.GetAllPeaceMakers();
        //    return Ok(centers);
        //}

        //[HttpGet]
        //public IActionResult GetAllCounselors()
        //{
        //    var centers = this.commonDataAccess.GetAllCounselors();
        //    return Ok(centers);
        //}

        //[HttpGet]
        //public IActionResult GetAllLookups()
        //{
        //    var centers = this.commonDataAccess.GetAllLookups();
        //    return Ok(centers);
        //}

        //[HttpGet]
        //public IActionResult GetAllStates()
        //{
        //    var centers = this.commonDataAccess.GetAllStates();
        //    return Ok(centers);
        //}

        //[HttpGet]
        //public IActionResult GetAllCaseStatuses()
        //{
        //    var centers = this.commonDataAccess.GetAllCaseStatuses();
        //    return Ok(centers);
        //}
    }
}
