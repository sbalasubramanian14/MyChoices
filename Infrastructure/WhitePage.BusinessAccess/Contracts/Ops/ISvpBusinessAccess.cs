﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WhitePage.Entities.RedAlert;

namespace WhitePage.BusinessAccess.Contracts.Ops
{
    public interface ISvpBusinessAccess
    {
        string SavePreSvpForm(PreSvp PreSvpForm);
        string SavePostSvpForm(PostSvp PostSvpForm);
    }
}
