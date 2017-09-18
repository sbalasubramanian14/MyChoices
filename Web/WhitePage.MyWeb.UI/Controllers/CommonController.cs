using Microsoft.AspNetCore.Mvc;
using WhitePage.Entities.CaseManagement;
using WhitePage.ResourceAccess.Contracts.Core;
using WhitePage.BusinessAccess.Contracts.Core;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace WhitePage.MyWeb.UI.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
    public class CommonController : WhitePageController
    {
        private ICommonDataAccess commonDataAccess;
        private ICommonBusinessAccess commonBusinessAccess;
        public CommonController(ICommonDataAccess commonDataAccess, ICommonBusinessAccess commonBusinessAccess)
        {
            this.commonDataAccess = commonDataAccess;
            this.commonBusinessAccess = commonBusinessAccess;
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult GetAllCenters()
        {
            var centers = this.commonDataAccess.GetAllCenters();
            return Ok(centers);
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult GetAllPeaceMakers()
        {
            var centers = this.commonDataAccess.GetAllPeaceMakers();
            return Ok(centers);
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult GetAllCounselors()
        {
            var centers = this.commonDataAccess.GetAllCounselors();
            return Ok(centers);
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult GetAllLookups()
        {
            var centers = this.commonDataAccess.GetAllLookups();
            return Ok(centers);
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult GetAllStates()
        {
            var centers = this.commonDataAccess.GetAllStates();
            return Ok(centers);
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult GetAllCaseStatuses()
        {
            var centers = this.commonDataAccess.GetAllCaseStatuses();
            return Ok(centers);
        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetUsersCount()
        {
            var count = this.commonBusinessAccess.GetUsersCount();
            return Ok(count);
        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetAllActiveUsers(int pageNumber, int offset)
        {
            var users = this.commonBusinessAccess.GetAllActiveUsers(pageNumber, offset);
            return Ok(users);
        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetActiveNonAdminUsers(int pageNumber, int offset)
        {
            var users = this.commonBusinessAccess.GetActiveNonAdminUsers(pageNumber, offset);
            return Ok(users);
        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetSortedUsersDataAsc(int pageNumber, int offset, string dictionary, string field)
        {
            var sortedUsers = this.commonBusinessAccess.GetSortedUsersDataAsc(pageNumber, offset, JsonConvert.DeserializeObject<Dictionary<string, string>>(dictionary), field);
            return Ok(sortedUsers);
        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetSortedUsersDataDesc(int pageNumber, int offset, string dictionary, string field)
        {
            var sortedUsers = this.commonBusinessAccess.GetSortedUsersDataDesc(pageNumber, offset, JsonConvert.DeserializeObject<Dictionary<string, string>>(dictionary), field);
            return Ok(sortedUsers);
        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetFilteredUsers(int pageNumber, int offset, string dictionary)
        {
            var usersList = this.commonBusinessAccess.GetFilteredUsers(pageNumber, offset, JsonConvert.DeserializeObject<Dictionary<string, string>>(dictionary));
            return Ok(usersList);
        }
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetFilteredUsersCount(int pageNumber, int offset, string dictionary)
        {
            var usersCount = this.commonBusinessAccess.GetFilteredUsersCount(pageNumber, offset, JsonConvert.DeserializeObject<Dictionary<string, string>>(dictionary));
            return Ok(usersCount);
        }
    }
}
