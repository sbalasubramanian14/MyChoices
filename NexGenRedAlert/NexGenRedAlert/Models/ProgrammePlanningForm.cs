using System;

namespace NexGenRedAlert.Models
{
    public class ProgrammePlanningForm : Entity
    {
        #region variables

        private int _programmePlanningId;
        private string _planningNumber;
        private int _villageCode;

        private string _planningMonthAndYear;
        private string _planningCategory;
        private DateTime _plannedPreSvpDate;
        private DateTime _plannedSvpDate;
        private DateTime _createdDateTime;
        private string _createdBy;

        #endregion

        public int ProgrammePlanningId { get { return _programmePlanningId; } set { SetProperty(ref _programmePlanningId, value); } }
        public string PlanningNumber { get { return _planningNumber; } set { SetProperty(ref _planningNumber, value); } }
        public int VillageCode { get { return _villageCode; } set { SetProperty(ref _villageCode, value); } }

        public string PlanningMonthAndYear { get { return _planningMonthAndYear; } set { SetProperty(ref _planningMonthAndYear, value); } }
        public string PlanningCategory { get { return _planningCategory; } set { SetProperty(ref _planningCategory, value); } }        
        public DateTime PlannedPreSvpDate { get { return _plannedPreSvpDate; } set { SetProperty(ref _plannedPreSvpDate, value); } }
        public DateTime PlannedSvpDate { get { return _plannedSvpDate; } set { SetProperty(ref _plannedSvpDate, value); } }

        public DateTime CreatedDateTime { get { return _createdDateTime; } set { SetProperty(ref _createdDateTime, value); } }
        public string CreatedBy { get { return _createdBy; } set { SetProperty(ref _createdBy, value); } }
    }
}
