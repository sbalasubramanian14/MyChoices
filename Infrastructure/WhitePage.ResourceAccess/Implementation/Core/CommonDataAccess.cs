using System.Collections.Generic;
using System.Linq;
using WhitePage.Entities.CaseManagement;
using WhitePage.ResourceAccess.Contracts.Core;

namespace WhitePage.ResourceAccess.Implementation.Core
{
    public class CommonDataAccess : DataAccess, ICommonDataAccess
    {
        public CommonDataAccess(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {

        }

        public List<Center> GetAllCenters()
        {
            return this.unitOfWork.DbContext.Centers.OrderBy(c => c.Title).ToList();
        }

        public List<PeaceMaker> GetAllPeaceMakers()
        {
            return this.unitOfWork.DbContext.PeaceMakers.OrderBy(c => c.FirstName).ToList();
        }

        public List<Counselor> GetAllCounselors()
        {
            return this.unitOfWork.DbContext.Counselors.OrderBy(c => c.FirstName).ToList();
        }

        public List<CaseStatus> GetAllCaseStatuses()
        {
            return this.unitOfWork.DbContext.CaseStatuses.ToList();
        }

        public List<Lookup> GetAllLookups()
        {
            var lookups = this.unitOfWork.DbContext.Lookups.ToList();

            var lookupDetails = this.unitOfWork.DbContext.LookupDetails.ToList();
            foreach (var item in lookups)
            {
                item.LookupDetails = lookupDetails.Where(ld => ld.LookupId == item.LookupId).OrderBy(ld => ld.SortId).ToList();
            }

            return lookups;
        }

        public List<State> GetAllStates()
        {
            var states = this.unitOfWork.DbContext.States.OrderBy(s => s.Title).ToList();

            var cities = this.unitOfWork.DbContext.Cities.ToList();
            foreach (var item in states)
            {
                item.Cities = cities.Where(ld => ld.StateId == item.StateId).OrderBy(ld => ld.Title).ToList();
            }

            return states;
        }
    }
}
