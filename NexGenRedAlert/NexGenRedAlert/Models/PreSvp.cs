using System;
using System.Collections.Generic;
using System.Text;

namespace NexGenRedAlert.Models
{
    public class PreSvp : Entity
    {
        #region variables
        private int _FormId;
        private string _PreSvpNumber;
        private int _VillageCode;
        private DateTime _PreSvpDate;
        private short _DistanceToVillage;
        private string _LocationDesc;
        private string _MajorSourceOfIncome;
        private string _ActiveCommunityGroup;

        private byte _ChildAbuseCount;
        private byte _DomesticViolenceCasesCount;
        private byte _TraffickingCasesCount;
        private byte _MissingCasesCount;
        private byte _SchoolDropOutsCount;
        private string _NeighbouringTrafficProneDesc;
        private string _LocalIssuesDesc;
        private string _AwarenessDesc;
        private string _TraffickingCausesDesc;
        private string _PreviousAwareness;
        private string _PreviousAwarenessDesc;
        private DateTime _CreatedDateTime;
        private string _CreatedBy;



        #endregion

        public int FormId { get { return _FormId; } set { SetProperty(ref _FormId, value); } }
        public string PreSvpNumber { get { return _PreSvpNumber; } set { SetProperty(ref _PreSvpNumber, value); } }


        public int VillageCode { get { return _VillageCode; } set { SetProperty(ref _VillageCode, value); } }
        public DateTime PreSvpDate { get { return _PreSvpDate; } set { SetProperty(ref _PreSvpDate, value); } }

        public short DistanceToVillage { get { return _DistanceToVillage; } set { SetProperty(ref _DistanceToVillage, value); } }
        public string LocationDesc { get { return _LocationDesc; } set { SetProperty(ref _LocationDesc, value); } }
        public string MajorSourceOfIncome { get { return _MajorSourceOfIncome; } set { SetProperty(ref _MajorSourceOfIncome, value); } }
        public string ActiveCommunityGroup { get { return _ActiveCommunityGroup; } set { SetProperty(ref _ActiveCommunityGroup, value); } }


        public byte ChildAbuseCount { get { return _ChildAbuseCount; } set { SetProperty(ref _ChildAbuseCount, value); } }
        public byte DomesticViolenceCasesCount { get { return _DomesticViolenceCasesCount; } set { SetProperty(ref _DomesticViolenceCasesCount, value); } }
        public byte TraffickingCasesCount { get { return _TraffickingCasesCount; } set { SetProperty(ref _TraffickingCasesCount, value); } }
        public byte MissingCasesCount { get { return _MissingCasesCount; } set { SetProperty(ref _MissingCasesCount, value); } }
        public byte SchoolDropOutsCount { get { return _SchoolDropOutsCount; } set { SetProperty(ref _SchoolDropOutsCount, value); } }

        public string NeighbouringTrafficProneDesc { get { return _NeighbouringTrafficProneDesc; } set { SetProperty(ref _NeighbouringTrafficProneDesc, value); } }
        public string LocalIssuesDesc { get { return _LocalIssuesDesc; } set { SetProperty(ref _LocalIssuesDesc, value); } }
        public string AwarenessDesc { get { return _AwarenessDesc; } set { SetProperty(ref _AwarenessDesc, value); } }
        public string TraffickingCausesDesc { get { return _TraffickingCausesDesc; } set { SetProperty(ref _TraffickingCausesDesc, value); } }
        public string PreviousAwareness { get { return _PreviousAwareness; } set { SetProperty(ref _PreviousAwareness, value); } }
        public string PreviousAwarenessDesc { get { return _PreviousAwarenessDesc; } set { SetProperty(ref _PreviousAwarenessDesc, value); } }

        public DateTime CreatedDateTime { get { return _CreatedDateTime; } set { SetProperty(ref _CreatedDateTime, value); } }
        public string CreatedBy { get { return _CreatedBy; } set { SetProperty(ref _CreatedBy, value); } }
    }
}

