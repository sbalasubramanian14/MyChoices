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
            int newFormNumber;
            try
            {
                 newFormNumber = this.unitOfWork.DbContext.SerialNumbertrackerRA.Where(Ip=>Ip.IpCode==SvpForm.CreatedBy && Ip.FormType=="SV").Max(serial => serial.SerialValue) + 1;
            }
            catch (InvalidOperationException ex)
            {
                newFormNumber = 1;
            }
            String padding = "000";
            String serialNumberComponent = padding.Remove(padding.Length - newFormNumber.ToString().Length) + (newFormNumber).ToString();
            SvpForm.SvpNumber = "SV-" + SvpForm.CreatedBy + "-" + serialNumberComponent;

            /*Form entry*/
            Svp svpObj;
            svpObj = this.unitOfWork.DbContext.Svp.Add(SvpForm);

            /*Serial Number updation*/
            SerialNumbertrackerRA serialNumbertrackerRAObj= new SerialNumbertrackerRA();
            serialNumbertrackerRAObj.FormType = "SV";
            serialNumbertrackerRAObj.IpCode = SvpForm.CreatedBy;
            serialNumbertrackerRAObj.SerialValue = newFormNumber;
            serialNumbertrackerRAObj.GeneratedDate = DateTime.Now;
            serialNumbertrackerRAObj = this.unitOfWork.DbContext.SerialNumbertrackerRA.Add(serialNumbertrackerRAObj);

            this.unitOfWork.DbContext.SaveChanges();

            return svpObj.SvpNumber;
        }

        public string SavePreSvpForm(PreSvp PreSvpForm)
        {
            int newFormNumber;
            try
            {
                 newFormNumber = this.unitOfWork.DbContext.SerialNumbertrackerRA.Where(Ip => Ip.IpCode == PreSvpForm.CreatedBy && Ip.FormType == "PV").Max(serial => serial.SerialValue) + 1;
            }
            catch(InvalidOperationException ex)
            {
                newFormNumber = 1;
            }
            String padding = "000";
            String serialNumberComponent = padding.Remove(padding.Length - newFormNumber.ToString().Length) + (newFormNumber).ToString();
            PreSvpForm.PreSvpNumber = "PV-" + PreSvpForm.CreatedBy + "-" + serialNumberComponent;

            /*Form entry */
            PreSvp preSvpObj;
            preSvpObj = this.unitOfWork.DbContext.PreSvp.Add(PreSvpForm);

            /*Serial Number updation*/
            SerialNumbertrackerRA serialNumbertrackerRAObj = new SerialNumbertrackerRA();
            serialNumbertrackerRAObj.FormType = "PV";
            serialNumbertrackerRAObj.IpCode = PreSvpForm.CreatedBy;
            serialNumbertrackerRAObj.SerialValue = newFormNumber;
            serialNumbertrackerRAObj.GeneratedDate = DateTime.Now;
            serialNumbertrackerRAObj = this.unitOfWork.DbContext.SerialNumbertrackerRA.Add(serialNumbertrackerRAObj);

            this.unitOfWork.DbContext.SaveChanges();

            return preSvpObj.PreSvpNumber;
        }
    }
}
