using System;
using System.Collections.Generic;
using System.Text;

namespace NexGenRedAlert.contracts
{
     public interface ICredentialService
    {

        string UserName { get; }

        string IpCode { get; }

        void SaveCredentials(string UserName, string IpCode);

        void DeleteCredentials();

        bool DoCredentialsExist();
    }
}
