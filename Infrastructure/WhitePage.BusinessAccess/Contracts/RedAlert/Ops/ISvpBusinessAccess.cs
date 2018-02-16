using WhitePage.Entities.RedAlert;

namespace WhitePage.BusinessAccess.Contracts.Ops
{
    public interface ISvpBusinessAccess
    {
        string SavePreSvpForm(PreSvp PreSvpForm);
        string SaveSvpForm(Svp SvpForm);
    }
}
