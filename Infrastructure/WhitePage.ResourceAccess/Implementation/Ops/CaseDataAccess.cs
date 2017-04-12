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
                caseBook.SelectedAddress.CaseAddressId,
                caseBook.SelectedAddress.CaseId,
                caseBook.SelectedAddress.Address,
                caseBook.SelectedAddress.Area,
                caseBook.SelectedAddress.CityId,
                caseBook.SelectedAddress.StateId,
                caseBook.SelectedAddress.PIN,
                caseBook.SelectedAddress.CreatedBy,
                caseBook.SelectedAddress.CreatedDateTime,
                caseBook.SelectedAddress.ModifiedBy,
                caseBook.SelectedAddress.ModifiedDatetime,
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
            
            result.vAddresses = this.unitOfWork.DbContext.vAddresses.Where(c => c.CaseId == caseId).ToList();
            result.vChildren = this.unitOfWork.DbContext.vChildren.Where(c => c.CaseId == caseId).ToList();

            return result;
        }

        public CaseHeader UpdatePrimaryInfo(CaseBook caseBook)
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

            var updatedCase = this.unitOfWork.DbContext.ExecuteStoredProcedure<CaseHeader>("[Ops].[updatePrimaryInfo]",
                parmsCollection
                    .AddParm("@caseType", SqlDbType.Structured, caseTable, "[Ops].[CaseType]")                    
                ).First();

            return updatedCase;
        }

        public CaseHeader UpdateAddress(CaseBook caseBook)
        {
            var parmsCollection = new ParmsCollection();
            
            var caseAddressTable = UserDefinedTableTypes.CaseAddress;
            caseAddressTable.Rows.Add(new object[]{
                caseBook.SelectedAddress.CaseAddressId,
                caseBook.SelectedAddress.CaseId,
                caseBook.SelectedAddress.Address,
                caseBook.SelectedAddress.Area,
                caseBook.SelectedAddress.CityId,
                caseBook.SelectedAddress.StateId,
                caseBook.SelectedAddress.PIN,
                caseBook.SelectedAddress.CreatedBy,
                caseBook.SelectedAddress.CreatedDateTime,
                caseBook.SelectedAddress.ModifiedBy,
                caseBook.SelectedAddress.ModifiedDatetime,
                });
            caseAddressTable.AcceptChanges();

            var updatedCase = this.unitOfWork.DbContext.ExecuteStoredProcedure<CaseHeader>("[Ops].[saveAddress]",
                parmsCollection                    
                    .AddParm("@caseAddressType", SqlDbType.Structured, caseAddressTable, "[Ops].[CaseAddressType]")
                ).First();

            return updatedCase;            
        }

        public CaseHeader UpdateChildren(CaseBook caseBook)
        {
            var parmsCollection = new ParmsCollection();
            
            var caseChildrenTable = UserDefinedTableTypes.CaseChildren;
            caseChildrenTable.Rows.Add(new object[]{
                caseBook.SelectedChildren.CaseChildrenId,
                caseBook.SelectedChildren.CaseId,
                caseBook.SelectedChildren.Name,
                caseBook.SelectedChildren.Age,
                caseBook.SelectedChildren.GenderLookupId,
                caseBook.SelectedChildren.RelationshipWithAbuserLookupId,                
                caseBook.SelectedChildren.CreatedBy,
                caseBook.SelectedChildren.CreatedDateTime,
                caseBook.SelectedChildren.ModifiedBy,
                caseBook.SelectedChildren.ModifiedDatetime,
                });
            caseChildrenTable.AcceptChanges();

            var updatedCase = this.unitOfWork.DbContext.ExecuteStoredProcedure<CaseHeader>("[dbo].[saveChildren]",
                parmsCollection
                    .AddParm("@caseChildrenType", SqlDbType.Structured, caseChildrenTable, "[Ops].[CaseChildrenType]")
                ).First();

            return updatedCase;
        }
    }
}
