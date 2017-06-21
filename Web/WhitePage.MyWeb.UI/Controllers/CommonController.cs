using Microsoft.AspNetCore.Mvc;
using WhitePage.Entities.CaseManagement;
using WhitePage.ResourceAccess.Contracts.Core;

namespace WhitePage.MyWeb.UI.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
    public class CommonController : WhitePageController
    {
        private ICommonDataAccess commonDataAccess;

        public CommonController(ICommonDataAccess commonDataAccess)
        {
            this.commonDataAccess = commonDataAccess;
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
        public IActionResult GetChartObjectValues()
        {
            var charts = this.commonDataAccess.GetChartObjectValues();
            return Ok(charts);
        }
    }
}
