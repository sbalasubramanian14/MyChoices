using System.Collections.Generic;
using System;
using System.Data.Entity;
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

        public List<KeyValuePair<string, KeyValuePair<string, int>>> GetCenterWiseChartObjectValues(int id)
        {
            var dbContext = this.unitOfWork.DbContext;

            var list =
                dbContext.Cases
                    .Join(dbContext.Centers, ca => ca.CenterId, ce => ce.CenterId, (ca, ce) => new { ca, ce })
                    .Where(c => c.ca.CaseStausId == id)
                    .GroupBy(c => new { c.ce.Title, c.ca.CreatedDateTime.Month })
                    .ToList()
                    .Select(
                        cl =>
                            new KeyValuePair<string, KeyValuePair<string, int>>(
                                cl.Key.Title,
                                new KeyValuePair<string, int>(CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(cl.Key.Month), cl.Count())));

            return list.ToList();        
        }

        public List<KeyValuePair<string, KeyValuePair<string, int>>> GetCounselorWiseChartObjectValues(int id)
        {
            var dbContext = this.unitOfWork.DbContext;

            var list =
                dbContext.Cases
                    .Join(dbContext.Counselors, ca => ca.CounselorId, ce => ce.CounselorId, (ca, ce) => new { ca, ce })
                    .Where(c => c.ca.CaseStausId == id)
                    .GroupBy(c => new { c.ce.FirstName, c.ca.CreatedDateTime.Month })
                    .ToList()
                    .Select(
                        cl =>
                            new KeyValuePair<string, KeyValuePair<string, int>>(
                                cl.Key.FirstName,
                                new KeyValuePair<string, int>(CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(cl.Key.Month), cl.Count())));

            return list.ToList();
        }

        public List<KeyValuePair<string, KeyValuePair<string, int>>> GetPeacemakerWiseChartObjectValues(int id)
        {
            var dbContext = this.unitOfWork.DbContext;

            var list =
                dbContext.Cases
                    .Join(dbContext.PeaceMakers, ca => ca.PeaceMakerId, ce => ce.PeaceMakerId, (ca, ce) => new { ca, ce })
                    .Where(c => c.ca.CaseStausId == id)
                    .GroupBy(c => new { c.ce.FirstName, c.ca.CreatedDateTime.Month })
                    .ToList()
                    .Select(
                        cl =>
                            new KeyValuePair<string, KeyValuePair<string, int>>(
                                cl.Key.FirstName,
                                new KeyValuePair<string, int>(CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(cl.Key.Month), cl.Count())));

            return list.ToList();
        }

        public List<KeyValuePair<string, KeyValuePair<string, int>>> GetChartObjectValues<TEntity1, TEntity2>(IQueryable<TEntity1> dbSet1, IEnumerable<TEntity2> dbSet2, string cId = "CenterId")
        {
            //Func<Expression<Func<Center, short>>> returnLambdaExpression = () =>
            //{
            //    var itemParam = Expression.Parameter(typeof(Center), "obj");
            //    var entityAccess = Expression.MakeMemberAccess(itemParam, typeof(Center).GetMember("CenterId").First());
            //    var lambda = Expression.Lambda<Func<Center, Int16>>(entityAccess, itemParam);

            //    return lambda;
            //};

            //var q = 
            //    dbContext.Cases
            //    .Join(dbContext.Centers, entity1 => entity1.CenterId, returnLambdaExpression(), (entity1, entity2) => new { Entity1 = entity1, Entity2 = entity2 })
            //    .GroupBy(c => new { c.Entity2.Title, c.Entity1.CreatedDateTime.Month })
            //    .ToList()
            //    .Select(
            //           cl =>
            //                new KeyValuePair<string, KeyValuePair<string, int>>(
            //                    cl.Key.Title,
            //                    new KeyValuePair<string, int>(CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(cl.Key.Month), cl.Count())));
            //  GetChartObjectValues(this.unitOfWork.DbContext.PeaceMakers, "PeaceMakerId");

            var dbContext = this.unitOfWork.DbContext;

            Func<Expression<Func<TEntity1, Int16>>> returnEntity1Expression = () =>
            {
                var itemParam = Expression.Parameter(typeof(TEntity1), "obj");
                var entityAccess = Expression.MakeMemberAccess(itemParam, typeof(TEntity1).GetMember(cId).First());
                var lambda = Expression.Lambda<Func<TEntity1, Int16>>(entityAccess, itemParam);

                return lambda;
            };

            Func<Expression<Func<TEntity2, Int16>>> returnEntity2Expression = () =>
            {
                var itemParam = Expression.Parameter(typeof(TEntity2), "obj");
                var entityAccess = Expression.MakeMemberAccess(itemParam, typeof(TEntity2).GetMember(cId).First());
                var lambda = Expression.Lambda<Func<TEntity2, Int16>>(entityAccess, itemParam);

                return lambda;
            };

            var itemParam1 = Expression.Parameter(typeof(TEntity1), "obj");
            var entityAccess1 = Expression.MakeMemberAccess(itemParam1, typeof(TEntity1).GetMember("CreatedDateTime").First());
            var lambda1 = Expression.Lambda<Func<TEntity1, System.DateTime>>(entityAccess1, itemParam1);

            var q =
                dbSet1
                .Join(dbSet2, returnEntity1Expression(), returnEntity2Expression(), (entity1, entity2) => new { Entity1 = entity1, Entity2 = entity2 });

            var result = q.GroupBy(c => new { lambda1 }).ToList();

            return null;
        }
    }
}
