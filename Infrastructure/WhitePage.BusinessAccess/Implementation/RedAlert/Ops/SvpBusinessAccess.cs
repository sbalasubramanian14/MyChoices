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
            SvpForm.TotalParticipationCount = (short)(SvpForm.MothersParticipationCount
                                                + SvpForm.FathersParticipationCount
                                                + SvpForm.SchoolParticipationCount
                                                + SvpForm.EldersParticipationCount
                                                + SvpForm.MovieParticipationCount);
            return this.svpDataAccess.SaveSvpForm(SvpForm);
        }        
    }
}
