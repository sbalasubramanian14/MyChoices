using WhitePage.BusinessAccess.Contracts.Ops;
using WhitePage.ResourceAccess.Contracts.Ops;
using WhitePage.Entities.RedAlert;

namespace WhitePage.BusinessAccess.Implementation.Ops
{
    public class SvpBusinessAccess : ISvpBusinessAccess
    {
        private ISvpDataAccess svpDataAccess;

        public SvpBusinessAccess(ISvpDataAccess svpDataAccess)
        {
            this.svpDataAccess = svpDataAccess;
        }
        public string SavePreSvpForm(PreSvp PreSvpForm)
        {
            return this.svpDataAccess.SavePreSvpForm(PreSvpForm);
        }
        public string SaveSvpForm(Svp SvpForm)
        {
            return this.svpDataAccess.SaveSvpForm(SvpForm);
        }        
    }
}
