using System;

namespace NexGenRedAlert.Models
{
    public class RakshakRegistrationForm : Entity
    {
        #region variables
        private int _rakshakRegistrationId;
        private string _rakshakRegistrationNumber;
        private int _villageCode;

        private string _name;
        private byte _age;
        private string _gender;
        private string _educationalQualification;
        private string _phoneNumber;
        private string _alternatePhoneNumber;
        private string _emailId;

        private DateTime _createdDateTime;
        private string _createdBy;
        #endregion

        public int RakshakRegistrationId { get { return _rakshakRegistrationId; } set { SetProperty(ref _rakshakRegistrationId, value); } }
        public string RakshakRegistrationNumber { get { return _rakshakRegistrationNumber; } set { SetProperty(ref _rakshakRegistrationNumber, value); } }
        public int VillageCode { get { return _villageCode; } set { SetProperty(ref _villageCode, value); } }
        public string Name { get { return _name; } set { SetProperty(ref _name, value); } }
        public byte Age { get { return _age; } set { SetProperty(ref _age, value); } }
        public string Gender { get { return _gender; } set { SetProperty(ref _gender, value); } }
        public string EducationalQualification { get { return _educationalQualification; } set { SetProperty(ref _educationalQualification, value); } }
        public string PhoneNumber { get { return _phoneNumber; } set { SetProperty(ref _phoneNumber, value); } }
        public string AlternatePhoneNumber { get { return _alternatePhoneNumber; } set { SetProperty(ref _alternatePhoneNumber, value); } }
        public string EmailId { get { return _emailId; } set { SetProperty(ref _emailId, value); } }

        public DateTime CreatedDateTime { get { return _createdDateTime; } set { SetProperty(ref _createdDateTime, value); } }
        public string CreatedBy { get { return _createdBy; } set { SetProperty(ref _createdBy, value); } }
    }
}
