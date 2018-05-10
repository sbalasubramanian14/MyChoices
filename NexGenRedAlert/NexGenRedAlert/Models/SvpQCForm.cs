using System;

namespace NexGenRedAlert.Models
{
    public class SvpQCForm : Entity
    {
        #region variables
        private int _svpQCId;
        private string _svpQCNumber;
        private int _villageCode;
        private string _areStakeholdersAware;
        private string _wasStickersPutUp;
        private string _wasProtocolFollowed;
        private string _wereEquipmentsWorkingProperly;
        private string _wereAllProgramStartedInTime;
        private string _wasGuardianGirlConducted;
        private string _didGirlsTakeOath;
        private short _girlsParticipationCount;
        private string _wasCoolBoysConducted;
        private string _didBoysTakeOath;
        private short _boysParticipationCount;
        private string _wasSkitConducted;
        private string _wereFilmsUsedInSchoolProgram;
        private string _wasMyRightsMentioned;
        private string _wasMotherProgramConducted;
        private short _mothersParticipationCount;
        private string _wereFilmsUsedInMothersProgram;
        private string _wasFathersProgramConducted;
        private short _fathersParticipationCount;
        private string _wereFilmsUsedInFathersProgram;
        private short _totalParticipationCount;
        private string _didTeamMeetSarpanch;
        private string _didTeamMeetPolice;
        private string _didTeamMeetSchoolStaff;
        private string _didTeamMeetAnganwadiHead;
        private string _didTeamVisitedSchoolOnSecondDay;
        private string _schoolChildrenFeedback;
        private string _stakeholdersFeedback;
        private string _wasRakshakIdentified;
        private string _wasRakshakRegistrationDone;
        private string _previousAwarenessDesc;
        private string _cvcStatus;
        private string _wasCertificateGivenToSchool;
        private string _fieldWorkerNames;
        private string _summary;
        private DateTime _createdDateTime;
        private string _createdBy;
        #endregion

        public int SvpQCId { get { return _svpQCId; } set { SetProperty(ref _svpQCId, value); } }
        public string SvpQCNumber { get { return _svpQCNumber; } set { SetProperty(ref _svpQCNumber, value); } }
        public int VillageCode { get { return _villageCode; } set { SetProperty(ref _villageCode, value); } }

        public string AreStakeholdersAware { get { return _areStakeholdersAware; } set { SetProperty(ref _areStakeholdersAware, value); } }
        
        public string WasStickersPutUp { get { return _wasStickersPutUp; } set { SetProperty(ref _wasStickersPutUp, value); } }

        public string WasProtocolFollowed { get { return _wasProtocolFollowed; } set { SetProperty(ref _wasProtocolFollowed, value); } }
        public string WereEquipmentsWorkingProperly { get { return _wereEquipmentsWorkingProperly; } set { SetProperty(ref _wereEquipmentsWorkingProperly, value); } }
        public string WereAllProgramStartedInTime { get { return _wereAllProgramStartedInTime; } set { SetProperty(ref _wereAllProgramStartedInTime, value); } }

        public string WasGuardianGirlConducted { get { return _wasGuardianGirlConducted; } set { SetProperty(ref _wasGuardianGirlConducted, value); } }
        public string DidGirlsTakeOath { get { return _didGirlsTakeOath; } set { SetProperty(ref _didGirlsTakeOath, value); } }
        public short GirlsParticipationCount { get { return _girlsParticipationCount; } set { SetProperty(ref _girlsParticipationCount, value); } }

        public string WasCoolBoysConducted { get { return _wasCoolBoysConducted; } set { SetProperty(ref _wasCoolBoysConducted, value); } }
        public string DidBoysTakeOath { get { return _didBoysTakeOath; } set { SetProperty(ref _didBoysTakeOath, value); } }
        public short BoysParticipationCount { get { return _boysParticipationCount; } set { SetProperty(ref _boysParticipationCount, value); } }

        public string WasSkitConducted { get { return _wasSkitConducted; } set { SetProperty(ref _wasSkitConducted, value); } }
        public string WereFilmsUsedInSchoolProgr { get { return _wereFilmsUsedInSchoolProgram; } set { SetProperty(ref _wereFilmsUsedInSchoolProgram, value); } }
        public string WasMyRightsMentioned { get { return _wasMyRightsMentioned; } set { SetProperty(ref _wasMyRightsMentioned, value); } }
        public string WasMotherProgramConducted { get { return _wasMotherProgramConducted; } set { SetProperty(ref _wasMotherProgramConducted, value); } }
        public short MothersParticipationCount { get { return _mothersParticipationCount; } set { SetProperty(ref _mothersParticipationCount, value); } }
        public string WereFilmsUsedInMothersProgram { get { return _wereFilmsUsedInMothersProgram; } set { SetProperty(ref _wereFilmsUsedInMothersProgram, value); } }

        public string WasFathersProgramConducted { get { return _wasFathersProgramConducted; } set { SetProperty(ref _wasFathersProgramConducted, value); } }
        public short FathersParticipationCount { get { return _fathersParticipationCount; } set { SetProperty(ref _fathersParticipationCount, value); } }
        public string WereFilmsUsedInFathersProgram { get { return _wereFilmsUsedInFathersProgram; } set { SetProperty(ref _wereFilmsUsedInFathersProgram, value); } }
        public short TotalParticipationCount { get { return _totalParticipationCount; } set { SetProperty(ref _totalParticipationCount, value); } }

        public string DidTeamMeetSarpanch { get { return _didTeamMeetSarpanch; } set { SetProperty(ref _didTeamMeetSarpanch, value); } }
        public string DidTeamMeetPolice { get { return _didTeamMeetPolice; } set { SetProperty(ref _didTeamMeetPolice, value); } }
        public string DidTeamMeetSchoolStaff { get { return _didTeamMeetSchoolStaff; } set { SetProperty(ref _didTeamMeetSchoolStaff, value); } }
        public string DidTeamMeetAnganwadiHead { get { return _didTeamMeetAnganwadiHead; } set { SetProperty(ref _didTeamMeetAnganwadiHead, value); } }
        public string DidTeamVisitedSchoolOnSecondDay { get { return _didTeamVisitedSchoolOnSecondDay; } set { SetProperty(ref _didTeamVisitedSchoolOnSecondDay, value); } }
       
        public string SchoolChildrenFeedback { get { return _schoolChildrenFeedback; } set { SetProperty(ref _schoolChildrenFeedback, value); } }
        public string StakeholdersFeedback { get { return _stakeholdersFeedback; } set { SetProperty(ref _stakeholdersFeedback, value); } }
        public string WasRakshakIdentified { get { return _wasRakshakIdentified; } set { SetProperty(ref _wasRakshakIdentified, value); } }
        public string WasRakshakRegistrationDone { get { return _wasRakshakRegistrationDone; } set { SetProperty(ref _wasRakshakRegistrationDone, value); } }
        public string PreviousAwarenessDesc { get { return _previousAwarenessDesc; } set { SetProperty(ref _previousAwarenessDesc, value); } }
        public string CVCStatus { get { return _cvcStatus; } set { SetProperty(ref _cvcStatus, value); } }
        public string WasCertificateGivenToSchool { get { return _wasCertificateGivenToSchool; } set { SetProperty(ref _wasCertificateGivenToSchool, value); } }
        public string FieldWorkerNames { get { return _fieldWorkerNames; } set { SetProperty(ref _fieldWorkerNames, value); } }
        public string Summary { get { return _summary; } set { SetProperty(ref _summary, value); } }

        public DateTime CreatedDateTime { get { return _createdDateTime; } set { SetProperty(ref _createdDateTime, value); } }
        public string CreatedBy { get { return _createdBy; } set { SetProperty(ref _createdBy, value); } }
    }
}
