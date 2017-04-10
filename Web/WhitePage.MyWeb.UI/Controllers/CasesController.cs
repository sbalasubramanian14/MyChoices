using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using WhitePage.BusinessAccess.Contracts.Ops;
using WhitePage.Entities.CaseManagement;
using WhitePage.ResourceAccess.Contracts.Core;

namespace WhitePage.MyWeb.UI.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
    public class CasesController : WhitePageController
    {
        private ICaseBusinessAccess caseBusinessAccess;
        
        public CasesController(ICaseBusinessAccess caseBusinessAccess)
        {
            this.caseBusinessAccess = caseBusinessAccess;
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult SaveCasePrimary([FromBody] CaseBook caseBook)
        {
            caseBook.Case.CreatedBy = this.LoggedInUserId;
            caseBook.Case.ModifiedBy = this.LoggedInUserId;
            caseBook.Case.CreatedDateTime = DateTime.Now;
            caseBook.Case.ModifiedDatetime = DateTime.Now;

            caseBook.SelectedAddress.CreatedBy = this.LoggedInUserId;
            caseBook.SelectedAddress.ModifiedBy = this.LoggedInUserId;
            caseBook.SelectedAddress.CreatedDateTime = DateTime.Now;
            caseBook.SelectedAddress.ModifiedDatetime = DateTime.Now;

            caseBook.Case.RegisterDate = DateTime.Now.Date;

            caseBook.Addresses = new List<CaseAddress> { caseBook.SelectedAddress };

            var createdCase = this.caseBusinessAccess.SavePrimaryCase(caseBook);
            return Ok(createdCase);
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult GetAll()
        {
            var casesList = this.caseBusinessAccess.GetAllCases();
            return Ok(casesList);
        }

        [Route("[action]/{id:int}")]
        [HttpGet]
        public IActionResult GetCaseById(int id)
        {
            var selectedCase = this.caseBusinessAccess.GetAllCases().Where(c => c.CaseId == id).FirstOrDefault();
            return Ok(selectedCase);
        }

    }
}
