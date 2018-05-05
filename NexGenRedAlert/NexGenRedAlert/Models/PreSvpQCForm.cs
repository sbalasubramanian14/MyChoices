using System;

namespace NexGenRedAlert.Models
{
    public class PreSvpQCForm : Entity
    {
        #region variables
        private int _preSvpQCId ;
        private string _preSvpQCNumber ;
        private int _villageCode ;
        private string _stakeholdersDescription ;
        private string _ipFacilitatorCommunicationSkillLevel ;
        private string _cvcStatus ;
        private string _wasLogisticArrangementsMade ;
        private string _areVillagersInterested ;
        private string _summary ;
        private DateTime _createdDateTime ;
        private string _createdBy ;
        #endregion

        public int PreSvpQCId { get { return _preSvpQCId; } set { SetProperty(ref _preSvpQCId, value); } }
        public string PreSvpQCNumber { get { return _preSvpQCNumber; } set { SetProperty(ref _preSvpQCNumber, value); } }
        public int VillageCode { get { return _villageCode; } set { SetProperty(ref _villageCode, value); } }
        public string StakeholdersDescription { get { return _stakeholdersDescription; } set { SetProperty(ref _stakeholdersDescription, value); } }
        public string IpFacilitatorCommunicationSkillLevel { get { return _ipFacilitatorCommunicationSkillLevel; } set { SetProperty(ref _ipFacilitatorCommunicationSkillLevel, value); } }
        public string CVCStatus { get { return _cvcStatus; } set { SetProperty(ref _cvcStatus, value); } }
        public string WasLogisticArrangementsMade { get { return _wasLogisticArrangementsMade; } set { SetProperty(ref _wasLogisticArrangementsMade, value); } }
        public string AreVillagersInterested { get { return _areVillagersInterested; } set { SetProperty(ref _areVillagersInterested, value); } }
        public string Summary { get { return _summary; } set { SetProperty(ref _summary, value); } }

        public DateTime CreatedDateTime { get { return _createdDateTime; } set { SetProperty(ref _createdDateTime, value); } }
        public string CreatedBy { get { return _createdBy; } set { SetProperty(ref _createdBy, value); } }
    }
}
