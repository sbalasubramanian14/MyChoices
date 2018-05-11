﻿using WhitePage.Entities.RedAlert;

namespace WhitePage.ResourceAccess.Contracts.Ops
{
    public interface ISvpDataAccess
    {
        string SavePreSvpForm(PreSvp preSvpForm);
        string SaveSvpForm(Svp svpForm);
        string SaveProgrammePlanningForm(ProgrammePlanning programmePlanningForm);
        string SaveRevisitForm(Revisit revisitForm);
        string SavePreSvpQCForm(PreSvpQC preSvpQCForm);
        string SaveSvpQCForm(SvpQC svpQCForm);
        string SavePostSvpQCForm(PostSvpQC postSvpQCForm);
        RedAlertUser GetUserDetails(string userCode);
    }
}
