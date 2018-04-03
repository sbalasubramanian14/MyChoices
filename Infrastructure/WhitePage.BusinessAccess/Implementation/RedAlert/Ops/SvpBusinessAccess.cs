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

        public string SavePreSvpForm(PreSvp preSvpForm)
        {
            return this.svpDataAccess.SavePreSvpForm(preSvpForm);
        }
        public string SaveSvpForm(Svp svpForm)
        {
            svpForm.TotalParticipationCount = (short)(svpForm.MothersParticipationCount
                                                + svpForm.FathersParticipationCount
                                                + svpForm.SchoolParticipationCount
                                                + svpForm.EldersParticipationCount
                                                + svpForm.MovieParticipationCount);
            return this.svpDataAccess.SaveSvpForm(svpForm);
        }        

        public string SaveProgrammePlanningForm(ProgrammePlanning programmePlanningForm)
        {
            return this.svpDataAccess.SaveProgrammePlanningForm(programmePlanningForm);
        }

        public string SaveRevisitForm(Revisit revisitForm)
        {
            return this.svpDataAccess.SaveRevisitForm(revisitForm);
        }
    }
}
