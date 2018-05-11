using System;

namespace NexGenRedAlert.Models
{
    public class PostSvpQCForm : Entity
    {
        #region variables
        private int _postSvpQCId;
        private string _postSvpQCNumber;
        private int _villageCode;
        private DateTime _postSvpQCDate;
        private string _cvcStatus;
        private string _wasAnyAnotherClubFormed;
        private string _wasVillageLeadershipProActive;
        private string _doVillagersRememberSVP;
        private short _trafficCountBeforeSVP;
        private short _trafficCountAfterSVP;
        private short _childMarriageCountBeforeSVP;
        private short _childMarriageCountAfterSVP;
        private string _wasFollowUpDoneByNGO;
        private string _areInfoStickersIntact;
        private string _isVillageSafeForGirls;
        private string _successStory;
        private string _isFollowUpSvpRequiredDesc;
        private string _doPeopleRememberHelpline;
        private string _wereIpFormsSubmitted;
        private string _rakshakStatus;
        private string _fieldWorkerNames;
        private string _summary;
        private DateTime _createdDateTime;
        private string _createdBy;
        #endregion

        public int PostSVPQCId { get { return _postSvpQCId; } set { SetProperty(ref _postSvpQCId, value); } }
        public string PostSvpQCNumber { get { return _postSvpQCNumber; } set { SetProperty(ref _postSvpQCNumber, value); } }

        public int VillageCode { get { return _villageCode; } set { SetProperty(ref _villageCode, value); } }
        public DateTime PostSvpQCDate { get { return _postSvpQCDate; } set { SetProperty(ref _postSvpQCDate, value); } }

        public string CVCStatus { get { return _cvcStatus; } set { SetProperty(ref _cvcStatus, value); } }
        public string WasAnyAnotherClubFormed { get { return _wasAnyAnotherClubFormed; } set { SetProperty(ref _wasAnyAnotherClubFormed, value); } }
        public string WasVillageLeadershipProActive { get { return _wasVillageLeadershipProActive; } set { SetProperty(ref _wasVillageLeadershipProActive, value); } }
        public string DoVillagersRememberSVP { get { return _doVillagersRememberSVP; } set { SetProperty(ref _doVillagersRememberSVP, value); } }

        public short TrafficCountBeforeSVP { get { return _trafficCountBeforeSVP; } set { SetProperty(ref _trafficCountBeforeSVP, value); } }
        public short TrafficCountAfterSVP { get { return _trafficCountAfterSVP; } set { SetProperty(ref _trafficCountAfterSVP, value); } }
        public short ChildMarriageCountBeforeSVP { get { return _childMarriageCountBeforeSVP; } set { SetProperty(ref _childMarriageCountBeforeSVP, value); } }
        public short ChildMarriageCountAfterSVP { get { return _childMarriageCountAfterSVP; } set { SetProperty(ref _childMarriageCountAfterSVP, value); } }
        public string WasFollowUpDoneByNGO { get { return _wasFollowUpDoneByNGO; } set { SetProperty(ref _wasFollowUpDoneByNGO, value); } }
        public string AreInfoStickersIntact { get { return _areInfoStickersIntact; } set { SetProperty(ref _areInfoStickersIntact, value); } }
        public string IsVillageSafeForGirls { get { return _isVillageSafeForGirls; } set { SetProperty(ref _isVillageSafeForGirls, value); } }
        public string SuccessStory { get { return _successStory; } set { SetProperty(ref _successStory, value); } }
        public string IsFollowUpSvpRequiredDesc { get { return _isFollowUpSvpRequiredDesc; } set { SetProperty(ref _isFollowUpSvpRequiredDesc, value); } }
        public string DoPeopleRememberHelpline { get { return _doPeopleRememberHelpline; } set { SetProperty(ref _doPeopleRememberHelpline, value); } }
        public string WereIpFormsSubmitted { get { return _wereIpFormsSubmitted; } set { SetProperty(ref _wereIpFormsSubmitted, value); } }
        public string RakshakStatus { get { return _rakshakStatus; } set { SetProperty(ref _rakshakStatus, value); } }
        public string FieldWorkerNames { get { return _fieldWorkerNames; } set { SetProperty(ref _fieldWorkerNames, value); } }
        public string Summary { get { return _summary; } set { SetProperty(ref _summary, value); } }

        public DateTime CreatedDateTime { get { return _createdDateTime; } set { SetProperty(ref _createdDateTime, value); } }
        public string CreatedBy { get { return _createdBy; } set { SetProperty(ref _createdBy, value); } }
    }
}
