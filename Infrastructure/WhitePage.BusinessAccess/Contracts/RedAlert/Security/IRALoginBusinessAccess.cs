using WhitePage.Entities.RedAlert;

namespace WhitePage.BusinessAccess.Contracts.Ops
{
    public interface IRALoginBusinessAccess
    {
        RedAlertUser ValidateUser(string userName);
    }
}
