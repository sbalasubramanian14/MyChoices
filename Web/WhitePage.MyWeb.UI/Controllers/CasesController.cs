using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using WhitePage.BusinessAccess.Contracts.Ops;
using WhitePage.Entities.CaseManagement;
using WhitePage.ResourceAccess.Contracts.Core;
using WhitePage.Utilities.Extensions;

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

            caseBook.FamilyHouseHold.ChildrenDeceasedLookupId = caseBook.FamilyHouseHold.ChildrenDeceasedLookupArray.ToArrayString();
            caseBook.FamilyHouseHold.PeacemakerAssistanceLookupId = caseBook.FamilyHouseHold.PeacemakerAssistanceLookupArray.ToArrayString();
            caseBook.FamilyHouseHold.HouseHoldMembersLivingLookupId = caseBook.FamilyHouseHold.HouseHoldMembersLivingLookupArray.ToArrayString();

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
        public IActionResult UpdatePhysicalHealth([FromBody] CaseBook caseBook)
        {
            caseBook.PhysicalHealth.CaseId = caseBook.Case.CaseId;
            caseBook.PhysicalHealth.WhoIsAbusingYouLookupId = caseBook.PhysicalHealth.WhoIsAbusingYouLookupArray.ToArrayString();

            var updatedCase = this.caseBusinessAccess.UpdatePhysicalHealth(caseBook);
            return Ok(updatedCase);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdateOffender([FromBody] CaseBook caseBook)
        {
            caseBook.SelectedOffender.CaseId = caseBook.Case.CaseId;
            var updatedCase = this.caseBusinessAccess.UpdateOffender(caseBook);
            return Ok(updatedCase);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdateAbuse([FromBody] CaseBook caseBook)
        {
            caseBook.Abuse.CaseId = caseBook.Case.CaseId;
            caseBook.Abuse.FeelAboutAbuseLookupId = caseBook.Abuse.FeelAboutAbuseLookupArray.ToArrayString();
            caseBook.Abuse.ParentsFeelAboutAbuseLookupId = caseBook.Abuse.ParentsFeelAboutAbuseLookupArray.ToArrayString();
            caseBook.Abuse.LawFeelAboutAbuseLookupId = caseBook.Abuse.LawFeelAboutAbuseLookupArray.ToArrayString();

            caseBook.Abuse.WeaponsUsedLookupId= caseBook.Abuse.WeaponsUsedLookupArray.ToArrayString();
            caseBook.Abuse.TypesOfPhyscialAbuseLookupId = caseBook.Abuse.TypesOfPhyscialAbuseLookupArray.ToArrayString();
            caseBook.Abuse.TypesOfEmotionalAbuseLookupId = caseBook.Abuse.TypesOfEmotionalAbuseLookupArray.ToArrayString();
            caseBook.Abuse.TypesOfSexualAbuseLookupId = caseBook.Abuse.TypesOfSexualAbuseLookupArray.ToArrayString();
            caseBook.Abuse.TypesOfEconomicAbuseLookupId = caseBook.Abuse.TypesOfEconomicAbuseLookupArray.ToArrayString();
            caseBook.Abuse.ReasonsForAbuseLookupId = caseBook.Abuse.ReasonsForAbuseLookupArray.ToArrayString();

            var updatedCase = this.caseBusinessAccess.UpdateAbuse(caseBook);
            return Ok(updatedCase);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdateCase([FromBody] CaseBook caseBook)
        {
            caseBook.Manage.CaseId = caseBook.Case.CaseId;
            caseBook.Manage.TypesOfCounselingLookupId = caseBook.Manage.TypesOfCounselingLookupArray.ToArrayString();

            var updatedCase = this.caseBusinessAccess.UpdateCase(caseBook);
            return Ok(updatedCase);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdateMental([FromBody] CaseBook caseBook)
        {
            caseBook.SelectedMental.CaseId = caseBook.Case.CaseId;
            var updatedCase = this.caseBusinessAccess.UpdateMental(caseBook);
            return Ok(updatedCase);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdateSessionLog([FromBody] CaseBook caseBook)
        {
            caseBook.SelectedSessionLog.CaseId = caseBook.Case.CaseId;
            var updatedCase = this.caseBusinessAccess.UpdateSessionLog(caseBook);
            return Ok(updatedCase);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdateFeedback([FromBody] CaseBook caseBook)
        {
            caseBook.SelectedFeedback.CaseId = caseBook.Case.CaseId;
            var updatedCase = this.caseBusinessAccess.UpdateFeedback(caseBook);
            return Ok(updatedCase);
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdateLegal([FromBody] CaseBook caseBook)
        {
            caseBook.Legal.CaseId = caseBook.Case.CaseId;
            caseBook.Legal.OutcomeLookupId = caseBook.Legal.OutcomeLookupArray.ToArrayString();
            caseBook.Legal.DocumentsLookupId = caseBook.Legal.DocumentsLookupArray.ToArrayString();

            var updatedCase = this.caseBusinessAccess.UpdateLegal(caseBook);
            return Ok(updatedCase);
        }
    }
}
