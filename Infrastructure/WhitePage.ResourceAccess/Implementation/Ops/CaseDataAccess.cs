using System.Collections.Generic;
using System.Data;
using System.Linq;
using WhitePage.Entities.CaseManagement;
using WhitePage.ResourceAccess.Contracts.Ops;

namespace WhitePage.ResourceAccess.Implementation.Ops
{
    public class CaseDataAccess : DataAccess, ICaseDataAccess
    {
        public CaseDataAccess(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {

        }

        public List<CaseHeader> GetAllCases()
        {
            return this.unitOfWork.DbContext.CaseHeaders.OrderByDescending(ch => ch.RegisterDate).OrderBy(ch => ch.CaseStatusId).ToList();
        }

        public CaseHeader SavePrimaryCase(CaseBook caseBook)
        {
            var parmsCollection = new ParmsCollection();
            var caseTable = UserDefinedTableTypes.Case;
            caseTable.Rows.Add(new object[]{
                caseBook.Case.CaseId,
                caseBook.Case.CaseNumber,
                caseBook.Case.CenterId,
                caseBook.Case.CaseStausId,
                caseBook.Case.CounselorId,
                caseBook.Case.PeaceMakerId,
                caseBook.Case.ClientFirstName,
                caseBook.Case.ClientLastName,
                caseBook.Case.Mi,
                caseBook.Case.FatherName,
                caseBook.Case.GenderLookupId,

                caseBook.Case.RequireAssistanceLookupId,
                caseBook.Case.MaritalStatusLookupId,
                caseBook.Case.Remarks,
                caseBook.Case.RegisterDate,
                caseBook.Case.MobileNumber,

                caseBook.Case.CreatedBy,
                caseBook.Case.CreatedDateTime,
                caseBook.Case.ModifiedBy,
                caseBook.Case.ModifiedDatetime,
                });
            caseTable.AcceptChanges();

            var caseAddressTable = UserDefinedTableTypes.CaseAddress;
            caseAddressTable.Rows.Add(new object[]{
                caseBook.Addresses[0].CaseAddressId,
                caseBook.Addresses[0].CaseId,
                caseBook.Addresses[0].Address,
                caseBook.Addresses[0].Area,
                caseBook.Addresses[0].CityId,
                caseBook.Addresses[0].StateId,
                caseBook.Addresses[0].PIN,
                caseBook.Addresses[0].CreatedBy,
                caseBook.Addresses[0].CreatedDateTime,
                caseBook.Addresses[0].ModifiedBy,
                caseBook.Addresses[0].ModifiedDatetime,
                });
            caseAddressTable.AcceptChanges();

            var updatedCase = this.unitOfWork.DbContext.ExecuteStoredProcedure<CaseHeader>("[Ops].[savePrimaryCase]",
                parmsCollection
                    .AddParm("@caseType", SqlDbType.Structured, caseTable, "[Ops].[CaseType]")
                    .AddParm("@caseAddressType", SqlDbType.Structured, caseAddressTable, "[Ops].[CaseAddressType]")
                ).First();

            return updatedCase;
        }

        public CaseBook GetCaseById(int caseId)
        {
            var result = new CaseBook();

            result.Case = this.unitOfWork.DbContext.Cases.Single(c => c.CaseId == caseId);
            result.CaseHeader = this.unitOfWork.DbContext.CaseHeaders.First(c => c.CaseId == caseId);
            result.Addresses = this.unitOfWork.DbContext.Addresses.Where(c => c.CaseId == caseId).ToList();

            return result;
        }
    }
}
