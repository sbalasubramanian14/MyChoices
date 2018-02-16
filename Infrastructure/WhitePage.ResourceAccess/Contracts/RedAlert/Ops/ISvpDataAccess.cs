using WhitePage.Entities.RedAlert;

namespace WhitePage.ResourceAccess.Contracts.Ops
{
    public interface ISvpDataAccess
    {
        string SavePreSvpForm(PreSvp PreSvpForm);
        string SaveSvpForm(Svp SvpForm);
    }
}
