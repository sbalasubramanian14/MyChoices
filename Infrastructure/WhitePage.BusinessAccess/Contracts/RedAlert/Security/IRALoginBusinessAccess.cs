using WhitePage.Entities.RedAlert;

namespace WhitePage.BusinessAccess.Contracts.Ops
{
    public interface IRALoginBusinessAccess
    {
        ImplementingPartner ValidateImplementingPartner(string userName);
    }
}
