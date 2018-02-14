namespace NexGenRedAlert.contracts
{
     public interface ICredentialService
    {
        string UserName { get; }

        string IpCode { get; }
        string NgoName { get; }

        void SaveCredentials(string UserName, string IpCode, string Ngoname);

        void DeleteCredentials();

        bool DoCredentialsExist();
    }
}
