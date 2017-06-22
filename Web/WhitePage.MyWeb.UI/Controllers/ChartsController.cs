using Microsoft.AspNetCore.Mvc;
using WhitePage.Entities.CaseManagement;
using WhitePage.ResourceAccess.Contracts.Core;

namespace WhitePage.MyWeb.UI.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
    public class ChartsController : WhitePageController
    {
        private ICommonDataAccess commonDataAccess;

        public ChartsController(ICommonDataAccess commonDataAccess)
        {
            this.commonDataAccess = commonDataAccess;
        }

        [Route("[action/:id]")]
        [HttpGet]
        public IActionResult GetCenterWiseChartObjectValues(int id)
        {
            var charts = this.commonDataAccess.GetCenterWiseChartObjectValues(id);
            return Ok(charts);
        }

        [Route("[action/:id]")]
        [HttpGet]
        public IActionResult GetCounselorWiseChartObjectValues(int id)
        {
            var charts = this.commonDataAccess.GetCounselorWiseChartObjectValues(id);
            return Ok(charts);
        }

        [Route("[action/:id]")]
        [HttpGet]
        public IActionResult GetPeaceMakerWiseChartObjectValues(int id)
        {
            var charts = this.commonDataAccess.GetPeacemakerWiseChartObjectValues(id);
            return Ok(charts);
        }
    }
}
