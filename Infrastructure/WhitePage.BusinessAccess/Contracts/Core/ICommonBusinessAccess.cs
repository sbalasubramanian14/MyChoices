﻿using System.Collections.Generic;
using WhitePage.Entities.CaseManagement;

namespace WhitePage.BusinessAccess.Contracts.Core
{
    public interface ICommonBusinessAccess
    {
        List<Center> GetAllCenters();
        List<PeaceMaker> GetAllPeaceMakers();
        List<Counselor> GetAllCounselors();
        List<Lookup> GetAllLookups();
        List<State> GetAllStates();
    }
}
