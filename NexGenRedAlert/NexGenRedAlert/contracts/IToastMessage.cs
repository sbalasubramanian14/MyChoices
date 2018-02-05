using System;
using System.Collections.Generic;
using System.Text;

namespace NexGenRedAlert.contracts
{
    public interface ToastMessage
    {
        void LongAlert(string message);
        void ShortAlert(string message);
    }
}
