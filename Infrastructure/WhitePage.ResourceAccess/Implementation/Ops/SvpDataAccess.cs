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
        public string SavePostSvpForm(PostSvp PostSvpForm)
        {
            int newFormNumber;
            try
            {
                 newFormNumber = this.unitOfWork.DbContext.SerialNumbertrackerRA.Where(Ip=>Ip.IpCode==PostSvpForm.CreatedBy && Ip.FormType=="SV").Max(serial => serial.SerialValue) + 1;
            }
            catch (InvalidOperationException ex)
            {
                newFormNumber = 1;
            }
            String padding = "000";
            String serialNumberComponent = padding.Remove(padding.Length - newFormNumber.ToString().Length) + (newFormNumber).ToString();
            PostSvpForm.PostSvpNumber = "SV-" + PostSvpForm.CreatedBy + "-" + serialNumberComponent;

            /*Form entry*/
            PostSvp postSvpObj;
            postSvpObj = this.unitOfWork.DbContext.PostSvp.Add(PostSvpForm);

            /*Serial Number updation*/
            SerialNumbertrackerRA serialNumbertrackerRAObj= new SerialNumbertrackerRA();
            serialNumbertrackerRAObj.FormType = "SV";
            serialNumbertrackerRAObj.IpCode = PostSvpForm.CreatedBy;
            serialNumbertrackerRAObj.SerialValue = newFormNumber;
            serialNumbertrackerRAObj.GeneratedDate = DateTime.Now;
            serialNumbertrackerRAObj = this.unitOfWork.DbContext.SerialNumbertrackerRA.Add(serialNumbertrackerRAObj);

            this.unitOfWork.DbContext.SaveChanges();

            return postSvpObj.PostSvpNumber;
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
