using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WhitePage.Entities.RedAlert;
using WhitePage.ResourceAccess.Contracts.Ops;

namespace WhitePage.ResourceAccess.Implementation.Ops
{
    public class SvpDataAccess : DataAccess, ISvpDataAccess
    {
        public SvpDataAccess(IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {

        }
        public string SaveSvpForm(Svp SvpForm)
        {
            int newFormNumber=1;

            IQueryable<SerialNumbertrackerRA> queryableSerialNumberTrackerRAData = this.unitOfWork.DbContext.SerialNumbertrackerRA
                                                                                                   .Where(x => x.IpCode == SvpForm.CreatedBy && x.FormType == "SV"); 
            if(queryableSerialNumberTrackerRAData.Any())
            {
               newFormNumber = queryableSerialNumberTrackerRAData.Max(y => y.SerialValue) + 1; ;
            }
            string padding = "000";
            string serialNumberComponent = padding.Remove(padding.Length - newFormNumber.ToString().Length) + (newFormNumber).ToString();
            SvpForm.SvpNumber = "SV-" + SvpForm.CreatedBy + "-" + serialNumberComponent;

            /*Form entry*/
            Svp svpObj = this.unitOfWork.DbContext.Svp.Add(SvpForm);

            /*Serial Number updation*/
            SerialNumbertrackerRA serialNumbertrackerRAObj = new SerialNumbertrackerRA
            {
                FormType = "SV",
                IpCode = SvpForm.CreatedBy,
                SerialValue = newFormNumber,
                GeneratedDate = DateTime.UtcNow.AddHours(5.5)
            };
            serialNumbertrackerRAObj = this.unitOfWork.DbContext.SerialNumbertrackerRA.Add(serialNumbertrackerRAObj);

            this.unitOfWork.DbContext.SaveChanges();

            return svpObj.SvpNumber;
        }

        public string SavePreSvpForm(PreSvp PreSvpForm)
        {
            int newFormNumber =1;
            IQueryable<SerialNumbertrackerRA> queryableSerialNumberTrackerRAData = this.unitOfWork.DbContext.SerialNumbertrackerRA
                                                                                                   .Where(x => x.IpCode == PreSvpForm.CreatedBy && x.FormType == "PV"); 
            if(queryableSerialNumberTrackerRAData.Any())
            {
                newFormNumber= queryableSerialNumberTrackerRAData.Max(y => y.SerialValue) + 1;
            }
            string padding = "000";
            string serialNumberComponent = padding.Remove(padding.Length - newFormNumber.ToString().Length) + (newFormNumber).ToString();
            PreSvpForm.PreSvpNumber = "PV-" + PreSvpForm.CreatedBy + "-" + serialNumberComponent;

            /*Form entry */
            PreSvp preSvpObj = this.unitOfWork.DbContext.PreSvp.Add(PreSvpForm);

            /*Serial Number updation*/
            SerialNumbertrackerRA serialNumbertrackerRAObj = new SerialNumbertrackerRA
            {
                FormType = "PV",
                IpCode = PreSvpForm.CreatedBy,
                SerialValue = newFormNumber,
                GeneratedDate = DateTime.UtcNow.AddHours(5.5)
            };

            serialNumbertrackerRAObj = this.unitOfWork.DbContext.SerialNumbertrackerRA.Add(serialNumbertrackerRAObj);

            this.unitOfWork.DbContext.SaveChanges();

            return preSvpObj.PreSvpNumber;
        }
    }
}
