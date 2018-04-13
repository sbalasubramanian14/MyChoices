using System;

namespace NexGenRedAlert.Models
{
    public class RevisitForm : Entity
    {
        #region variables
        private int _revisitId;
        private string _revisitNumber;
        private int _villageCode;

        private DateTime _revisitDate;
        private short _trafficCountBeforeSVP;
        private short _trafficCountAfterSVP;
        private short _childMarriageCountBeforeSVP;
        private short _childMarriageCountAfterSVP;
        private string _isVillageSafeForGirlsDesc;
        private string _isStrategicNetworkingHelpful;
        private string _isVillageLeadershipHelpful;
        private string _isCVCActive;

        private string _doFathersRememberSVP;
        private string _fathersFeedback;
        private string _doMothersRememberSVP;
        private string _mothersFeedback;
        private string _doGirlsRememberSVP;
        private string _girlsFeedback;
        private string _doBoysRememberSVP;
        private string _boysFeedback;
        private string _doVillageEldersRememberSVP;
        private string _villageEldersFeedback;
        private string _doPoliceRememberSVP;
        private string _policeFeedback;
        private string _villageElderContactNumber;
        private string _policeContactNumber;
        private string _doSchoolStaffRememberSVP;
        private string _schoolStaffFeedback;
        private string _schoolPrincipalContactNumber;
        private string _wasSkitConducted;
        private string _svpSuccessStory;
        private string _programmeFeedbackSummary;

        private string _svpImplementationChallenges;
        private string _wereCallsMadeToORAHelpline;
        private string _isAnotherSVPRequired;
        private string _nextStepsRecommendations;

        private int _comicBooksCount;
        private short _studentsParticipationCount;
        private string _rakshakDesc;
        private string _wasHelplineNumberMentioned;
        private string _revisitSummary;

        private DateTime _createdDateTime;
        private string _createdBy;
        #endregion

        public int RevisitId { get { return _revisitId; } set { SetProperty(ref _revisitId, value); } }
        public string RevisitNumber { get { return _revisitNumber; } set { SetProperty(ref _revisitNumber, value); } }
        public int VillageCode { get { return _villageCode; } set { SetProperty(ref _villageCode, value); } }

        public DateTime RevisitDate { get { return _revisitDate; } set { SetProperty(ref _revisitDate, value); } }
        public short TrafficCountBeforeSVP { get { return _trafficCountBeforeSVP; } set { SetProperty(ref _trafficCountBeforeSVP, value); } }
        public short TrafficCountAfterSVP { get { return _trafficCountAfterSVP; } set { SetProperty(ref _trafficCountAfterSVP, value); } }
        public short ChildMarriageCountBeforeSVP { get { return _childMarriageCountBeforeSVP; } set { SetProperty(ref _childMarriageCountBeforeSVP, value); } }
        public short ChildMarriageCountAfterSVP { get { return _childMarriageCountAfterSVP; } set { SetProperty(ref _childMarriageCountAfterSVP, value); } }
        public string IsVillageSafeForGirlsDesc { get { return _isVillageSafeForGirlsDesc; } set { SetProperty(ref _isVillageSafeForGirlsDesc, value); } }
        public string IsStrategicNetworkingHelpful { get { return _isStrategicNetworkingHelpful; } set { SetProperty(ref _isStrategicNetworkingHelpful, value); } }
        public string IsVillageLeadershipHelpful { get { return _isVillageLeadershipHelpful; } set { SetProperty(ref _isVillageLeadershipHelpful, value); } }
        public string IsCVCActive { get { return _isCVCActive; } set { SetProperty(ref _isCVCActive, value); } }

        public string DoFathersRememberSVP { get { return _doFathersRememberSVP; } set { SetProperty(ref _doFathersRememberSVP, value); } }
        public string FathersFeedback { get { return _fathersFeedback; } set { SetProperty(ref _fathersFeedback, value); } }
        public string DoMothersRememberSVP { get { return _doMothersRememberSVP; } set { SetProperty(ref _doMothersRememberSVP, value); } }
        public string MothersFeedback { get { return _mothersFeedback; } set { SetProperty(ref _mothersFeedback, value); } }
        public string DoGirlsRememberSVP { get { return _doGirlsRememberSVP; } set { SetProperty(ref _doGirlsRememberSVP, value); } }
        public string GirlsFeedback { get { return _girlsFeedback; } set { SetProperty(ref _girlsFeedback, value); } }
        public string DoBoysRememberSVP { get { return _doBoysRememberSVP; } set { SetProperty(ref _doBoysRememberSVP, value); } }
        public string BoysFeedback { get { return _boysFeedback; } set { SetProperty(ref _boysFeedback, value); } }
        public string DoVillageEldersRememberSVP { get { return _doVillageEldersRememberSVP; } set { SetProperty(ref _doVillageEldersRememberSVP, value); } }
        public string VillageEldersFeedback { get { return _villageEldersFeedback; } set { SetProperty(ref _villageEldersFeedback, value); } }
        public string DoPoliceRememberSVP { get { return _doPoliceRememberSVP; } set { SetProperty(ref _doPoliceRememberSVP, value); } }
        public string PoliceFeedback { get { return _policeFeedback; } set { SetProperty(ref _policeFeedback, value); } }
        public string VillageElderContactNumber { get { return _villageElderContactNumber; } set { SetProperty(ref _villageElderContactNumber, value); } }
        public string PoliceContactNumber { get { return _policeContactNumber; } set { SetProperty(ref _policeContactNumber, value); } }
        public string DoSchoolStaffRememberSVP { get { return _doSchoolStaffRememberSVP; } set { SetProperty(ref _doSchoolStaffRememberSVP, value); } }
        public string SchoolStaffFeedback { get { return _schoolStaffFeedback; } set { SetProperty(ref _schoolStaffFeedback, value); } }
        public string SchoolPrincipalContactNumber { get { return _schoolPrincipalContactNumber; } set { SetProperty(ref _schoolPrincipalContactNumber, value); } }
        public string WasSkitConducted { get { return _wasSkitConducted; } set { SetProperty(ref _wasSkitConducted, value); } }
        public string SVPSuccessStory { get { return _svpSuccessStory; } set { SetProperty(ref _svpSuccessStory, value); } }
        public string ProgrammeFeedbackSummary { get { return _programmeFeedbackSummary; } set { SetProperty(ref _programmeFeedbackSummary, value); } }

        public string SVPImplementationChallenges { get { return _svpImplementationChallenges; } set { SetProperty(ref _svpImplementationChallenges, value); } }
        public string WereCallsMadeToORAHelpline { get { return _wereCallsMadeToORAHelpline; } set { SetProperty(ref _wereCallsMadeToORAHelpline, value); } }
        public string IsAnotherSVPRequired { get { return _isAnotherSVPRequired; } set { SetProperty(ref _isAnotherSVPRequired, value); } }
        public string NextStepsRecommendations { get { return _nextStepsRecommendations; } set { SetProperty(ref _nextStepsRecommendations, value); } }

        public int ComicBooksCount { get { return _comicBooksCount; } set { SetProperty(ref _comicBooksCount, value); } }
        public short StudentsParticipationCount { get { return _studentsParticipationCount; } set { SetProperty(ref _studentsParticipationCount, value); } }
        public string RakshakDesc { get { return _rakshakDesc; } set { SetProperty(ref _rakshakDesc, value); } }
        public string WasHelplineNumberMentioned { get { return _wasHelplineNumberMentioned; } set { SetProperty(ref _wasHelplineNumberMentioned, value); } }
        public string RevisitSummary { get { return _revisitSummary; } set { SetProperty(ref _revisitSummary, value); } }

        public DateTime CreatedDateTime { get { return _createdDateTime; } set { SetProperty(ref _createdDateTime, value); } }
        public string CreatedBy { get { return _createdBy; } set { SetProperty(ref _createdBy, value); } }
    }
}
