using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WhitePage.Entities.RedAlert;

namespace WhitePage.ResourceAccess.Contracts.Ops
{
    public interface ISvpDataAccess
    {
        string SavePreSvpForm(PreSvp PreSvpForm);
        string SavePostSvpForm(PostSvp PostSvpForm);
    }
}
