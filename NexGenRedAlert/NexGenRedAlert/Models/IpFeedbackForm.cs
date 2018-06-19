using System;
using System.Collections.Generic;
using System.Text;

namespace NexGenRedAlert.Models
{
    public class IpFeedbackForm: Entity
    {

        #region variables
        private int _ipFeedbackId;
        private string _ipFeedbackNumber;
        private string _wasDifferenceMadeBySVP;
        private string _didStateCoordinatorGaveSatisfiedGuidance;
        private string _didStateCoordinatorVisit;
        private string _wasStateCoordinatorHelpfulInFollowup;
        public int _stateCoordinatorRating;
        public string _areaofImprovementForStateCoordinatorDesc;
        private string _areasOfImprovementForProgramDesc;
        private DateTime _createdDateTime;
        private string _createdBy;
        #endregion
        public int IpFeedbackId { get { return _ipFeedbackId; } set { SetProperty(ref _ipFeedbackId, value); } }
        public string IpFeedbackNumber { get { return _ipFeedbackNumber; } set { SetProperty(ref _ipFeedbackNumber, value); } }
        public string WasDifferenceMadeBySVP { get { return _wasDifferenceMadeBySVP; } set { SetProperty(ref _wasDifferenceMadeBySVP, value); } }
        public string DidStateCoordinatorGaveSatisfiedGuidance { get { return _didStateCoordinatorGaveSatisfiedGuidance; } set { SetProperty(ref _didStateCoordinatorGaveSatisfiedGuidance, value); } }
        public string DidStateCoordinatorVisit { get { return _didStateCoordinatorVisit; } set { SetProperty(ref _didStateCoordinatorVisit, value); } }
        public string WasStateCoordinatorHelpfulInFollowup { get { return _wasStateCoordinatorHelpfulInFollowup; } set { SetProperty(ref _wasStateCoordinatorHelpfulInFollowup, value); } }
        public int StateCoordinatorRating { get { return _stateCoordinatorRating; } set { SetProperty(ref _stateCoordinatorRating, value); } }
        public string AreasOfImprovementForStateCoordinatorDesc { get { return _areaofImprovementForStateCoordinatorDesc; } set { SetProperty(ref _areaofImprovementForStateCoordinatorDesc, value); } }
        public string AreasOfImprovementForProgramDesc { get { return _areasOfImprovementForProgramDesc; } set { SetProperty(ref _areasOfImprovementForProgramDesc, value); } }
        public DateTime CreatedDateTime { get { return _createdDateTime; } set { SetProperty(ref _createdDateTime, value); } }
        public string CreatedBy { get { return _createdBy; } set { SetProperty(ref _createdBy, value); } }
    }
}
