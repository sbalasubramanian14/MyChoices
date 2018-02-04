using System;
using System.Collections.Generic;
using System.Text;

namespace NexGenRedAlert.contracts
{
    public interface INetworkConnection
    {
        bool IsConnected { get; }
        void CheckNetworkConnection();
    }
}
