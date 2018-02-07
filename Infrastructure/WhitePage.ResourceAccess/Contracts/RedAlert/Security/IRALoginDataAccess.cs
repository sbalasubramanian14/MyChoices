using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WhitePage.Entities.RedAlert;

namespace WhitePage.ResourceAccess.Contracts.RedAlert.Security
{
    public interface IRALoginDataAccess
    {
        ImplementingPartner ValidateImplementingPartner(string userName);
    }
}
