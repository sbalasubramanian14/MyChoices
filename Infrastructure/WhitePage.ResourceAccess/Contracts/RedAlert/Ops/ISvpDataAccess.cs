using WhitePage.Entities.RedAlert;

namespace WhitePage.ResourceAccess.Contracts.Ops
{
    public interface ISvpDataAccess
    {
        string SavePreSvpForm(PreSvp preSvpForm);
        string SaveSvpForm(Svp svpForm);
        string SaveProgrammePlanningForm(ProgrammePlanning programmePlanningForm);
    }
}
