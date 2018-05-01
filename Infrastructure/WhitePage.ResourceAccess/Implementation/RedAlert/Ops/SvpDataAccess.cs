using System;
using System.Linq;
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
        public string SaveSvpForm(Svp svpForm)
        {
            int newFormNumber=1;

            IQueryable<SerialNumbertrackerRA> queryableSerialNumberTrackerRAData = this.unitOfWork.DbContext.SerialNumbertrackerRA
                                                                                                   .Where(x => x.UserCode == svpForm.CreatedBy && x.FormType == "SV"); 
            if(queryableSerialNumberTrackerRAData.Any())
            {
               newFormNumber = queryableSerialNumberTrackerRAData.Max(y => y.SerialValue) + 1; ;
            }
            string padding = "000";
            string serialNumberComponent = padding.Remove(padding.Length - newFormNumber.ToString().Length) + (newFormNumber).ToString();
            svpForm.SvpNumber = "SV-" + svpForm.CreatedBy + "-" + serialNumberComponent;

            /*Form entry*/
            Svp svpObj = this.unitOfWork.DbContext.Svp.Add(svpForm);

            /*Serial Number updation*/
            SerialNumbertrackerRA serialNumbertrackerRAObj = new SerialNumbertrackerRA
            {
                FormType = "SV",
                UserCode = svpForm.CreatedBy,
                SerialValue = newFormNumber,
                GeneratedDate = DateTime.UtcNow.AddHours(5.5)
            };
            serialNumbertrackerRAObj = this.unitOfWork.DbContext.SerialNumbertrackerRA.Add(serialNumbertrackerRAObj);

            this.unitOfWork.DbContext.SaveChanges();

            return svpObj.SvpNumber;
        }

        public string SavePreSvpForm(PreSvp preSvpForm)
        {
            int newFormNumber =1;
            IQueryable<SerialNumbertrackerRA> queryableSerialNumberTrackerRAData = this.unitOfWork.DbContext.SerialNumbertrackerRA
                                                                                                   .Where(x => x.UserCode == preSvpForm.CreatedBy && x.FormType == "PV"); 
            if(queryableSerialNumberTrackerRAData.Any())
            {
                newFormNumber= queryableSerialNumberTrackerRAData.Max(y => y.SerialValue) + 1;
            }
            string padding = "000";
            string serialNumberComponent = padding.Remove(padding.Length - newFormNumber.ToString().Length) + (newFormNumber).ToString();
            preSvpForm.PreSvpNumber = "PV-" + preSvpForm.CreatedBy + "-" + serialNumberComponent;

            /*Form entry */
            PreSvp preSvpObj = this.unitOfWork.DbContext.PreSvp.Add(preSvpForm);

            /*Serial Number updation*/
            SerialNumbertrackerRA serialNumbertrackerRAObj = new SerialNumbertrackerRA
            {
                FormType = "PV",
                UserCode = preSvpForm.CreatedBy,
                SerialValue = newFormNumber,
                GeneratedDate = DateTime.UtcNow.AddHours(5.5)
            };

            serialNumbertrackerRAObj = this.unitOfWork.DbContext.SerialNumbertrackerRA.Add(serialNumbertrackerRAObj);

            this.unitOfWork.DbContext.SaveChanges();

            return preSvpObj.PreSvpNumber;
        }

        public string SaveProgrammePlanningForm(ProgrammePlanning programmePlanningForm)
        {
            int newFormNumber = 1;
            IQueryable<SerialNumbertrackerRA> queryableSerialNumberTrackerRAData = this.unitOfWork.DbContext.SerialNumbertrackerRA
                                                                                                   .Where(x => x.UserCode == programmePlanningForm.CreatedBy && x.FormType == "PL");
            if (queryableSerialNumberTrackerRAData.Any())
            {
                newFormNumber = queryableSerialNumberTrackerRAData.Max(y => y.SerialValue) + 1;
            }
            string padding = "000";
            string serialNumberComponent = padding.Remove(padding.Length - newFormNumber.ToString().Length) + (newFormNumber).ToString();
            programmePlanningForm.PlanningNumber = "PL-" + programmePlanningForm.CreatedBy + "-" + serialNumberComponent;

            /*Form entry */
            ProgrammePlanning planningObj = this.unitOfWork.DbContext.ProgrammePlanning.Add(programmePlanningForm);

            /*Serial Number updation*/
            SerialNumbertrackerRA serialNumbertrackerRAObj = new SerialNumbertrackerRA
            {
                FormType = "PL",
                UserCode = programmePlanningForm.CreatedBy,
                SerialValue = newFormNumber,
                GeneratedDate = DateTime.UtcNow.AddHours(5.5)
            };

            serialNumbertrackerRAObj = this.unitOfWork.DbContext.SerialNumbertrackerRA.Add(serialNumbertrackerRAObj);

            this.unitOfWork.DbContext.SaveChanges();

            return planningObj.PlanningNumber;
        }

        public string SaveRevisitForm(Revisit revisitForm)
        {
            int newFormNumber = 1;

            IQueryable<SerialNumbertrackerRA> queryableSerialNumberTrackerRAData = this.unitOfWork.DbContext.SerialNumbertrackerRA
                                                                                                   .Where(x => x.UserCode == revisitForm.CreatedBy && x.FormType == "RV");
            if (queryableSerialNumberTrackerRAData.Any())
            {
                newFormNumber = queryableSerialNumberTrackerRAData.Max(y => y.SerialValue) + 1; ;
            }
            string padding = "000";
            string serialNumberComponent = padding.Remove(padding.Length - newFormNumber.ToString().Length) + (newFormNumber).ToString();
            revisitForm.RevisitNumber = "RV-" + revisitForm.CreatedBy + "-" + serialNumberComponent;

            /*Form entry*/
            Revisit revisitObj = this.unitOfWork.DbContext.Revisit.Add(revisitForm);

            /*Serial Number updation*/
            SerialNumbertrackerRA serialNumbertrackerRAObj = new SerialNumbertrackerRA
            {
                FormType = "RV",
                UserCode = revisitForm.CreatedBy,
                SerialValue = newFormNumber,
                GeneratedDate = DateTime.UtcNow.AddHours(5.5)
            };
            serialNumbertrackerRAObj = this.unitOfWork.DbContext.SerialNumbertrackerRA.Add(serialNumbertrackerRAObj);

            this.unitOfWork.DbContext.SaveChanges();

            return revisitObj.RevisitNumber;
        }

        public RedAlertUser GetUserDetails(string userCode)
        {
            return this.unitOfWork.DbContext.RedAlertUser.FirstOrDefault(User => User.UserCode == userCode );
        }
    }
}
