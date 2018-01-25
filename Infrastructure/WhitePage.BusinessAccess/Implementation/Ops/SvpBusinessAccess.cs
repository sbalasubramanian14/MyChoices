using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
        public string SavePostSvpForm(PostSvp PostSvpForm)
        {
            return this.svpDataAccess.SavePostSvpForm(PostSvpForm);
        }

        
    }
}
