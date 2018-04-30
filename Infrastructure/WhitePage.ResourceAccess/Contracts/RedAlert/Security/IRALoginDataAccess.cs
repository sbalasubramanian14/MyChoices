using WhitePage.Entities.RedAlert;

namespace WhitePage.ResourceAccess.Contracts.RedAlert.Security
{
    public interface IRALoginDataAccess
    {
        RedAlertUser ValidateUser(string userName);
    }
}
