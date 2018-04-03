using WhitePage.Entities.RedAlert;

namespace WhitePage.BusinessAccess.Contracts.Ops
{
    public interface ISvpBusinessAccess
    {
        string SavePreSvpForm(PreSvp preSvpForm);
        string SaveSvpForm(Svp svpForm);
        string SaveProgrammePlanningForm(ProgrammePlanning programmePlanningForm);
        string SaveRevisitForm(Revisit revisitForm);
    }
}
