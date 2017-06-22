using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WhitePage.Entities.CaseManagement;
using WhitePage.ResourceAccess.Contracts.Core;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WhitePage.MyWeb.UI.Controllers
{
    [Route("api/[controller]")]
    public class ChartsController : WhitePageController
    {
        private ICommonDataAccess commonDataAccess;

        public ChartsController(ICommonDataAccess commonDataAccess)
        {
            this.commonDataAccess = commonDataAccess;
        }

        // GET api/values/5
        [Route("[action]")]
        public IActionResult GetCenterWiseChartObjectValues(int id)
        {
            var charts = this.commonDataAccess.GetCenterWiseChartObjectValues(id);
            return Ok(charts);
        }

        // GET api/values/5
        [Route("[action]")]
        public IActionResult GetCounselorWiseChartObjectValues(int id)
        {
            var charts = this.commonDataAccess.GetCounselorWiseChartObjectValues(id);
            return Ok(charts);
        }

        // GET api/values/5
        [Route("[action]")]
        public IActionResult GetPeaceMakerWiseChartObjectValues(int id)
        {
            var charts = this.commonDataAccess.GetPeacemakerWiseChartObjectValues(id);
            return Ok(charts);
        }

        // GET api/values/5
        [Route("[action]")]
        public IActionResult GetCenterChartObjectValues()
        {
            var charts = this.commonDataAccess.GetCenterWiseChartObjectValues();
            return Ok(charts);
        }

        // GET api/values/5
        [Route("[action]")]
        public IActionResult GetCounselorChartObjectValues()
        {
            var charts = this.commonDataAccess.GetCounselorWiseChartObjectValues();
            return Ok(charts);
        }

        // GET api/values/5
        [Route("[action]")]
        public IActionResult GetPeaceMakerChartObjectValues()
        {
            var charts = this.commonDataAccess.GetPeacemakerWiseChartObjectValues();
            return Ok(charts);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
