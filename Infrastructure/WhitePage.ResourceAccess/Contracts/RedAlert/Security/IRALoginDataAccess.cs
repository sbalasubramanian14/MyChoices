using WhitePage.Entities.RedAlert;

namespace WhitePage.ResourceAccess.Contracts.RedAlert.Security
{
    public interface IRALoginDataAccess
    {
        ImplementingPartner ValidateImplementingPartner(string userName);
    }
}
