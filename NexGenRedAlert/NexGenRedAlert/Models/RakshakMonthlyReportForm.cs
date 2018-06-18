using System;
using System.Collections.Generic;
using System.Text;

namespace NexGenRedAlert.Models
{
    public class RakshakMonthlyReportForm : Entity
    {
        #region variables
        private int _rakshakMonthlyReportId;
        private string _rakshakMonthlyReportNumber;
        private string _monthAndYear;
        private int _activeRakshakCount;
        private int _droppedRakshakCount;
        private int _registeredRakshakCount;
        private string _wasRakshakActive;
        private string _wasRakshakReportable;
        private int _communityMeetingCount;
        private string _wasCommunityMeetingHelpful;
        private int _communityMeetingParticipationCount;
        private int _workHoursSpent;
        private string _wasSchoolDropoutsHeard;
        private string _wasProblemsReported;
        private string _rakshakEffectivenessDesc;
        private string _challengesManagingRakshakDesc;
        private string _rakshakStoryDesc;
        private string _topPerformingRakshakDesc;
        private string _createdBy;
        private DateTime _createdDateTime;
        #endregion

        public int RakshakMonthlyReportId { get { return _rakshakMonthlyReportId; } set { SetProperty(ref _rakshakMonthlyReportId, value); } }
        public string RakshakMonthlyReportNumber { get { return _rakshakMonthlyReportNumber; } set { SetProperty(ref _rakshakMonthlyReportNumber, value); } }
        public string MonthAndYear { get { return _monthAndYear; } set { SetProperty(ref _monthAndYear, value); } }
        public int ActiveRakshakCount { get { return _activeRakshakCount; } set { SetProperty(ref _activeRakshakCount, value); } }
        public int DroppedRakshakCount { get { return _droppedRakshakCount; } set { SetProperty(ref _droppedRakshakCount, value); } }
        public int RegisteredRakshakCount { get { return _registeredRakshakCount; } set { SetProperty(ref _registeredRakshakCount, value); } }
        public string WasRakshakActive { get { return _wasRakshakActive; } set { SetProperty(ref _wasRakshakActive, value); } }
        public string WasRakshakReportable { get { return _wasRakshakReportable; } set { SetProperty(ref _wasRakshakReportable, value); } }
        public int CommunityMeetingCount { get { return _communityMeetingCount; } set { SetProperty(ref _communityMeetingCount, value); } }
        public string WasCommunityMeetingHelpful { get { return _wasCommunityMeetingHelpful; } set { SetProperty(ref _wasCommunityMeetingHelpful, value); } }
        public int CommunityMeetingParticipationCount { get { return _communityMeetingParticipationCount; } set { SetProperty(ref _communityMeetingParticipationCount, value); } }
        public int WorkHoursSpent { get { return _workHoursSpent; } set { SetProperty(ref _workHoursSpent, value); } }
        public string WasSchoolDropoutsReported { get { return _wasSchoolDropoutsHeard; } set { SetProperty(ref _wasSchoolDropoutsHeard, value); } }
        public string WasProblemsReported { get { return _wasProblemsReported; } set { SetProperty(ref _wasProblemsReported, value); } }
        public string RakshakEffectivenessDesc { get { return _rakshakEffectivenessDesc; } set { SetProperty(ref _rakshakEffectivenessDesc, value); } }
        public string ChallengesInManagingRakshakDesc { get { return _challengesManagingRakshakDesc; } set { SetProperty(ref _challengesManagingRakshakDesc, value); } }
        public string RakshakStoryDesc { get { return _rakshakStoryDesc; } set { SetProperty(ref _rakshakStoryDesc, value); } }
        public string TopPerformingRakshakDesc { get { return _topPerformingRakshakDesc; } set { SetProperty(ref _topPerformingRakshakDesc, value); } }
        public DateTime CreatedDateTime { get { return _createdDateTime; } set { SetProperty(ref _createdDateTime, value); } }
        public string CreatedBy { get { return _createdBy; } set { SetProperty(ref _createdBy, value); } }
    }
}