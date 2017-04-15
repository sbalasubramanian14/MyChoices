﻿using Microsoft.AspNetCore.Mvc;
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

            //caseBook.Addresses = new List<CaseAddress> { caseBook.SelectedAddress };

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
            var selectedCase = this.caseBusinessAccess.GetCaseById(id);
            return Ok(selectedCase);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdatePrimaryInfo([FromBody] CaseBook caseBook)
        {
            caseBook.Case.CreatedDateTime = DateTime.Now;
            caseBook.Case.ModifiedDatetime = DateTime.Now;
            caseBook.Case.RegisterDate = DateTime.Now.Date;

            var updatedCase = this.caseBusinessAccess.UpdatePrimaryInfo(caseBook);
            return Ok(updatedCase);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdateAddress([FromBody] CaseBook caseBook)
        {
            caseBook.SelectedAddress.CreatedBy = this.LoggedInUserId;
            caseBook.SelectedAddress.ModifiedBy = this.LoggedInUserId;
            caseBook.SelectedAddress.CreatedDateTime = DateTime.Now;
            caseBook.SelectedAddress.ModifiedDatetime = DateTime.Now;

            var updatedCase = this.caseBusinessAccess.UpdateAddress(caseBook);
            return Ok(updatedCase);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdateChildren([FromBody] CaseBook caseBook)
        {
            caseBook.SelectedChildren.CreatedBy = this.LoggedInUserId;
            caseBook.SelectedChildren.ModifiedBy = this.LoggedInUserId;
            caseBook.SelectedChildren.CreatedDateTime = DateTime.Now;
            caseBook.SelectedChildren.ModifiedDatetime = DateTime.Now;

            var updatedCase = this.caseBusinessAccess.UpdateChildren(caseBook);
            return Ok(updatedCase);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdateHouseHold([FromBody] CaseBook caseBook)
        {
            caseBook.FamilyHouseHold.CaseId = caseBook.Case.CaseId;
            var updatedCase = this.caseBusinessAccess.UpdateHouseHold(caseBook);
            return Ok(updatedCase);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdateSpouse([FromBody] CaseBook caseBook)
        {
            caseBook.Spouse.CaseId = caseBook.Case.CaseId;
            var updatedCase = this.caseBusinessAccess.UpdateSpouse(caseBook);
            return Ok(updatedCase);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdatePhysicalHealth(CaseBook caseBook)
        {
            caseBook.PhysicalHealth.CaseId = caseBook.Case.CaseId;
            var updatedCase = this.caseBusinessAccess.UpdatePhysicalHealth(caseBook);
            return Ok(updatedCase);
        }

        public IActionResult UpdateOffender(CaseBook caseBook)
        {
            caseBook.SelectedOffender.CaseId = caseBook.Case.CaseId;
            var updatedCase = this.caseBusinessAccess.UpdateOffender(caseBook);
            return Ok(updatedCase);
        }

    }
}
