using System;
using System.Collections.Generic;
using System.Text;

namespace NexGenRedAlert.Models
{
    public class SvpForm : Entity
    {
        #region variables
        private int _svpId;
        private string _svpNumber;
        private int _villageCode;
        private DateTime _svpDate;

        private float _travelHours;
        private float _totalCampaignHours;
        private string _fieldWorkerNames;
        private string _oraVisited;

        private byte _confirmedChildAbuseCount;
        private byte _confirmedDomesticViolenceCasesCount;
        private byte _confirmedTraffickingCasesCount;
        private byte _confirmedMissingCasesCount;
        private byte _confirmedSchoolDropoutsCount;
        private string _neighbouringTrafficProneDesc;

        private short _mothersParticipationCount;
        private short _fathersParticipationCount;
        private short _schoolParticipationCount;
        private short _eldersParticipationCount;
        private short _movieParticipationCount;
        private short _totalParticipationCount;

        private string _mothersFeedback;
        private string _fathersFeedback;
        private string _schoolFeedback;
        private string _eldersFeedback;

        private string _isRakshakInstituted;
        private string _schoolName;
        private short _comicBooksCount;
        private int _totalSvpCost;
        private string _summary;
        private string _positiveFeedback;
        private string _challengesDesc;
        private string _isFollowUpRequiredDesc;
        private string _recommendations;

        private string _elderName;
        private string _elderDesignation;
        private string _elderContactNumber;

        private string _policeName;
        private string _policeDesignation;
        private string _policeContactNumber;

        private DateTime _CreatedDateTime;
        private string _createdBy;

        #endregion

        public int SVPId { get { return _svpId; } set { SetProperty(ref _svpId, value); } }
        public string SvpNumber { get { return _svpNumber; } set { SetProperty(ref _svpNumber, value); } }
        
        public int VillageCode { get { return _villageCode; } set { SetProperty(ref _villageCode, value); } }
        public DateTime SvpDate { get { return _svpDate; } set { SetProperty(ref _svpDate, value); } }

        public float TravelHours { get { return _travelHours; } set { SetProperty(ref _travelHours, value); } }
        public float TotalCampaignHours { get { return _totalCampaignHours; } set { SetProperty(ref _totalCampaignHours, value); } }
        public string FieldWorkerNames { get { return _fieldWorkerNames; } set { SetProperty(ref _fieldWorkerNames, value); } }
        public string ORAVisited { get { return _oraVisited; } set { SetProperty(ref _oraVisited, value); } }

        public byte ConfirmedChildAbuseCount { get { return _confirmedChildAbuseCount; } set { SetProperty(ref _confirmedChildAbuseCount, value); } }
        public byte ConfirmedDomesticViolenceCasesCount { get { return _confirmedDomesticViolenceCasesCount; } set { SetProperty(ref _confirmedDomesticViolenceCasesCount, value); } }
        public byte ConfirmedTraffickingCasesCount { get { return _confirmedTraffickingCasesCount; } set { SetProperty(ref _confirmedTraffickingCasesCount, value); } }
        public byte ConfirmedMissingCasesCount { get { return _confirmedMissingCasesCount; } set { SetProperty(ref _confirmedMissingCasesCount, value); } }
        public byte ConfirmedSchoolDropoutsCount { get { return _confirmedSchoolDropoutsCount; } set { SetProperty(ref _confirmedSchoolDropoutsCount, value); } }
        public string NeighbouringTrafficProneDesc { get { return _neighbouringTrafficProneDesc; } set { SetProperty(ref _neighbouringTrafficProneDesc, value); } }

        public short MothersParticipationCount { get { return _mothersParticipationCount; } set { SetProperty(ref _mothersParticipationCount, value); } }
        public short FathersParticipationCount { get { return _fathersParticipationCount; } set { SetProperty(ref _fathersParticipationCount, value); } }
        public short SchoolParticipationCount { get { return _schoolParticipationCount; } set { SetProperty(ref _schoolParticipationCount, value); } }
        public short EldersParticipationCount { get { return _eldersParticipationCount; } set { SetProperty(ref _eldersParticipationCount, value); } }
        public short MovieParticipationCount { get { return _movieParticipationCount; } set { SetProperty(ref _movieParticipationCount, value); } }
        public short TotalParticipationCount { get { return _totalParticipationCount; } set { SetProperty(ref _totalParticipationCount, value); } }

        public string MothersFeedback { get { return _mothersFeedback; } set { SetProperty(ref _mothersFeedback, value); } }
        public string FathersFeedback { get { return _fathersFeedback; } set { SetProperty(ref _fathersFeedback, value); } }
        public string SchoolFeedback { get { return _schoolFeedback; } set { SetProperty(ref _schoolFeedback, value); } }
        public string EldersFeedback { get { return _eldersFeedback; } set { SetProperty(ref _eldersFeedback, value); } }

        public string IsRakshakInstituted { get { return _isRakshakInstituted;  } set { SetProperty(ref _isRakshakInstituted, value);  } }
        public string SchoolName { get { return _schoolName; } set { SetProperty(ref _schoolName, value); } }
        public short ComicBooksCount { get { return _comicBooksCount; } set { SetProperty(ref _comicBooksCount, value); } }
        public int TotalSvpCost { get { return _totalSvpCost; } set { SetProperty(ref _totalSvpCost, value); } }
        public string Summary { get { return _summary; } set { SetProperty(ref _summary, value); } }
        public string PositiveFeedback { get { return _positiveFeedback; } set { SetProperty(ref _positiveFeedback, value); } }
        public string ChallengesDesc { get { return _challengesDesc; } set { SetProperty(ref _challengesDesc, value); } }
        public string IsFollowUpRequiredDesc { get { return _isFollowUpRequiredDesc; } set { SetProperty(ref _isFollowUpRequiredDesc, value); } }
        public string Recommendations { get { return _recommendations; } set { SetProperty(ref _recommendations, value); } }

        public string ElderName { get { return _elderName; } set { SetProperty(ref _elderName, value); } }
        public string ElderDesignation { get { return _elderDesignation; } set { SetProperty(ref _elderDesignation, value); } }
        public string ElderContactNumber { get { return _elderContactNumber; } set { SetProperty(ref _elderContactNumber, value); } }

        public string PoliceName { get { return _policeName; } set { SetProperty(ref _policeName, value); } }
        public string PoliceDesignation { get { return _policeDesignation; } set { SetProperty(ref _policeDesignation, value); } }
        public string PoliceContactNumber { get { return _policeContactNumber; } set { SetProperty(ref _policeContactNumber, value); } }

        public DateTime CreatedDateTime { get { return _CreatedDateTime; } set { SetProperty(ref _CreatedDateTime, value); } }
        public string CreatedBy { get { return _createdBy; } set { SetProperty(ref _createdBy, value); } }
    }
}

