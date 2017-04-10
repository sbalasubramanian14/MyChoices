﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WhitePage.BusinessAccess.Contracts.Core;
using WhitePage.Entities.CaseManagement;
using WhitePage.ResourceAccess.Contracts.Core;
using WhitePage.ResourceAccess.Contracts.Ops;

namespace WhitePage.BusinessAccess.Implementation.Core
{
    public class CommonBusinessAccess : ICommonBusinessAccess
    {
        private ICommonDataAccess commonDataAccess;

        public CommonBusinessAccess(ICommonDataAccess commonDataAccess)
        {
            this.commonDataAccess = commonDataAccess;
        }

        public List<Center> GetAllCenters()
        {
            return this.commonDataAccess.GetAllCenters();
        }

        public List<Counselor> GetAllCounselors()
        {
            return this.commonDataAccess.GetAllCounselors();
        }

        public List<Lookup> GetAllLookups()
        {
            return this.commonDataAccess.GetAllLookups();
        }

        public List<PeaceMaker> GetAllPeaceMakers()
        {
            return this.commonDataAccess.GetAllPeaceMakers();
        }

        public List<State> GetAllStates()
        {
            return this.commonDataAccess.GetAllStates();
        }
    }
}
