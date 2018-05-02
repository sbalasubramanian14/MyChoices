namespace NexGenRedAlert.contracts
{
     public interface ICredentialService
    {
        string UserName { get; }

        string UserCode { get; }
        string Organization { get; }
        int RoleId { get; }
        void SaveCredentials(string userName, string userCode, string organization, int roleId);

        void DeleteCredentials();

        bool DoCredentialsExist();
    }
}
