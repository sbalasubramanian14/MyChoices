using System;
using System.Collections.Generic;
using System.Text;

namespace NexGenRedAlert.Models
{
    public class PostSvp : Entity
    {
        #region variables
        private int _FormId;
        private string _PostSvpNumber;
        private int _VillageCode;
        private DateTime _PostSvpDate;

        private float _TravelHours;
        private float _TotalCampaignHours;
        private string _FieldWorkerNames;
        private string _ORAVisited;

        private byte _ConfirmedChildAbuseCount;
        private byte _ConfirmedDomesticViolenceCasesCount;
        private byte _ConfirmedTraffickingCasesCount;
        private byte _ConfirmedMissingCasesCount;
        private byte _ConfirmedSchoolDropOutsCount;
        private string _NeighbouringTrafficProneDesc;

        private short _MothersParticipationCount;
        private short _FathersParticipationCount;
        private short _SchoolParticipationCount;
        private short _EldersParticipationCount;
        private short _MovieParticipationCount;
        private short _TotalParticipationCount;

        private string _MothersFeedback;
        private string _FathersFeedback;
        private string _SchoolFeedback;
        private string _EldersFeedback;

        private string _SchoolName;
        private short _ComicBooksCount;
        private int _TotalSvpCost;
        private string _Summary;
        private string _PositiveFeedback;
        private string _ChallengesDesc;
        private string _IsFollowUpRequiredDesc;
        private string _Recomendations;

        private string _ElderName;
        private string _ElderDesignation;
        private string _ElderContactNumber;

        private string _PoliceName;
        private string _PoliceDesignation;
        private string _PoliceContactNumber;

        private DateTime _CreatedDateTime;
        private string _CreatedBy;

        #endregion

        public int FormId { get { return _FormId; } set { SetProperty(ref _FormId, value); } }
        public string PostSvpNumber { get { return _PostSvpNumber; } set { SetProperty(ref _PostSvpNumber, value); } }


        public int VillageCode { get { return _VillageCode; } set { SetProperty(ref _VillageCode, value); } }
        public DateTime PostSvpDate { get { return _PostSvpDate; } set { SetProperty(ref _PostSvpDate, value); } }

        public float TravelHours { get { return _TravelHours; } set { SetProperty(ref _TravelHours, value); } }
        public float TotalCampaignHours { get { return _TotalCampaignHours; } set { SetProperty(ref _TotalCampaignHours, value); } }
        public string FieldWorkerNames { get { return _FieldWorkerNames; } set { SetProperty(ref _FieldWorkerNames, value); } }
        public string ORAVisited { get { return _ORAVisited; } set { SetProperty(ref _ORAVisited, value); } }

        public byte ConfirmedChildAbuseCount { get { return _ConfirmedChildAbuseCount; } set { SetProperty(ref _ConfirmedChildAbuseCount, value); } }
        public byte ConfirmedDomesticViolenceCasesCount { get { return _ConfirmedDomesticViolenceCasesCount; } set { SetProperty(ref _ConfirmedDomesticViolenceCasesCount, value); } }
        public byte ConfirmedTraffickingCasesCount { get { return _ConfirmedTraffickingCasesCount; } set { SetProperty(ref _ConfirmedTraffickingCasesCount, value); } }
        public byte ConfirmedMissingCasesCount { get { return _ConfirmedMissingCasesCount; } set { SetProperty(ref _ConfirmedMissingCasesCount, value); } }
        public byte ConfirmedSchoolDropOutsCount { get { return _ConfirmedSchoolDropOutsCount; } set { SetProperty(ref _ConfirmedSchoolDropOutsCount, value); } }
        public string NeighbouringTrafficProneDesc { get { return _NeighbouringTrafficProneDesc; } set { SetProperty(ref _NeighbouringTrafficProneDesc, value); } }

        public short MothersParticipationCount { get { return _MothersParticipationCount; } set { SetProperty(ref _MothersParticipationCount, value); } }
        public short FathersParticipationCount { get { return _FathersParticipationCount; } set { SetProperty(ref _FathersParticipationCount, value); } }
        public short SchoolParticipationCount { get { return _SchoolParticipationCount; } set { SetProperty(ref _SchoolParticipationCount, value); } }
        public short EldersParticipationCount { get { return _EldersParticipationCount; } set { SetProperty(ref _EldersParticipationCount, value); } }
        public short MovieParticipationCount { get { return _MovieParticipationCount; } set { SetProperty(ref _MovieParticipationCount, value); } }
        public short TotalParticipationCount { get { return _TotalParticipationCount; } set { SetProperty(ref _TotalParticipationCount, value); } }

        public string MothersFeedback { get { return _MothersFeedback; } set { SetProperty(ref _MothersFeedback, value); } }
        public string FathersFeedback { get { return _FathersFeedback; } set { SetProperty(ref _FathersFeedback, value); } }
        public string SchoolFeedback { get { return _SchoolFeedback; } set { SetProperty(ref _SchoolFeedback, value); } }
        public string EldersFeedback { get { return _EldersFeedback; } set { SetProperty(ref _EldersFeedback, value); } }

        public string SchoolName { get { return _SchoolName; } set { SetProperty(ref _SchoolName, value); } }
        public short ComicBooksCount { get { return _ComicBooksCount; } set { SetProperty(ref _ComicBooksCount, value); } }
        public int TotalSvpCost { get { return _TotalSvpCost; } set { SetProperty(ref _TotalSvpCost, value); } }
        public string Summary { get { return _Summary; } set { SetProperty(ref _Summary, value); } }
        public string PositiveFeedback { get { return _PositiveFeedback; } set { SetProperty(ref _PositiveFeedback, value); } }
        public string ChallengesDesc { get { return _ChallengesDesc; } set { SetProperty(ref _ChallengesDesc, value); } }
        public string IsFollowUpRequiredDesc { get { return _IsFollowUpRequiredDesc; } set { SetProperty(ref _IsFollowUpRequiredDesc, value); } }
        public string Recomendations { get { return _Recomendations; } set { SetProperty(ref _Recomendations, value); } }

        public string ElderName { get { return _ElderName; } set { SetProperty(ref _ElderName, value); } }
        public string ElderDesignation { get { return _ElderDesignation; } set { SetProperty(ref _ElderDesignation, value); } }
        public string ElderContactNumber { get { return _ElderContactNumber; } set { SetProperty(ref _ElderContactNumber, value); } }

        public string PoliceName { get { return _PoliceName; } set { SetProperty(ref _PoliceName, value); } }
        public string PoliceDesignation { get { return _PoliceDesignation; } set { SetProperty(ref _PoliceDesignation, value); } }
        public string PoliceContactNumber { get { return _PoliceContactNumber; } set { SetProperty(ref _PoliceContactNumber, value); } }

        public DateTime CreatedDateTime { get { return _CreatedDateTime; } set { SetProperty(ref _CreatedDateTime, value); } }
        public string CreatedBy { get { return _CreatedBy; } set { SetProperty(ref _CreatedBy, value); } }
    }
}

