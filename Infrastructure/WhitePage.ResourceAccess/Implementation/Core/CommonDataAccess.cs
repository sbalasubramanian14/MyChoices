using System.Collections.Generic;
using System;
using System.Linq;
using WhitePage.Entities.CaseManagement;
using WhitePage.ResourceAccess.Contracts.Core;
using System.Globalization;
using System.Linq.Expressions;

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
            //var states = this.unitOfWork.DbContext.States.OrderBy(s => s.Title).ToList();

            //var cities = this.unitOfWork.DbContext.Cities.ToList();
            //foreach (var item in states)
            //{
            //    item.Cities = cities.Where(ld => ld.StateId == item.StateId).OrderBy(ld => ld.Title).ToList();
            //}

            var states = this.unitOfWork.DbContext.States.ToList();

            var cities = this.unitOfWork.DbContext.Cities.ToList();
            foreach (var item in states)
            {
                item.Cities = cities.Where(ld => ld.StateId == item.StateId).ToList();
            }

            return states;
        }

        public List<KeyValuePair<string, KeyValuePair<string, int>>> GetChartObjectValues()
        {
            var dbContext = this.unitOfWork.DbContext;

            Func<Expression<Func<Center, short>>> returnLambdaExpression = () =>
            {
                var itemParam = Expression.Parameter(typeof(Center), "obj");
                var entityAccess = Expression.MakeMemberAccess(itemParam, typeof(Center).GetMember("CenterId").First());
                var lambda = Expression.Lambda<Func<Center, Int16>>(entityAccess, itemParam);

                return lambda;
            };

            var q = 
                dbContext.Cases
                .Join(dbContext.Centers, entity1 => entity1.CenterId, returnLambdaExpression(), (entity1, entity2) => new { Entity1 = entity1, Entity2 = entity2 })
                .GroupBy(c => new { c.Entity2.Title, c.Entity1.CreatedDateTime.Month })
                .ToList()
                .Select(
                       cl =>
                            new KeyValuePair<string, KeyValuePair<string, int>>(
                                cl.Key.Title,
                                new KeyValuePair<string, int>(CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(cl.Key.Month), cl.Count())));

            //var list =
            //    dbContext.Cases
            //        .Join(dbContext.Centers, ca => ca.CenterId, ce => ce.CenterId, (ca, ce) => new { ca, ce})
            //        .GroupBy(c => new {c.ce.Title, c.ca.CreatedDateTime.Month })
            //        .ToList()
            //        .Select(
            //            cl => 
            //                new KeyValuePair<string, KeyValuePair<string, int>>(
            //                    cl.Key.Title, 
            //                    new KeyValuePair<string, int>(CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(cl.Key.Month), cl.Count())));
            

            return q.ToList();        
        }

        public List<KeyValuePair<string, KeyValuePair<string, int>>> GetChartObjectValues<TEntity>(IEnumerable<TEntity> dbSet, string cId = "CenterId")
        {
            GetChartObjectValues(this.unitOfWork.DbContext.PeaceMakers, "PeaceMakerId");

            var dbContext = this.unitOfWork.DbContext;

            Func<Expression<Func<TEntity, int>>> returnLambdaExpression = () =>
            {
                var itemParam = Expression.Parameter(typeof(TEntity), "obj");
                var entityAccess = Expression.MakeMemberAccess(itemParam, typeof(TEntity).GetMember(cId).First());
                var lambda = Expression.Lambda<Func<TEntity, int>>(entityAccess, itemParam);

                return lambda;
            };

            var q =
                dbContext.Cases
                .Join(dbSet, entity1 => entity1.PeaceMakerId, returnLambdaExpression(), (entity1, entity2) => new { Entity1 = entity1, Entity2 = entity2 })
                .Where(c => c.Entity1.CaseStausId == 1)
                .GroupBy(c => new { c.Entity1.CreatedDateTime.Month })
                .ToList()
                .Select(
                       cl =>
                            new KeyValuePair<string, KeyValuePair<string, int>>(
                                "",
                                new KeyValuePair<string, int>(CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(cl.Key.Month), cl.Count())));

            return q.ToList();
        }
    }
}
