using Microsoft.AspNetCore.Mvc;
using WhitePage.BusinessAccess.Contracts.Security;
using WhitePage.Entities.CaseManagement;
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
            var result = peaceMaker;

            this.loginBusinessAccess.AddPeaceMaker(peaceMaker);
            return Ok(peaceMaker);
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
