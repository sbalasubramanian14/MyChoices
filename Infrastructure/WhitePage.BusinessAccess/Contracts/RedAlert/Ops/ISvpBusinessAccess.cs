using WhitePage.Entities.RedAlert;

namespace WhitePage.BusinessAccess.Contracts.Ops
{
    public interface ISvpBusinessAccess
    {
        string SavePreSvpForm(PreSvp preSvpForm);
        string SaveSvpForm(Svp svpForm);
        string SaveProgrammePlanningForm(ProgrammePlanning programmePlanningForm);
        string SaveRevisitForm(Revisit revisitForm);
        string SavePreSvpQCForm(PreSvpQC preSvpQC);
        string SaveSvpQCForm(SvpQC svpQC);
        string SaveRakshakRegistrationForm(RakshakRegistration rakshakRegistrationForm);        
        string SavePostSvpQCForm(PostSvpQC postSvpQC);
    }
}
