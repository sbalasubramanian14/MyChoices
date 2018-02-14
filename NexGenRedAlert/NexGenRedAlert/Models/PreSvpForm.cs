using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace NexGenRedAlert.Models
{
    public class PreSvpForm : Entity
    {
        #region variables
        private int _preSVPId;
        private string _preSvpNumber;
        private int _villageCode;
        private DateTime _preSvpDate;
        private short _distanceToVillage;
        private string _locationDesc;
        private string _majorSourceOfIncome;
        private string _activeCommunityGroup;

        private byte _childAbuseCount;
        private byte _domesticViolenceCasesCount;
        private byte _traffickingCasesCount;
        private byte _MissingCasesCount;
        private byte _schoolDropOutsCount;
        private string _neighbouringTrafficProneDesc;
        private string _localIssuesDesc;
        private string _awarenessDesc;
        private string _traffickingCausesDesc;
        private string _previousAwareness;
        private string _previousAwarenessDesc;
        private DateTime _createdDateTime;
        private string _createdBy;



        #endregion

        public int PreSVPId { get { return _preSVPId; } set { SetProperty(ref _preSVPId, value); } }
        public string PreSvpNumber { get { return _preSvpNumber; } set { SetProperty(ref _preSvpNumber, value); } }
        
        public int VillageCode { get { return _villageCode; } set { SetProperty(ref _villageCode, value); } }
        public DateTime PreSvpDate { get { return _preSvpDate; } set { SetProperty(ref _preSvpDate, value); } }

        public short DistanceToVillage { get { return _distanceToVillage; } set { SetProperty(ref _distanceToVillage, value); } }
        public string LocationDesc { get { return _locationDesc; } set { SetProperty(ref _locationDesc, value); } }
        public string MajorSourceOfIncome { get { return _majorSourceOfIncome; } set { SetProperty(ref _majorSourceOfIncome, value); } }
        public string ActiveCommunityGroup { get { return _activeCommunityGroup; } set { SetProperty(ref _activeCommunityGroup, value); } }
        
        public byte ChildAbuseCount { get { return _childAbuseCount; } set { SetProperty(ref _childAbuseCount, value); } }
        public byte DomesticViolenceCasesCount { get { return _domesticViolenceCasesCount; } set { SetProperty(ref _domesticViolenceCasesCount, value); } }
        public byte TraffickingCasesCount { get { return _traffickingCasesCount; } set { SetProperty(ref _traffickingCasesCount, value); } }
        public byte MissingCasesCount { get { return _MissingCasesCount; } set { SetProperty(ref _MissingCasesCount, value); } }
        public byte SchoolDropOutsCount { get { return _schoolDropOutsCount; } set { SetProperty(ref _schoolDropOutsCount, value); } }

        public string NeighbouringTrafficProneDesc { get { return _neighbouringTrafficProneDesc; } set { SetProperty(ref _neighbouringTrafficProneDesc, value); } }
        public string LocalIssuesDesc { get { return _localIssuesDesc; } set { SetProperty(ref _localIssuesDesc, value); } }
        public string AwarenessDesc { get { return _awarenessDesc; } set { SetProperty(ref _awarenessDesc, value); } }
        public string TraffickingCausesDesc { get { return _traffickingCausesDesc; } set { SetProperty(ref _traffickingCausesDesc, value); } }
        public string PreviousAwareness { get { return _previousAwareness; } set { SetProperty(ref _previousAwareness, value); } }
        public string PreviousAwarenessDesc { get { return _previousAwarenessDesc; } set { SetProperty(ref _previousAwarenessDesc, value); } }

        public DateTime CreatedDateTime { get { return _createdDateTime; } set { SetProperty(ref _createdDateTime, value); } }
        public string CreatedBy { get { return _createdBy; } set { SetProperty(ref _createdBy, value); } }
    }
}

